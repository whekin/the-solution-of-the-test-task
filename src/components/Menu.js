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
import { LanguageContext } from '../logic/language-context';

const styles = {
  primary: {
    color: "#03a9f4"
  },
  secondary: {
    color: "white"
  }
};

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
      <LanguageContext.Consumer>
        {language => (
          <div>
            <IconButton
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
              classes={{
                root: classes.secondary
              }}>
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={this.state.isOpen}
              onClose={this.toggleDrawer(false)}
              onOpen={this.toggleDrawer(true)}>
              <List
                component="nav"
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}>
                {[
                  {
                    content: language.transactions_table_text,
                    address: "/transactions",
                    icon: <HomeIcon />
                  },
                  {
                    content: language.counterparts_table_text,
                    address: "/counterparts",
                    icon: <LensIcon />
                  },
                  {
                    content: language.dialog_title_add_transaction,
                    address: `${location.pathname}/addTransaction`,
                    icon: <AddIcon />
                  },
                  {
                    content: language.dialog_titile_add_counterpart,
                    address: `${location.pathname}/addCounterpart`,
                    icon: <AddIcon />
                  }
                ].map(el => {
                  const isActive = location.pathname === el.address;
                  return (
                    <NavLink
                      key={el.content}
                      to={el.address}
                      className="nav_link">
                      <ListItem button >
                        <ListItemIcon classes={{
                          root: isActive ? classes.primary : null
                        }}>
                          {el.icon}
                        </ListItemIcon>
                        <ListItemText classes={{
                          primary: isActive ? classes.primary : null
                        }} primary={el.content} />
                      </ListItem>
                    </NavLink>
                  );
                })}
              </List>
            </SwipeableDrawer>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default withStyles(styles)(NavMenu);
