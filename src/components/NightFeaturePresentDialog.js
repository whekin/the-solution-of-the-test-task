import React, { Component } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, DialogContentText, Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import nightThemeScreenshot from '../images/night_theme_screenshot.png';

const styles = theme => ({
  li: {
    color: theme.palette.primary.main
  }
});

class NightFeaturePresentDialog extends Component {
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
          <ul>
            {[
              "You can either pay $0.99 and get the nice theme or hack this site. For that:",
              "Open broser developer tools",
              "Click on tab &quot;Console&quot;",
              "Type down: <code>localStorage.setItem(&quot;isActiveFeatureNightTheme&quot;, true);</code>",
              "Update the page"
            ].map( (text, i) => (
              <li key={i} className={this.props.classes.li}>
                <DialogContentText>
                  {text}
                </DialogContentText>
              </li>
            ) )
            }
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

export default withStyles(styles)(NightFeaturePresentDialog);