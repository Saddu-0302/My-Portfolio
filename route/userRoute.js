const { getAllUser, addUser, contact } = require("../controller/userController")

const router = require("express").Router()

router
    .get("/get-user", getAllUser)
    .post('/add-user', addUser)
    .post('/sendmail', contact)

module.exports = router