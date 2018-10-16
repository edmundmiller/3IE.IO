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

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div className='profile-paper'>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Experience
        </Typography>
        <Typography component="p">
					<ul>
						<li><b>CTO of Hedera Hashgraph</b></li>
						<li>PhD in Computer Science from Carnegie Mellon University</li>
						<li>Co-founder and CTO of Trio Security, and later BlueWave Security, both of which were acquired</li>
						<li>Professor of Computer Science at the Air Force Academy</li>
						<li>Currently co-founder and CTO of Swirlds Inc, which builds software for distributed consensus based on the hashgraph consensus algorithm.</li>
						<li>Adjunct professor or PhD committee member at University of Colorado at Colorado Springs, and Denver University, and University of Cincinnati. Visiting professor at KAUST University.</li>
						<li>Research scientist in the Air Force Research Laboratory, and at the Academy Center for Cyberspace Security</li>
						<li>US Air Force Lt Col (ret), 1985-2009. US Air Force Academy, class of 1989.</li>
					</ul>					
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);