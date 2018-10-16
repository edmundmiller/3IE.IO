import React from 'react';
import ExampleProjectLogo from '../../images/ncUG3A1O_400x400.jpg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TeamContainer from './TeamContainer';
import styles from '../../css/ProjectDashboard.css';

const Actions = ({ }) => {
    return (
        <div className="social-media-wrapper">
            <Card className="actions-card">                      
                        <div>
                            Audit
                        </div>
            </Card>

            <Card className="actions-card">               
                        <div>
                            Github
                        </div>
            </Card>

            <Card className="actions-card">
                        <div>
                            Mailing List
                        </div>
            </Card>
        </div>
    );
}

export default Actions;