

const newPollFields = [
  {name: "subject", label: "Subject *", type: "text", focus: true},
  {name: "password", label: "Password", type: "password" },
  {name: "confirmPassword", label: "Confirm Password", type: "password" },
  {name: "expires", label: "Closes in... (1 - 300 minutes)", type: "number", min: 1, max: 300 },
  {name: "format", label: "Results Format", type: "select", options: ["default","bar","pie","radar"] },]

const updatePollFields = [
  {name: "format", label: "Results Format", type: "text" }]

const capitalize = ([ first, ...rest ]) => {
  return first.toLocaleUpperCase() + rest.join('')}

const formatTime = (duration) => {
  let hours   = Math.floor((duration / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      seconds = Math.floor((duration / 1000) % 60);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  const time = {hours: hours, minutes: minutes, seconds: seconds};
  return time;
}

const removeLS = () => {
  localStorage.removeItem(window.location.pathname.split('/').at(-1))
}

module.exports = { newPollFields, updatePollFields, capitalize, formatTime, removeLS }
