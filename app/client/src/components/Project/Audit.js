import React from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HederaApi from '../../hedera';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../../css/ProjectDashboard.css';

class Audit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           clicked: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => {
        this.setState({ clicked: false });
        console.log(HederaApi.rewardAuditWithMicroPayment('contractHex', 'accountID', 50));
    }

    handleChange = (event) => {
        this.setState({ clicked: true });
    };

    
  render() {
    let AuditForm = (<div className="audit-card-selected-wrapper">
        <a href="www.github.com/hederaProject" target="_blank">www.github.com/hederaProject </a>
        <p>Have you audited the project?</p>
        <Checkbox /> <span style={{color: 'green'}}> Yes </span>
        <Checkbox /> <span style={{color: 'red'}}> No </span> 
        <div> 
        <TextField
          className="audit-text-input"
          id="outlined-multiline-flexible"
          label="Feedback"
          multiline
          rowsMax="8"
          margin="normal"
          variant="outlined"
        />
        </div>
        <div className="audit-button"> 
            <Button  onClick={this.handleClick} variant="contained" color="secondary">
                Submit
            </Button>
        </div>
    </div>);
    let cardClass = this.state.clicked ?  "actions-card-selected" : "actions-card";
    let otherActions = !this.state.clicked && (<Card className="actions-card"><div>Github</div></Card>);
    
    return (    
        <div className="actions-wrapper" onClick={this.handleChange}>
            <Card className={cardClass}>                      
            {!this.state.clicked && "Audit"}
                    {this.state.clicked && AuditForm}
            </Card>

            {otherActions}
        </div>
    );
  }
}






export default (Audit);
