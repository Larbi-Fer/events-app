import moment from 'moment';

export const convertFileToUrl = (file = File) => URL.createObjectURL(file)

export const dateBetween = (first, last) => {
  first = new Date(first)
  last = new Date(last)

  const dateOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  if (first.toDateString() == last.toDateString()) {
    return first.toLocaleString('en-US', dateOptions) + ' | ' + first.toLocaleString('en-US', timeOptions) + ' → ' + last.toLocaleString('en-US', timeOptions) + ' ( ' + duration(moment(last).diff(first)) + ' )';
  }
}

const duration = dur => {
  const res = moment.duration(dur, 'milliseconds')
  var s = ''
  if (res.hours()) {
    s += res.hours()
    if (res.minutes()) s += ':' + res.minutes()
    s += 'h'
  }
  else if (res.minutes()) s += res.minutes() + 'M'
  return s
}