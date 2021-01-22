var express = require('express')
var router = express.Router()
const mysql = require('mysql');
var bodyParser = require('body-parser').json();

const connection = mysql.createConnection({
    host: 'team1db.cqlqhfhtmf3o.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'booksdb'
})
 
connection.connect();

//Get entire list of all books
router.get('/', function (req, res) {
    connection.query("SELECT * FROM booksdb.books;", function (err, rows, fields) {
        if (err) throw err
        res.json(rows);
    })
})

//Add book to database
router.post('/add', bodyParser, (req, res) => {
    connection.query("INSERT INTO `booksdb`.`books` (`bookname`) VALUES (?);", req.body.bookname, function (err, rows, fields) {
        if (err) throw err

        res.json({ message: "Book Successfully Added!" });
        res.end();
    });
});

//Delete employee from database
router.delete('/:id', function (req, res) {
    connection.query("DELETE FROM `booksdb`.`books` WHERE id = ?", [req.params.id], function (err, rows, fields) {
        if (err) throw err

        if (rows.affectedRows == 1) {
            res.status(204).json("Deleted!");
        }
        else {
            res.status(404);
            res.json({ error: "Book not found!" });
        }
    });
})

//Update employee info
router.put('/:id', bodyParser, function (req, res) {
    connection.query("UPDATE `booksdb`.`books` SET `bookname` = ? WHERE `id` = ?;", [req.body.bookname, req.params.id], function (err, rows, fields) {
        if (err) throw err

        if (rows.changedRows === 1) {
            res.status(200).json({ message: "Book updated!" });
        }
        else {
            res.status(404);
            res.json({ error: "Book not found!" });
        }
    });
}) 

module.exports = router
