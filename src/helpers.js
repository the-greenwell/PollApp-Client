const newPollFields = [
  {name: "subject", label: "Subject *", type: "text", focus: true},
  {name: "password", label: "Password", type: "password" },
  {name: "confirmPassword", label: "Confirm Password", type: "password" },
  {name: "expires", label: "Closes in... (1 - 300 minutes)", type: "number", min: 1, max: 300 },
  {name: "format", label: "Results Format", type: "select", options: ["default","bar","pie","radar"] },]

const updatePollFields = [
  {name: "format", label: "Results Format", type: "text" }]

module.exports = { newPollFields, updatePollFields }
