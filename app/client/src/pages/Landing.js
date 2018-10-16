import React from 'react';
import Particles from 'react-particles-js';
import '../css/Landing.css';
import params from '../config/Landing.config'; 

class Landing extends React.Component {
	render() {
		return(
			<div className='Landing'>
				<div className='welcome'><h1>Welcome to 3IE.IO</h1></div>
        <div className='welcome2'><h1>The Tech Farm For Hedera Hashgraph</h1></div>
				<Particles params={params} className='Particles' />
			</div>
		);
	}
}

export default Landing;
