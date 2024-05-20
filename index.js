const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config({ path: ".env" })

const app = express()

// middleware
app.use(express.json())
app.use(cors())

//router
app.use("/api/user", require("./route/userRoute"))

//404
app.use("*", (err, req, res) => {
    res.status(404).json({ message: err.message || "Resource Not found" })
})

//error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Something Went Wrong" })
})

//db
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})