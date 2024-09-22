const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('[mongodb] MongoDB connected')
  } catch (error) {
    console.error('[mongodb] MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
