import { useState, useLayoutEffect } from 'react';
import axios from 'axios';
const mysql = require('mysql2/promise');

export const FXRates = () => {

    const [fxUSD1, setfxUSD1] = useState([]);
    const [fxUSD2, setfxUSD2] = useState([]);
    const [fxUSD3, setfxUSD3] = useState([]);

    const [fxDateNow1, setfxDateNow1] = useState(0);
    const [fxDateNow2, setfxDateNow2] = useState(0);
    const [fxDateNow3, setfxDateNow3] = useState(0);

    const conx = mysql.createConnection({
        host: "13.211.65.106:3306",
        user: "pokeradmin",
        password: "poker6789",
        database: "pokeranalytics"
      });

    const url1 = "https://v6.exchangerate-api.com/v6/61b370327f102d95c5f30e60/latest/USD"
    const url2 = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_3eWhXPMnNdgcR6DMhuo2lPBiRYZXMbfp99qVbGY1"
    const url3 = "https://api.exchangeratesapi.net/v1/exchange-rates/latest?access_key=q90PT0aOUSVUf8iW"

    function formatDate(i){
        const e = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric'});
        if(i == 0 || i == ""){
            return e.format(nowDate);
        } else {
            const u = new Date(i);
            return e.format(u);
        }
    }

    const fetchAPI = async () => {
        try {
        
        const response1     = await axios.get(url1);
        const response2     = await axios.get(url2);
        const response3     = await axios.get(url3);

        setfxUSD1(response1.data.conversion_rates)
        setfxUSD2(response2.data.data)
        setfxUSD3(response3.data.rates)

        setfxDateNow1(formatDate(JSON.stringify(response1.data.time_last_update_utc)))
        setfxDateNow2(formatDate(0))
        setfxDateNow3(formatDate(response3.data.date))
        
        conx.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
            
            conx.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });

          });

        } catch (error) {
        console.error("Error fetching data: ", error);
        }
    }





return (
  <>
    <h3>
      Fetching FX Rate to send to database
    </h3>
    <br/>

    <pre>
      <h2>Response from v6.exchangerate-api.com</h2>
      <p>Date: {fxDateNow1}</p>
      {JSON.stringify(fxUSD1,0,2)}
    </pre>

    <br/>

    <pre>
      <h2>Response from api.freecurrencyapi.com</h2>
      <p>Date: {fxDateNow2}</p>
      {JSON.stringify(fxUSD2,0,2)}
    </pre>

    <br/>

    <pre>
      <h2>Response from api.exchangeratesapi.net</h2>
      <p>Date: {fxDateNow3}</p>
      {JSON.stringify(fxUSD3,0,2)}
    </pre>
  </>
)
}