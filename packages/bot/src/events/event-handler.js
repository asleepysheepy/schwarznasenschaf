import fs from 'fs'

export default class EventHandler {
  constructor(client) {
    const parentDir = './src/events'
    const directories = fs.readdirSync(parentDir).filter((file) => !file.endsWith('.js'))

    const eventFiles = directories.map((directory) =>
      fs.readdirSync(`${parentDir}/${directory}`).map((file) => `${directory}/${file}`),
    ).flat()

    eventFiles.forEach((file) => {
      import(`./${file}`).then(({default: Event}) => {
        const event = new Event(client)
        client.on(event.name, async (...args) => await event.handle(...args))
      }).catch((error) => console.error(`Failed to load event at: ${file}\n${error}`))
    })
  }
}
