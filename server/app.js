const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/account', require('./routes/account'))
app.use('/api/search', require('./routes/search'))

const PORT = process.env.PORT || 5001

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT} `))
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()
