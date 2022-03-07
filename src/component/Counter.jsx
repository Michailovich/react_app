import React, { useState } from 'react';

const Counter = () => {

    const [counter, setCounter] = useState(0);

    function increment(){
        setCounter(counter+1);
      }
    
      function decrement(){
        setCounter(counter-1);
      }

    return (
        <div>
            <div>{counter}</div>
            <button onClick={increment}>Inc</button>
            <button onClick={decrement}>Deck</button>
        </div>
    );
};

export default Counter;