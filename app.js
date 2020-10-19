const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'nodemysql'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

const app = express();
app.listen('3000', () => {
    console.log('Server started on port 3000');
});

//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'create database nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Database created');
        console.log(result);
    });
});

//Create table
app.get('/createposttable', (req, res) => {
    let sql = 'create table posts(id int AUTO_INCREMENT, tilte varchar(255), body varchar(255), primary key(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post table created');
    });
});

//Insert post
app.get('/addpost1', (req, res) => {
    let post = {tilte: 'Post 1', body: 'This is post 1'};
    let sql = 'insert into posts set ?'
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send('Post 1 added');
    });
});

app.get('/addpost2', (req, res) => {
    let post = {tilte: 'Post 2', body: 'This is post 2'};
    let sql = 'insert into posts set ?'
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send('Post 2 added');
    });
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql = 'select * from posts'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send('Posts fetched');
    });
});

app.get('/getpost/:id', (req, res) => {
    let sql = `select * from posts where id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched');
    });
});

//Update
app.get('/updpost/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `update posts set tilte = '${newTitle}' where id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated');
    });
});

//Delete
app.get('/deletepost/:id', (req, res) => {
    let sql = `delete from posts where id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted');
    });
});