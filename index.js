const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()                          //обьект приложения
const hbs = exphbs.create({                     //настройка конфигр длябудующ шаблонизатора
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)                 //регистрация в экспересе по ключу 'hbs' для // движок для рендаринга страниц //engine ф-ция не вызываю
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))                 //чтобы экспрес мог парсить body
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)                                           //зарегистрировать

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://Victor:qaz123321@cluster0.ipq0n.mongodb.net/todos',             //покл к БД
      {
        useNewUrlParser: true,                     //вордингов в консоли
        useFindAndModify: false
      }
    ) 
    app.listen(PORT, () => {                               //запуск сервера
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
