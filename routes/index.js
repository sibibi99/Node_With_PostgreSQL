var express = require('express');
var router = express.Router();
// Add PostGree
const { Pool, Client } = require('pg')
// pools will use environment variables
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'Sidaica123',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * from contact', (err, res) => {
    // console.log(err, res)
 
  })
  res.render('index', {title: "Chao mung"})
});

/* GET Them Du Lieu */
router.get('/them', function(req, res, next) {
  res.render('them', {title: "Them du lieu"})
});
/* POST Them Du Lieu */
router.post('/them', function(req, res, next) {
  // Lấy dữ liệu 
  var ten = req.body.ten, tuoi = req.body.tuoi;  
  pool.query('INSERT INTO contact (ten, tuoi) VALUES ($1, $2)', [ten, tuoi], (err, res) => {

  })
  res.redirect('xem')
});
// Xem dữ liệu
router.get('/xem', function(req, res, next) { 
  pool.query('SELECT * FROM contact ', (err, dulieu) => {
    // console.log(dulieu.rows);     
    res.render('xem', {title: "Xem dữ liệu", data: dulieu.rows})
    // pool.end()
  })
});
// Xóa dữ liệu
router.get('/xoa/:idcanxoa', function(req, res, next) { 
  var id = req.params.idcanxoa
  pool.query('DELETE FROM contact WHERE id = $1 ', [id], (err, ress) => {
    // console.log(dulieu.rows);     
    res.redirect('xem')
    // pool.end()
  })
});
// Sữa dữ liệu
router.get('/sua/:idcansua', function(req, res, next) { 
  var id = req.params.idcansua
  pool.query('SELECT * FROM contact WHERE id = $1', [id], (err, dulieu) => {
    // console.log(dulieu.rows);     
    res.render('sua', {title: 'Sửa dữ liệu',datasua: dulieu.rows})
  })
});
// Sữa dữ liệu POST
router.post('/sua/:idcansua', function(req, res, next) { 
  // Lấy dữ liệu 
  var id = req.params.idcansua
  var ten = req.body.tensua, tuoi = req.body.tuoisua;  
  console.log(id + 'Tên: '+  ten + 'Tuổi' +tuoi);
  
  pool.query('UPDATE contact SET ten = $1, tuoi = $2 WHERE id = $3', [ten, tuoi,id ], (err, dulieu) => {
  })
  res.redirect('/xem')
  // pool.end()
});

module.exports = router;
