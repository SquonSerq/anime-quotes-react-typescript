import React, { useState } from "react";

interface FindbynameProps{
	onNameSubmit: (characterName: string) => void
}

const Findbyname = (props: FindbynameProps) => {
	const [name, setName] = useState('')

	const onChangeCharacter = (e : React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const onNameSubmit = (e: any) => {
		props.onNameSubmit(name)
	}

	return (
		<>
			<input className="input" type="text" onChange={onChangeCharacter} />
			<button className="button" onClick={onNameSubmit}>Find by character</button>
		</>
	);
}

export default Findbyname;