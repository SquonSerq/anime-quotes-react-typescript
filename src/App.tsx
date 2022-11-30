import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import IQuote from './types/types';

const App = () => {
  const [quote, setQuote] = useState<IQuote>()

	async function fetchQuote() {
		try{
			const response = await axios.get('https://animechan.vercel.app/api/random')
      setQuote(response.data)
		} catch(e){
			alert(e)
		}
	}

	useEffect(() => {
    fetchQuote()
	}, [])

  return ( 
    <div>
      <p>{quote?.anime}</p>
      <p>{quote?.character}</p>
      <p>{quote?.quote}</p>
    </div>
  );
}

export default App;