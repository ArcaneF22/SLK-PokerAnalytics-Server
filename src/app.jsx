import { useState } from 'react';
import { AutoExchangeRates } from './php/fxrate'


const App = () => {
  const [count, setCount]       = useState(0);
  const [username,setUsername]  = useState("");
  const [password,setPassword]  = useState("");

  return (
    <main>
      <h1>Hello there!</h1>
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
      <div>
      <AutoExchangeRates />
      </div>

    </main>
  );
};

export default App;
