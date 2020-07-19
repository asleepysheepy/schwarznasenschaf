import Jimp from 'jimp/es'
import jsQR from 'jsqr'

import Config from 'config'

export default class messageEvent {
  constructor() {
    this.name = 'message'
  }

  async handle(message) {
    // ignore DMs
    if (!message.channel.guild) { return }

    const attachments = message.attachments.filter((e) => {
      const width = e.width || 0
      const height = e.height || 0
      return width > 0 && height > 0
    })

    for (const [, attachment] of attachments) {
      try {
        const { bitmap } = await Jimp.read(attachment.url)
        const result = jsQR(bitmap.data, bitmap.width, bitmap.height, { inversionAttempts: 'dontInvert' })

        if (result !== null && result.data.startsWith('https://discordapp.com/ra/')) {
          const channel = message.channel.guild.channels.get(Config.loggingChannels.messages)
          channel.send(`${message.author.tag}, with id \`${message.author.id}\`, has sent malicious login url qr code  `)

          message.delete()
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
