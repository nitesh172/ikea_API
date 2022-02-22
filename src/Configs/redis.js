const redis = require("redis")

const client = redis.createClient({
  url: "redis://:p4a73687573f6b27d7af5350617235335350b58ef0fa07d3163287141e9fc9be2@ec2-204-236-200-151.compute-1.amazonaws.com:10659",
})

client.on("connect", (err) => {
  if (err) console.log(err.message)
  console.log("Connected!")
})

module.exports = client
