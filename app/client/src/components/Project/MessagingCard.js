import React from 'react';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TeamContainer from './teamContainer';
import styles from '../../css/ProjectDashboard.css';

const MessagingCard = ({ }) => {
    return (
        <div className="social-media-wrapper">
            <Card className="social-media-card">    
                        <div>
                            Telegraph
                        </div>
            </Card>

            <Card className="social-media-card">
                        <div>
                            Slack
                        </div>
            </Card>

            <Card className="social-media-card">
                        <div>
                            Discord
                        </div>
            </Card>
        </div>
    );
}

export default MessagingCard;
