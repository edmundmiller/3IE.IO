import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import styles from '../../css/ProjectDashboard.css';


function TabContainer({ children}) {
    return (
      <Typography component="div" dir="left" style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }

class SelectionDrawer extends React.Component {
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
      <div className="selection-drawer-wrapper"> 
        <Paper className="selection-drawer-paper" square>
            <Tabs
            value={this.state.tabSelection}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            >
            <Tab label="Comments" />
            <Tab label="Contact" />
            <Tab label="More Info" />
            </Tabs>

            {this.state.tabSelection === 0 &&<TabContainer>Comments</TabContainer>}
            {this.state.tabSelection === 1 &&<TabContainer>Contact</TabContainer>}
            {this.state.tabSelection === 2 &&<TabContainer>More Info</TabContainer>}
      </Paper>

      </div>
    );
  }
}






export default (SelectionDrawer);
