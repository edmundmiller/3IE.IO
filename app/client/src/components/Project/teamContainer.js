import React from 'react';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import styles from '../../css/ProjectDashboard.css';

const TeamContainer = ({ }) => {
    return (
        <div className="project-team-wrapper"> 
                    <div>
                        Meet The Team:
                    </div>

                    <Card className="team-member-card">
                        <img src={ExampleProjectLogo} className="team-member-profile-image" />
                        <div>
                            Name
                        </div>

                        <Typography className={styles.title} color="textSecondary" gutterBottom>
                            Role
                        </Typography>
                    </Card>

                    <Card className="team-member-card">
                        <img src={ExampleProjectLogo} className="team-member-profile-image" />
                        <div>
                            Name
                        </div>

                        <Typography className={styles.title} color="textSecondary" gutterBottom>
                            Role
                        </Typography>
                    </Card>
                </div>
    );
}

export default TeamContainer;