var mqtt = require('mqtt')
const mqttConfig = require('./config/mqtt')

class Mqtt {
  constructor() {
    this.client = mqtt.connect(mqttConfig.url)
  }

  onConnect() {
    this.client.on('connect', function() {
      console.log('[MQTT] Conectado')
      this.client.subscribe('presence', function(err) {
        if (!err) {
          this.client.publish('presence', 'Hello mqtt')
        }
      })
    })

    this.client.on('message', function(topic, message) {
      // message is Buffer
      console.log(message.toString())
      this.client.end()
    })
  }

  send(channel, message) {
    this.client.publish(channel, message)
  }
}

module.exports = new Mqtt()
