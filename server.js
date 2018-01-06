const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const PORT = process.env.PORT || 3000

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Homepage',
    welcomeMessage: 'Welcome to my blog'
  })
})

app.get('/about', (req, res) => {
  const data = {
    title: 'About Page'
  }
  res.render('about', data)
})

app.get('/project', (req, res) => {
  const data = {
    title: 'Projects Page'
  }
  res.render('project', data)
})

app.listen(PORT, () => {
  console.log(`Server nodejs is up and running on port ${PORT}`);
})