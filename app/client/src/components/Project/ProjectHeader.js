import React from 'react';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import Ourlogo from '../../resources/3ie.io.svg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TeamContainer from './TeamContainer';
import styles from '../../css/ProjectDashboard.css';

const ProjectHeader = ({ }) => {
    return (
        <div className="project-wrapper">
                <div className="project-card">
                    <img src={Ourlogo} className="project-logo" />
                    <div className="project-header-title">    
                        Project Name
                    </div>
                </div>

                <div className="project-label">
                    <Typography className="title" color="textSecondary" gutterBottom>
                       Project Title
                    </Typography>

                    <div> 
                        This is the Discription
                    </div>
                </div>  

                <TeamContainer />
        </div>
    );
}

export default ProjectHeader;
