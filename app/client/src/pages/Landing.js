import React from 'react';
import Particles from 'react-particles-js';
import '../css/Landing.css';
import params from '../config/Landing.config';

class Landing extends React.Component {
	render() {
		return(
			<Particles
  		  params={params}
			/>
		);
	}	
}



export default Landing;
