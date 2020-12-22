/**
 * Formates a given date to the following:
 * 22 December 2018, 21:41:49
 *
 * @param date The date to format
 */
function formatDate(date: Date): string {
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

export const DateUtils = {
  formatDate,
}
