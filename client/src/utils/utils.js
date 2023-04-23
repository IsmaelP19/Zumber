const showMessage = (message, type, setMessage, time) => {
  setMessage([message, type])
  window.scrollTo(0, 0)
  setTimeout(() => {
    setMessage('')
  }, time)
}

module.exports = {
  showMessage
}