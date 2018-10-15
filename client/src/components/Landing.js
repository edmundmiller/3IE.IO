import React from 'react';
import Particles from 'react-particles-js';
import logo from '../logo.svg';

class Landing extends React.Component {
	render() {
		return(
			<Particles 
				params={{
					particles: {
						line_linked: {
							shadow: {
								enable: true,
								// color: "#FFFFFF",
								color: "#1D0064",
								blur: 1
							}
						}
					}
				}}
				style={{
					width: '100%'
				}}
			/>
		);
	}
}

export default Landing;
