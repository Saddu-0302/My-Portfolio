const asyncHandler = require("express-async-handler")
const User = require("../model/User")

const sendEmail = require("../utils/email")

exports.addUser = asyncHandler(async (req, res) => {
    const { name, email, mobile, subject, textarea } = req.body
    const result = await User.findOne({ email })
    if (result) {
        return res.status(400).json({ message: "Email Already Exist" })
    }
    // if (validator.isEmpty(name || "")) {
    //     return res.status(400).json({ message: "name is required" })
    // }
    // if (validator.isEmpty(email || "")) {
    //     return res.status(400).json({ message: "email is required" })
    // }
    // if (validator.isEmpty(mobile || "")) {
    //     return res.status(400).json({ message: "mobile is required" })
    // }
    // if (validator.isEmpty(subject || "")) {
    //     return res.status(400).json({ message: "subject is required" })
    // }
    // if (validator.isEmpty(textarea || "")) {
    //     return res.status(400).json({ message: "textarea is required" })
    // }
    await User.create({ name, email, mobile, subject, textarea })
    res.json({ message: "User Add Success" })
})
exports.getAllUser = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({ message: "User Fetch Success", result })
})

exports.contact = asyncHandler(async (req, res) => {
    const { name, email, mobile, subject, textarea } = req.body

    console.log(req.body);

    const client = await sendEmail({
        name,
        to: email,
        message: ``,
    })
    const me = await sendEmail({
        name,
        to: process.env.FROM_EMAIL,
        message: `
        Name:${name},
        Email:${email}
        Mobile:${mobile}
        Subject:${subject}
        Textarea:${textarea}
        `,
    })

    if (client) {
        res.status(200).json({ message: "Email Send Success" })
    } else {
        res.status(400).json({ message: "unable to send message" })
    }
    if (me) {
        res.status(200).json({ message: "Email Send Success" })
    } else {
        res.status(400).json({ message: "unable to send message" })
    }

    res.status(201).json({ message: 'contact added success', })
})
