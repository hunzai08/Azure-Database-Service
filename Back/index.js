const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/', async (req, res) => {
    try {
        res.json({ Message: "AOA, Kasay hain Ap log...API SAHE CHAL RAHA HAI" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/regions', async (req, res) => {
    try {
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/regions', async (req, res) => {
    try {
        const { region_name } = req.body;
        const result = await pool.query(
            "INSERT INTO regions (region_name) VALUES ($1) RETURNING *",
            [region_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/regions/:id', async (req, res) => {
    try {
        const { ID } = req.params;
        const { region_name } = req.body;

        const result = await pool.query(
            `UPDATE regions
            SET region_name = $1
            WHERE region_id = $2
            RETURNING *`,
            [region_name, ID]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Region not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/locations', async (req, res) => {
    try {
        const results = await pool.query('select * from locations');
        res.json(results.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/departments', async (req, res) => {
    try {
        const results = await pool.query('select * from departments');
        res.json(results.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/jobs', async (req, res) => {
    try {
        const results = await pool.query('select * from jobs');
        res.json(results.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
app.get('/employees', async (req, res) => {
    try {
        const results = await pool.query('select * from employees');
        res.json(results.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


app.listen(3000, () => {
    console.log(`SERVER IS RUNNIONG ON PORT 3000`);
})
