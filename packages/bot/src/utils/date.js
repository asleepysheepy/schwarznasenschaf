export function formatDate(date) {
  const options = {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: '2-digit',
  }

  return date.toLocaleDateString('en-GB', options)
}
