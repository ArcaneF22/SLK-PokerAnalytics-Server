import { useEffect, useState } from 'react';
import axios from 'axios';

export const AutoExchangeRates = () => {

    const nowDate                           = new Date();
    const url1                              = "v6.exchangerate-api.com"
    const url2                              = "api.freecurrencyapi.com"
    const url3                              = "api.exchangeratesapi.net"

    const [fxUSD1, setfxUSD1]               = useState([]);
    const [fxUSD2, setfxUSD2]               = useState([]);
    const [fxUSD3, setfxUSD3]               = useState([]);

    const [fxDateNow1, setfxDateNow1]       = useState(0);
    const [fxDateNow2, setfxDateNow2]       = useState(0);
    const [fxDateNow3, setfxDateNow3]       = useState(0);

    const URL_A          = "https://v6.exchangerate-api.com/v6/61b370327f102d95c5f30e60/latest/USD"
    const URL_B          = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_3eWhXPMnNdgcR6DMhuo2lPBiRYZXMbfp99qVbGY1"
    const URL_C          = "https://api.exchangeratesapi.net/v1/exchange-rates/latest?access_key=q90PT0aOUSVUf8iW"
    const URL            = "https://13.211.65.106/pokerapp/upsert/exchangerates_auto.php"

    function formatDate(i){
        const e = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric'});
        if(i == 0 || i == ""){
            return e.format(nowDate);
        } else {
            const u = new Date(i);
            return e.format(u);
        }
    }

    const onNow = new Date();
    const onHour = onNow.getHours();

    useEffect(() => {
        if(onHour == 12){
            insertFX()
        } else if(onHour == 23){
            updateFX()
        }
    }, [onHour]);
    
    const insertFX = async () => {
        try {
        
          const response1     = await axios.get(URL_A);
          const response2     = await axios.get(URL_B);
          const response3     = await axios.get(URL_C);

          setfxUSD1(response1.data.conversion_rates)
          setfxUSD2(response2.data.data)
          setfxUSD3(response3.data.rates)

          setfxDateNow1(formatDate(JSON.stringify(response1.data.time_last_update_utc)))
          setfxDateNow2(formatDate(0))
          setfxDateNow3(formatDate(response3.data.date))
       
        const upsert1 = await axios.post(URL, {
                                                                          ON:            "PUT",
                                                                          id:             0,
                                                                          provider:       url1,
                                                                          datestamp:      formatDate(JSON.stringify(response1.data.time_last_update_utc)),
                                                                          rates:          response1.data.conversion_rates,
                                                                          status:         0,
                                                                      });

        const upsert2 = await axios.post(URL, {
                                                                          ON:            "PUT",
                                                                          id:             0,
                                                                          provider:       url2,
                                                                          datestamp:      formatDate(0),
                                                                          rates:          response2.data.data,
                                                                          status:         0,
                                                                      });

        const upsert3 = await axios.post(URL, {
                                                                          ON:            "PUT",
                                                                          id:             0,
                                                                          provider:       url3,
                                                                          datestamp:      formatDate(response3.data.date),
                                                                          rates:          response3.data.rates,
                                                                          status:         0,
                                                                      });

        console.log(upsert1.data+" ADDED")
        console.log(upsert2.data+" ADDED")
        console.log(upsert3.data+" ADDED")
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
  }

    const updateFX = async () => {
        try {
        
          const response1     = await axios.get(URL_A);
          const response2     = await axios.get(URL_B);
          const response3     = await axios.get(URL_C);

          setfxUSD1(response1.data.conversion_rates)
          setfxUSD2(response2.data.data)
          setfxUSD3(response3.data.rates)

          setfxDateNow1(formatDate(JSON.stringify(response1.data.time_last_update_utc)))
          setfxDateNow2(formatDate(0))
          setfxDateNow3(formatDate(response3.data.date))
       
        const upsert1 = await axios.post(URL, {
                                                                          ON:            "FORCE",
                                                                          id:             0,
                                                                          provider:       url1,
                                                                          datestamp:      formatDate(JSON.stringify(response1.data.time_last_update_utc)),
                                                                          rates:          response1.data.conversion_rates,
                                                                          status:         0,
                                                                      });

        const upsert2 = await axios.post(URL, {
                                                                          ON:            "FORCE",
                                                                          id:             0,
                                                                          provider:       url2,
                                                                          datestamp:      formatDate(0),
                                                                          rates:          response2.data.data,
                                                                          status:         0,
                                                                      });

        const upsert3 = await axios.post(URL, {
                                                                          ON:            "FORCE",
                                                                          id:             0,
                                                                          provider:       url3,
                                                                          datestamp:      formatDate(response3.data.date),
                                                                          rates:          response3.data.rates,
                                                                          status:         0,
                                                                      });

        console.log(upsert1.data+" UPDATED")
        console.log(upsert2.data+" UPDATED")
        console.log(upsert3.data+" UPDATED")
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
  }



  return (
    <>
      <h3>
        Hour {onHour} 
      </h3>
      <button onClick={updateFX}>Force update now</button>
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
