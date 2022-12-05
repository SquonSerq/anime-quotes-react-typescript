import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useState, useEffect, useRef } from 'react';
import IQuote from './types/types';
import Quote from './components/Quote'
import Findbyname from './components/FindByName';
import image_search_api from './config/image_search_conf.json'

const options: AxiosRequestConfig = {
  method: 'GET',
  url: 'https://bing-image-search1.p.rapidapi.com/images/search',
  headers: {
    'X-RapidAPI-Key': image_search_api['X-RapidAPI-Key'],
    'X-RapidAPI-Host': image_search_api['X-RapidAPI-Host']
  }
}

const nullQuote: IQuote = {
  anime: "Loading...",
  character: "Loading...",
  quote: "Loading...",
} ;

const App = () => {
  const [quote, setQuote] = useState<IQuote>(nullQuote);
  const [imgUrl, setImgUrl] = useState('./loading.gif');
  const [characterName, setCharacterName] = useState('');
  const isFirstRun = useRef(true);
  const isUpdating = useRef(true);

  const findByName = function(name: string){
    setCharacterName(name);
  }

  const updateRandomByButton = () => {
    characterName === ''
    ? fetchQuote()
    : setCharacterName('')
  }

	async function fetchQuote() {
		try{
      isUpdating.current = true;
      setImgUrl('./loading.gif');
      var response;
      characterName === '' 
      ? response = await axios.get('https://animechan.vercel.app/api/random') 
      : response = await axios.get('https://animechan.vercel.app/api/random/character?name='+characterName)
      setQuote(response.data);
		} catch(e: Error | AxiosError | any) {
      alert(e.message)
      setCharacterName('')
    }
	}

  async function fetchImage() {
    try{
      console.log('instant');
      options.params = {q: quote?.character + " " + quote?.anime, count: 1}
      const response = await axios(options);
      setImgUrl(response.data['value'][0]['thumbnailUrl']);
    } catch(e){
      alert(e)
    }
  }

	useEffect(() => {
    fetchQuote();
	}, [characterName])

  useEffect(() => {
    if (isFirstRun.current){
      isFirstRun.current = false;
      return
    }
    fetchImage();
    isUpdating.current = false;
  }, [quote.anime, quote.character])

  return ( 
    <div className='container'>
      <img className='character-img' src={isUpdating.current ? './loading.gif' : imgUrl} alt=""></img>
      <div className='quote-wrap'>
        <Quote quote={isUpdating.current ? nullQuote : quote} />
      </div>
      <button className="button" onClick={isUpdating.current ? undefined : updateRandomByButton}>Get new random quote</button>
      <details className='spoiler'>
        <summary className='spoiler-title'>Find quote by character</summary>
        <Findbyname onNameSubmit={findByName} />
      </details>
    </div>
  );
}

export default App;