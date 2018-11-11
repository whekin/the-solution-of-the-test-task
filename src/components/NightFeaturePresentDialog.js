import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import nightThemeScreenshot from '../images/night_theme_screenshot.png';

export default class NightFeaturePresentDialog extends Component {
  handleClose = () => {
    this.props.toggleDialog(false);
  };

  onAgree = () => {
    this.handleClose();

    this.props.stripeHandler.open({
      name: 'Paid feature',
      description: 'Active the feature night theme',
      amount: 99
    });
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.handleClose}
        scroll="paper">
        <DialogTitle>Active night theme?</DialogTitle>
        <DialogContent>
          <center>
            <img alt="" src={nightThemeScreenshot} width="70%" />
          </center>
          <DialogContentText>
            You can either pay $0.99 and get the nice theme or hack this site. For that:
          </DialogContentText>
          <ul>
            <li>
              <DialogContentText>
                Open broser developer tools
              </DialogContentText>
            </li>
            <li>
              <DialogContentText>
                Click on tab &quot;Console&quot;
              </DialogContentText>
            </li>
            <li>
              <DialogContentText>
                Type down: <code>localStorage.setItem(&quot;isActiveFeatureNightTheme&quot;, true);</code>
              </DialogContentText>
            </li>
            <li>
              <DialogContentText>
                Update the page
              </DialogContentText>
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            color="primary">
            Disagree
          </Button>
          <Button
            variant="contained"
            onClick={this.onAgree}
            color="primary"
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
