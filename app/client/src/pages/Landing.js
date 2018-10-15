import React from 'react';
import Particles from 'react-particles-js';
import '../css/Landing.css';
import params from '../config/Landing.config';

class Landing extends React.Component {
	render() {
		return(
			<div className='Landing'>
				<Particles
					params={params}
				/>
			</div>
		
		);
	}	
}

export default Landing;
