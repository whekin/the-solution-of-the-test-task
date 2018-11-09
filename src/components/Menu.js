import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import LensIcon from '@material-ui/icons/Lens';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = {
  primary: {
    color: "#03a9f4"
  }
}

class NavMenu extends Component {
  state = {
    isOpen: false
  };

  toggleDrawer = open => () => {
    this.setState({
      isOpen: open
    });
  };

  render() {
    const { classes, location } = this.props;
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={this.toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={this.state.isOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}>
            {[
              ["Home", "/", <HomeIcon />],
              ["Add a transaction", "/add", <AddIcon />],
              ["Counterparts", "/counterparts", <LensIcon />]
            ].map(el => (
              <NavLink
                key={el[0]}
                to={el[1]}
                className="nav_link">
                <ListItem button >
                  <ListItemIcon>
                    {el[2]}
                  </ListItemIcon>
                  <ListItemText classes={{
                    primary: location.pathname === el[1] ? classes.primary : null
                  }} primary={el[0]} />
                </ListItem>
              </NavLink>
            ) )}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(NavMenu) );
