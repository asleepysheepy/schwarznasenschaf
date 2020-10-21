export default interface Event {
  name: string,
  handle(...props: any[]): void, // eslint-disable-line @typescript-eslint/no-explicit-any
}
