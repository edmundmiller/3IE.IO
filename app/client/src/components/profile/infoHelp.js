/**
 * 
 * I apologize for this cluster fuck
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Desc(props) {
  const { classes } = props;

  return (
    <div className='profile-paper'>
      <Paper className={classes.root} elevation={1}>
				<div className='profile-desc-flex-wrapper'>
					<div className='profile-desc-flex-wrapper-left'>
						<Typography variant="h5" component="h3">
        		  <div style={{padding: '5%'}}>Leemon Baird</div>
        		</Typography>

						<Typography variant="h5" component="h3">
						<div style={{padding: '5%'}}>CTO</div>
        		</Typography>
		
						<Typography variant="h5" component="h3">
						<div style={{padding: '5%'}}>HBAR 5000000 €</div>
        		</Typography>
					</div>
					<div className='profile-desc-flex-wrapper-right'>
					<Typography variant="h5" component="h3">
        		<span style={{color: 'white', margin: '10%'}}>e</span>
        		</Typography>
						<Typography variant="h5" component="h3">
        		  <div style={{float: 'right', padding: '5%'}}>Dallas, Texas</div>
        		</Typography>
					</div>
				</div>
      </Paper>
    </div>
  );
}

Desc.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Desc);
