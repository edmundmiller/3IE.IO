import React from 'react';
import Particles from 'react-particles-js';
import '../css/Landing.css';
import params from '../config/Landing.config'; 

class Landing extends React.Component {
	render() {
		return(
			<div className='Landing'>
				{/* <div className='welcome'>Welcome to 3IE.IO</div> */}
				<Particles params={params} className='Particles' />
				{/* <div className='info'>
					Where Hashgraphers (FARM)
						<ul>
							<li>Familiarize with the tech</li>
							<li>Align with the community</li>
							<li>Rely on the information/data</li>
							<li>Mature their invention, skillset, knowledge</li>
						</ul>
				</div> */}
			</div>
		);
	}
}

export default Landing;
