const User = require('../models/User.model')

exports.createUser = async (req, res) => {
  const user = new User(req.body)
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    res.status(400).send(error)
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(400).send(error)
  }
}
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}
