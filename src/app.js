const Parser = require('rss-parser')
const parser = new Parser()
const mqtt = require('./mqtt')

const INTERVALO_CONSULTA = process.env.INTERVALO_CONSULTA || 15000

class App {
  constructor() {
    this.feedList = [
      'http://172.21.10.40/view/Monitores/view/Times/job/PIPELINE_PG5_DEV/rssAll',
      'http://172.21.10.40/view/Monitores/view/Times/job/PIPELINE_BRASIL_DB1/rssAll',
      'http://172.21.10.40/view/Monitores/view/Times/job/PIPELINE_BRASIL/rssAll'
    ]
    this.timers = []
  }

  desctructor() {
    console.log('Liberando Timers: ', this.timers.length)
    this.timers.forEach(interval => {
      clearInterval(interval)
    })
  }

  getFeed(url) {
    const feed = parser.parseURL(url)
    return feed
  }

  processFeed(res) {
    const data = res.items[0].title.replace(/\(|\)/g, '').split(' ')
    console.log(data[0], data[2])
    mqtt.send('build', `${data[0]} ${data[2]}`)
  }

  start() {
    this.feedList.forEach(feed => {
      const timer = setInterval(async () => {
        const res = await this.getFeed(feed)
        this.processFeed(res)
      }, INTERVALO_CONSULTA)

      this.timers.push(timer)
    })

    console.log('Alocando Timers: ', this.timers.length)
  }
}

module.exports = new App()
