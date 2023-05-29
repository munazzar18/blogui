const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo()

const app = express()
const port = 3500

app.use(cors())
app.use(express.json())

app.use('/api/blogs/public' , require('./routes/blogs'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/category', require('./routes/category'))
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/blogs', require('./routes/comments'))



app.get('/', (req, res) => {
  res.send('Hello Blogger!')
})

app.listen(port, () => {
  console.log(`Blog Server listening on port ${port}`)
})