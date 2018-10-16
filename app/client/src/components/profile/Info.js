import React from 'react';
import Avatar from './Avatar';

class Info extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: null
		};
	}

	render() {
		return (
			<div className='profile-info'>
				<Avatar />
				<h1>Leemon Baird</h1>
			</div>
		);
	}

}

export default Info;
