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
                    <div className="project-header-title" >    
                        WebBlock
                    </div>
                </div>

                <div className="project-label">
                    <Typography variant="h5" component="h2" color="inherit">
                       Hedera Based Webhosting
                    </Typography>

                    <div> 
                        Decentralized AWS
                    </div>
                </div>  

                <TeamContainer />
        </div>
    );
}

export default ProjectHeader;
