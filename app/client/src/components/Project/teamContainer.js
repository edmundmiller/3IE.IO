import React from 'react'
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg'
import ExamplePortfolioOne from '../../resources/profileOne.png'
import ExamplePortfolioTwo from '../../resources/ProfileThree.png'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import styles from '../../css/ProjectDashboard.css'

const TeamContainer = ({}) => {
  return (
    <div className="project-team-wrapper">
      <div className="project-team-header">Meet The Team:</div>

                    <Card className="team-member-card">
                        <img src={ExamplePortfolioOne} className="team-member-profile-image" />
                        <div>
                                Becky Ross
                            <Typography className={styles.title} color="inherit" gutterBottom>
                                Front End Developer
                            </Typography>
                        </div>

                        
                    </Card>

                    <Card className="team-member-card">
                        <img src={ExamplePortfolioTwo} className="team-member-profile-image" />
                        <div>
                            Charles Forrest
                            <Typography className={styles.title} color="inherit" gutterBottom>
                                Backend Developer
                            </Typography>
                        </div>                  
                    </Card>
                </div>
    );
}

export default TeamContainer
