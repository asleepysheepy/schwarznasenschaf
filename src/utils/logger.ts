import Winston from 'winston'

const consoleTransport = process.env.NODE_ENV === 'production' ?
  new Winston.transports.Console({ format: Winston.format.colorize()}) :
  new Winston.transports.Console()

const Logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    Winston.format.errors({ stack: true }),
    Winston.format.splat(),
    Winston.format.json(),
    Winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [consoleTransport],
  exceptionHandlers: [consoleTransport],
  exitOnError: false,
})

export { Logger }
