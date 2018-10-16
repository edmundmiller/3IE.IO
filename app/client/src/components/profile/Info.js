import React from 'react';

class Info extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: null
		};
	}

	render() {
		return (
			<div>
				<h1>this is my info</h1>
			</div>
		);
	}

}

export default Info;
