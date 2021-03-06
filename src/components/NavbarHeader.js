import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  AppBar,
  Drawer,
  Divider,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
} from '@material-ui/core'

import { 
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons'

import CategoriesContainner from '../containers/Categories'

import { Link } from 'react-router-dom'
import { styled } from '../helpers/styled'
import { 
  withStyles, 
  MuiThemeProvider, 
 } from '@material-ui/core/styles'

const drawerWidth = 240;

class NavbarHeader extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
    this.props.onChangeDrawer(true)
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    this.props.onChangeDrawer(false)
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={styled}>
        <CssBaseline />
          <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          >
          <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                onClick={this.handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.hide)}
              >
              <MenuIcon style={{ color: "white" }}/>
            </IconButton>

            <Link to="/" style={{ paddingLeft: 10, textDecoration: 'none', color: '#fff' }}>
              <Typography variant="h6" color="black" noWrap>
                Unisinos
              </Typography>
            </Link>
          </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
          <Divider />
            <CategoriesContainner />
          <Divider />
        </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

NavbarHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
});

export default withStyles(styles, { withTheme: true })(NavbarHeader);
