const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {              //async ф-ция асинхрон т к буду делать запрос в БД
  const todos = await Todo.find({})               //подождус помощью оператора await

  res.render('index', {                           //папка views
    title: 'Todos list',
    isIndex: true,                                 //флаг
    todos
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true                                 //флаг
  })
})

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title                            //title  <input type="text" name="title"> в create.hbs
  })

  await todo.save()                                    //await  подаждать
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id)

  todo.completed = !!req.body.completed                    //!! к булеан значению          (если "true" строка то !!"true"  то boolaen true)
  await todo.save()

  res.redirect('/')
})

module.exports = router
