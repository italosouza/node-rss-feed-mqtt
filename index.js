const app = require('./src/app')

app.start()

function handle(signal) {
  console.log(`Received ${signal}`)
  app.desctructor()
  process.exit(0)
}

// process.on('SIGINT', handle)
// process.on('SIGUSR1', handle)
// process.on('SIGPIPE', handle)
// process.on('SIGHUP', handle)
// process.on('SIGTERM', handle)
// process.on('SIGBREAK', handle)
// process.on('SIGWINCH', handle)
// process.on('SIGKILL', handle)
// process.on('SIGSTOP', handle)
// process.on('SIGBUS', handle)
// process.on('SIGFPE', handle)
// process.on('SIGSEGV', handle)
// process.on('SIGILL', handle)
