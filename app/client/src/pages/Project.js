import React from 'react';
import ProjectDashboard from '../components/Project/ProjectDashboard';
import '../css/Project.css'
class Project extends React.Component {
	render() {
		return(
			<div className="ProjectBase"> 
                <ProjectDashboard />
      </div>
		);
	}	
}

export default Project;
