import React from 'react';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TeamContainer from './TeamContainer';
import TelegraphLogo from '../../resources/coin-telegraph.png'
import SlackLogo from '../../resources/slack-1.svg';
import DiscordLogo from '../../resources/discord-logo.svg'
import styles from '../../css/ProjectDashboard.css';


const MessagingCard = ({ }) => {
    return (
        <div className="social-media-wrapper">
            <div className="social-media-card">    
                <img src={TelegraphLogo} className="social-media-image" />

                <div className="social-media-header">
                    Telegraph
                </div>

                <a href="https://discord.gg/ndVGddG" className="social-media-subtext">
                    Join
                </a>
            </div>

            <div className="social-media-card">
                <img src={SlackLogo}  className="social-media-image" />

                <div className="social-media-header">
                    Slack
                </div>

                <a href="https://discord.gg/ndVGddG" className="social-media-subtext">
                    Join
                </a>
                
            </div>

            <div className="social-media-card">
                <img src={DiscordLogo}  className="social-media-image" />

                <div className="social-media-header">
                    Discord
                </div>

                <a href="https://discord.gg/ndVGddG" className="social-media-subtext">
                    Join
                </a>
            </div>
        </div>
    );
}

export default MessagingCard;
