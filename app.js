const axios = require("axios");
const express = require("express");
require("dotenv").config();
const app = express();

const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

app.get('/api/rates', async function Rates (req, res) {

    if (req.query.hasOwnProperty("base") && req.query.hasOwnProperty("symbols")) { 
        base = req.query.base
        symbols = req.query.symbols
        url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`
    } else {
        url = "https://api.exchangeratesapi.io/latest"
    }

    try {
        var response = await axios.get(url)
        result = {
            "base": response.data.base,
            "date": response.data.date,
            "rates": response.data.rates
        }
        res.status(200).send({results: result})

    } catch (error) {
        console.error(error)
        res.status(400).send(error.response.data)
    }
})


/* Listen to port */
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})