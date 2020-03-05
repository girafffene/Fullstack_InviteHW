const express = require("express")
const router = express.Router()
const axios = require("axios")

const data = {
  users: [],
  going: [],
  notGoing: []
}

//calling API to get user information
router.get("/newuser", (req, res, next) => {
  axios.get("https://randomuser.me/api/?results=1").then(resp => {
    const obj = resp.data.results[0]
    const user = {
      name: `${obj.name.first} ${obj.name.last}`,
      phone: obj.phone,
      email: obj.email,
      img: obj.picture.large
    }

    res.json(user)
  })
})

//pushing "user" object into "going" array to account for all "users" "going" to "event"
router.post("/going", (req, res, next) => {
  data.going.push(req.body.user)

  res.json(data.going)
})

//getting information from the "going" array
router.get("/going", (req, res, next) => {
  res.json(data.going)
})

//pushing "user" object into "not going" array to account for all "users" "not going" to "event"
router.post("/notgoing", (req, res, next) => {
  data.notGoing.push(req.body.user)

  res.json(data.notGoing)
})

//getting information from the "not going" array
router.get("/notgoing", (req, res, next) => {
  res.json(data.notGoing)
})

module.exports = router
