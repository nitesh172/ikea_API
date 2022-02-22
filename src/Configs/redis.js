const redis = require("redis")

const client = redis.createClient({
  url: "redis://:p22ad2a5ed7d46239e924183f2731f57cefd182a4a5704eed51e3660c83092375@ec2-54-242-101-248.compute-1.amazonaws.com:30559",
})

client.on("connect", (err) => {
  if (err) console.log(err.message)
  console.log("Connected!")
})

module.exports = client
