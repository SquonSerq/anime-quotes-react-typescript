import IQuote from "../types/types";

interface QuoteProps {
	quote: IQuote
}

const Quote = (props: QuoteProps) => {
	return ( 
		<>
			<p className="quote-span">Anime</p>
			<p className="quote-text-element">{props.quote.anime}</p>
			<p className="quote-span">Character</p>
			<p className="quote-text-element">{props.quote.character}</p>
			<p className="quote-span">Quote</p>
			<p className="quote-text">{props.quote.quote}</p>
		</>
	);
}

export default Quote;