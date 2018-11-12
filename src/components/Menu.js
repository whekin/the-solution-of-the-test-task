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

const styles = theme => ({
  activeColor: {
    color: theme.palette.primary.light
  }
});

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
              color="secondary">
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
                  }
                ].map(el => {
                  const isActive = location.pathname === el.address;

                  return (
                    <div
                      key={el.content}
                      className={classes.activeColor}>
                      <NavLink
                        to={el.address}
                        className="nav_link">
                        <ListItem button>
                          <ListItemIcon classes={{
                            root: isActive ? classes.activeColor : null
                          }}>
                            {el.icon}
                          </ListItemIcon>
                          <ListItemText classes={{
                            primary: isActive ? classes.activeColor : null
                          }} primary={el.content} />
                        </ListItem>
                      </NavLink>
                    </div>
                  );
                })}
                {
                  [
                    {
                      content: language.dialog_title_add_transaction,
                      name: "AddTransactionDialog",
                      icon: <AddIcon />
                    },
                    {
                      content: language.dialog_titile_add_counterpart,
                      name: "AddCounterpartDialog",
                      icon: <AddIcon />
                    }
                  ].map(el => (
                    <ListItem
                      key={el.content}
                      button
                      onClick={() => {
                        this.props.toggleDialog(el.name, true);
                      }}>
                      <ListItemIcon>
                        {el.icon}
                      </ListItemIcon>
                      <ListItemText primary={el.content} />
                    </ListItem>
                  ) )
                }
              </List>
            </SwipeableDrawer>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default withStyles(styles)(NavMenu);
