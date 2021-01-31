const axios = require("axios");
const express = require("express");
const app = express();


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
        console.log(response)
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
app.listen(3000, () => {
    console.log(`"Server is running on port 3000!`)
})