import React from 'react';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TeamContainer from './TeamContainer';
import styles from '../../css/ProjectDashboard.css';

const ProjectHeader = ({ }) => {
    return (
        <div className="project-wrapper">
                <div className="project-card">
                    <Card>
                        <img src={ExampleProjectLogo} className="project-logo" />
                        <Typography className={styles.title} color="textSecondary" gutterBottom>
                            Project Name
                        </Typography>
                    </Card>
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
