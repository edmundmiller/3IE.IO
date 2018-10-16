import React from 'react';
import Avatar from './Avatar';
import Desc from './infoHelp';

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
				<Desc />
			</div>
		);
	}
}

export default Info;
