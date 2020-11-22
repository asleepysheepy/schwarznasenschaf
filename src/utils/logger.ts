import Winston from 'winston'

const logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    Winston.format.errors({ stack: true }),
    Winston.format.splat(),
    Winston.format.json()
  ),
  transports: [
    new Winston.transports.File({
      filename: 'logs.txt',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 25,
      tailable: true,
      zippedArchive: true,
    }),
    new Winston.transports.Console({
      format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.simple()
      ),
    }),
  ],
  exitOnError: false,
})

export default logger
