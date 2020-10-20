const throttle = (fn, interval) => {
  const timer = null
  const clearTimer = () => timer = null
  return (...args) => {
    if (timer) return
    timer = setTimeout(clearTimer, interval)
    fn(...args)
  }
}

module.exports = throttle
