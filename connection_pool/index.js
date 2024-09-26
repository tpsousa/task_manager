const express = require('express');
const exphbs = require('express-handlebars');  // Renomeie o 'hbs' para 'exphbs'
const pool  = require('./db/conn')
const { restart } = require('nodemon');

const app = express();

// Configuração do Handlebars como engine de template
const hbs = exphbs.create({ extname: '.handlebars' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({
  extended : true
}))

app.use(express.json) 


const port = 3000;

app.get('/', (req, res) => {
  res.render('home');  // Certifique-se de ter o arquivo 'home.handlebars' na pasta 'views'
});

app.post('/books/insertbook',(req,res)=>{
  const title = req.body.title

  const pageqty = req.body.pageqty

  const query = `INSERT INTO books (title,pageqty) VALUES ('${title}',${page})`

  pool.query(sql,function (err){
    if(err){
      console.log(err)
    }
    res.redirect('/')
  })
})
app.get('/books',(req,res)=>{
  const sql = "SELECT * FROM cliente"

  pool.query(sql,function (err,data){
   
    if(err){
      console.log(err)
      return 
    }

    const books = data

    console.log(books)

    res.render('books',{books})
  })
})

app.get('/books/edit/:id',(req,res)=>{
  const id = req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}`

  pool.query(sql,function (err,data){
    if(err){
      console.log(err)
      return
    }

    const book = data[0]

    res.render('editbook',{book})
  })
})

app.post('/books/updatebook',(req,res)=>{
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sql = `UPDATE books SET title  = '${title}',pageqty = '${pageqty}' WHERE  id = '${id}'`

  pool.query(sql,function (err){
   if(err){
    console.log(err)
    return
   }

   res.redirect('/books')
  })
})

app.post('/books/remove/:id',(req,res)=>{
  const id = req.params.id

  const sql = `DELETE FROM books WHERE id = ${id}`

  pool.query(sql,function (err){
    if(err){
      console.log(err)
      return
    }

    res.redirect('/books')
  })
})
// const pool = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: ''
// });

// pool.connect(err => {
//   if (err) {
//     console.error('Erro ao conectar ao banco de dados:', err);
//     return;
//   }
//   console.log('Conectado ao banco de dados');
// });

// app.listen(port, () => {
//   console.log(`Servidor iniciado na porta ${port}`);
// });