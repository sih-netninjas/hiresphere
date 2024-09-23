const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const { Storage } = require('megajs')
// This is just for testing, this is not my personal account and i am only using it for SIH. We can move to a business account later.
const storage = new Storage({
  email: 'parv141206@gmail.com',
  password: 'this_is_temp_bozo',
})

const upload = multer({ dest: 'uploads/' })

storage.ready.then(() => {
  console.log('[mega] Connected')
})

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('[mega] No file uploaded.')
    }

    const fileStream = fs.createReadStream(req.file.path)

    const uploadStream = storage.upload({
      name: req.file.originalname,
      size: req.file.size,
    })

    fileStream.pipe(uploadStream)

    uploadStream.on('complete', (file) => {
      console.log('[maga] The file was uploaded!', file)
      res.send(`File uploaded successfully: ${file.name}`)

      fs.unlink(req.file.path, (err) => {
        if (err) console.error('[maga] Error deleting temporary file:', err)
      })
    })

    uploadStream.on('error', (error) => {
      console.error('[maga] Error uploading file:', error)
      res.status(500).send('Error uploading file to MEGA')
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error processing request')
  }
})

module.exports = router
