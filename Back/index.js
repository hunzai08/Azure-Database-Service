const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized : false
    }
});

app.get('/',async(req,res)=>{
    try{
        res.json({Message : "AOA, Kasay hain Ap log...API SAHE CHAL RAHA HAI"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get('/reg',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})
app.get('/locations',async(req,res)=>{
    try{
        const results = await pool.query('select * from locations');
        res.json(results.rows);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get('/departments',async(req,res)=>{
    try{
        const results = await pool.query('select * from departments');
        res.json(results.rows);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get('/jobs',async(req,res)=>{
    try{
        const results = await pool.query('select * from jobs');
        res.json(results.rows);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})
app.get('/employees',async(req,res)=>{
    try{
        const results = await pool.query('select * from employees');
        res.json(results.rows);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


app.listen(3000,()=>{
    console.log(`SERVER IS RUNNIONG ON PORT 3000`);
})
