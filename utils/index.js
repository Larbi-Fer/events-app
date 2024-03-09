import moment from 'moment';

export const convertFileToUrl = (file = File) => URL.createObjectURL(file)

export const dateBetween = (first, last) => {
  first = new Date(first)
  last = new Date(last)

  const dateOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  if (first.toDateString() == last.toDateString()) {
    return first.toLocaleString('en-US', dateOptions) + ' | ' + first.toLocaleString('en-US', timeOptions) + ' → ' + last.toLocaleString('en-US', timeOptions) + ' ( ' + duration(moment(last).diff(first)) + ' )';
  }
}

export const fromNow = date => moment(date).fromNow()

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