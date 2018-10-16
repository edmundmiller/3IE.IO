import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProjectHeader from './ProjectHeader';
import Audit from './Audit';
import SelectionDrawer from './SelectionDrawer';
import MessagingCard from './MessagingCard';
import styles from '../../css/ProjectDashboard.css';

function TabContainer({ children}) {
    return (
      <Typography component="div" dir="left" style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }

class ProjectDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelection: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({ tabSelection: value  });
    };

    
  render() {
    return (    
      <div className="project-outer-wrapper"> 
        <ProjectHeader />

        <MessagingCard />

        <Audit />

        <div className="updates-share-wrapper">
            <div className="updates-wrapper"> 
                    Updates
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

      <SelectionDrawer />
      
      </div>
    );
  }
}

export default (ProjectDashboard);
