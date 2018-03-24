const mysql = require('mysql');
const Promise = require('bluebird');
const app = require('express')();

//   sql setup   //
const sql = mysql.createConnection({
  host: 'localhost',
  user: process.env.SQL_DB_USER,
  password: process.env.SQL_DB_PASS,
  database: process.env.SQL_DB_NAME
});

// express setup //
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log('hit route');
  res.render('landing');
});

app.get('/response', async (req, res) => {
  const query = 'select * from customers';
  const result = await Promise.fromCallback((cb) => sql.query(query, cb));
  console.log(result[0].name);
});

app.listen(process.env.PORT, async () => {
  console.log(`app started on port ${process.env.PORT}`);
  await Promise.fromCallback((cb) => sql.connect(cb));
  console.log('connected to database');
});
