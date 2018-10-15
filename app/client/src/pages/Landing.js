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
				>
        </Particles>
        <h1>Hello</h1>
			</div>
		
		);
	}	
}

export default Landing;
