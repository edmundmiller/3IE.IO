import React from 'react';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import BetterLogo from '../../resources/example-Logo.svg';
import Ourlogo from '../../resources/3ie.io.svg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TeamContainer from './TeamContainer';
import styles from '../../css/ProjectDashboard.css';

const ProjectHeader = ({ }) => {
    return (
        <div className="project-wrapper">
                <div className="project-card">
                    <img src={BetterLogo} className="project-logo" />
                    <div className="project-header-title" >   
                        <Typography variant="h5" component="h2" color="inherit"> 
                            WebBlock
                        </Typography>
                    </div>
                </div>

                <div className="project-label">
                    <Typography variant="h5" component="h2" color="inherit">
                       Hedera Webhosting
                    </Typography>

                    <div className="project-label-subtext"> 
                        A platform to build a decentralized web hosting. Users will upload 
                        compatatible code into the hedera file system, and the hosting 
                        will be deployed to a user network. Micropayments will directly 
                        pay users who donate computer power. 

                    </div>
                </div>  

                <TeamContainer />
        </div>
    );
}

export default ProjectHeader;
