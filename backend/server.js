const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
 
const db = mysql.createConnection({
    user:"root",
    host:"127.0.0.1",
    port: 3307,
    password:"",
    database:"fogado"
});
 
app.get("/",(req,res)=>
{
    res.send("Fut a Backend")
})
    db.connect(err =>{
        if(err){
            console.error('Database connection failed:', err);
        }
        else{
            console.log('Connected to MySQL');
        }
});

app.get ("/szobak",( req, res) => {
    db.query('SELECT * FROM szobak', (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(result);
    });
});

app.get ("/foglalasok",( req, res) => {
    const sql = "SELECT * FROM `foglalasok`";
    db.query(sql, (err,result) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(result);
    });
});

app.get("/foglaltsag", (req, res) => {
    const sql = `
    SELECT vnev, erk, tav
    FROM foglalasok
    JOIN vendegek ON foglalasok.fsorsz = vendegek.vsorsz
    ORDER BY v.nev ASC
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(result);
    });
});
 
app.listen(3057, ()=>
{
    console.log("A szerverem a 3057 porton fut")
});