

const express = require('express')
const app = express()

const superagent = require('superagent')
const cheerio = require('cheerio')

let hotNews = []
let localNews = []

superagent.get('http://news.baidu.com/').end((err, res) => {
    if(err){
        console.log(`抓取失败-${err}`)
    }else{
        hotNews = getHotNews(res)
    }
})

let getHotNews = (res) => {
    let hotNews = []
    let $ = cheerio.load(res.text)
    $('div#pane-news ul li a').each((idx, ele) => {
        let news = {
            title: $(ele).text(),
            href: $(ele).attr('href')
        }
        hotNews.push(news)
    })
    
    return hotNews
}

let server = app.listen(3000, function(){
    let host = server.address().address
    let port = server.address().port
    console.log('listen 3000 success...', host, port)
})

app.get('/', async function(req, res, next){
    res.send(hotNews)
})