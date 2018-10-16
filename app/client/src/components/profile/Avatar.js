import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 600,
    height: 600,
  },
};

function AAvatar() {
  return (
    <div>
      <Avatar
        alt="Leemon Baird"
        src="../images/Leemon-752x506.jpg"
      />
    </div>
  );
}

AAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AAvatar);
