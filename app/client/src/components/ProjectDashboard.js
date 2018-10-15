import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExampleProjectLogo from '../images/ncUG3A1O_400x400.jpg';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from '../css/ProjectDashboard.css';

class ProjectDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelection: '',
        };
    }

    componentDidMount() {

    }

    
  render() {

      console.log(styles.projectInfo);
    return (    
      <div> 
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
        </div>

        <div className="social-media-wrapper">
            <Card className="social-media-card">
                        <img src={ExampleProjectLogo} className="team-member-profile-image" />
                        <div>
                            Telegraph
                        </div>
            </Card>

            <Card className="social-media-card">
                        <img src={ExampleProjectLogo} className="team-member-profile-image" />
                        <div>
                            Slack
                        </div>
            </Card>

            <Card className="social-media-card">
                        <img src={ExampleProjectLogo} className="team-member-profile-image" />
                        <div>
                            Discord
                        </div>
            </Card>
        </div>

        <div className="updates-share-wrapper">
            <div className="updates-wrapper"> 
                <Typography className={styles.title} color="textSecondary" gutterBottom>
                    Updates
                </Typography>

                <Card className="updates-card">        
                    <Typography className={styles.title} color="textSecondary" gutterBottom>
                        Update Title
                    </Typography>

                    <div> 
                        Update Discription
                    </div>
                </Card>

                <Card className="updates-card">        
                    <Typography className={styles.title} color="textSecondary" gutterBottom>
                        Update Title
                    </Typography>

                    <div> 
                        Update Discription
                    </div>
                </Card>
            </div>

            <div className="share-wrapper"> 
                share
                <Card className="share-social-media-card">  
                    <Typography className={styles.title} color="textSecondary" gutterBottom>
                        Twitter
                    </Typography>

                    <Typography className={styles.title} color="textSecondary" gutterBottom>
                        Facebook
                    </Typography>
                </Card>
            </div>
        </div>


        <Paper square>
            <Tabs
            value={this.state.tabSelection}
            indicatorColor="primary"
            textColor="primary"
            >
            <Tab label="Comments" />
            <Tab label="Contact" />
            <Tab label="More Info" />
            </Tabs>
      </Paper>

      </div>
    );
  }
}






export default (ProjectDashboard);
