/**
 * @author Synsoft Global
 * import top level dependencies
 */
import * as React from 'react';
const classNames = require('classnames');
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem } from '@material-ui/core';
import { Route, withRouter } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { styles } from './styles';
import { IApplicationProps } from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';
import { AppState } from '../state/AppState';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators, Dispatch } from 'redux';
import { Alert } from '../state/Alert';
import { AlertDialog } from '../alert/Alert';
import SpinnerDialog from '../spinner/Spinner';
import WorkItemPage from '../pages/work-item/WorkItem';
import HomePage from '../pages/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppDrawer from './App.Drawer';

/**
 * define inteface IAppProps
 * It will define data structure fo `IAppProps`
 *  contains classes and theme
 */
interface IAppProps extends IApplicationProps {
  classes: any;
  theme?: any;
}

/**
 * define interface IState
 * Defines datastructure { `anchorEl`,`notificationEl`}
 */

interface IState {
  anchorEl: any;
  notificationEl: any;
}

/**
 * Define Class `MiniDrawer`
 * It will render the app bar with spinner and alert content
 */
class MiniDrawer extends React.Component<IAppProps, IState> {

  /**
   * define public state with datatype `IState`
   * Initialize state
   */
  public state: IState = {
    anchorEl: null,
    notificationEl: null
  };

  /**
   * define private method `handleMenu`
   * update state variable
   */

  private handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * define private method `handleMenuClose`
   * update state variable
   * naviagate to defined path
   */
  private handleMenuClose = (path?: string) => {
    this.setState({ anchorEl: null });
    this.navigate(path);
  };

  /**
   * define private method `navigate`
   * push a new path in history and redirect to new path
   */
  private navigate = (path?: string) => {
    if (path) {
      this.props.history.push(path);
    }
  }

  /**
   * define public method `handleDrawerOpen`
   * initialize openDrawer
   */
  public handleDrawerOpen = () => {
    this.props.openDrawer();
  };
  /**
   * define public method `handleDrawerClose`
   * initialize closeDrawer
   */
  public handleDrawerClose = () => {
    this.props.closeDrawer();
  };
  /**
   * define public method `showPopup`
   * initialize Alert
   */
  public showPopup = () => {
    this.props.showPopup(new Alert({
      title: "Testing title",
      message: "This is a very long message, expect alert to be very wide"
    }))
  }

  /**
   * define public method `showSpinner`
   * initialize showSpinner
   */
  public showSpinner = () => {
    this.props.showSpinner("I am loading here please...")
  }

  /**
   * define public method `renderAlert`
   * initialize alert
   */
  private renderAlert(): JSX.Element {
    if (this.props.utility.alert) {
      return (
        <AlertDialog
          handleClose={this.props.closePopup}
          data={this.props.utility.alert}
        />
      );
    }

    return null
  }

  /**
   * define public method `renderSpinner`
   * it will render spinner box.
   */
  private renderSpinner(): JSX.Element {
    if (this.props.utility.spinner) {
      return (
        <SpinnerDialog
          message={this.props.utility.spinner.message}
        />
      );
    }

    return null
  }

  /**
   * define public method `renderAppBar`
   * it will render app bar.
   */

  private renderAppBar() {
    const { classes, utility } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, utility.drawerOpen && classes.appBarShift)}
      >
        <Toolbar disableGutters={!utility.drawerOpen}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, utility.drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.fillSpace} variant="title" color="inherit" noWrap={true}>
            Work Item
            </Typography>
          <div>

            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleMenuClose.bind(this, null)}
            >
              <MenuItem onClick={this.handleMenuClose.bind(this, '/work-item')}>Work Item</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );


    return null;
  }

  /**
   * define public method `renderDrawer`
   * it will render drawer.
   */
  private renderDrawer() {
    const { utility } = this.props;
    return (
      <Hidden mdDown={!utility.drawerOpen && true}>
        <AppDrawer
          utility={utility}
          handleDrawerClose={this.handleDrawerClose}
        />
      </Hidden>
    );
  }
   /**
   * define public method `render`
   * it will render drawer.
   */
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        {this.renderDrawer()}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/' exact={true} component={HomePage} />
          <Route path='/dashboard' component={HomePage} />
          <Route path='/work-item' component={WorkItemPage} />
          {this.renderAlert()}
          {this.renderSpinner()}
        </main>
      </div>
    );
  }
}
/**
 * define const `mapStateToProps`
 * @param state
 * @returns Object <utility>
 */
const mapStateToProps = (state: AppState) => ({
  utility: state.utility
});

/**
 * define const `mapDispatchtoProps`
 * @param Dispatch
 * It will bind action and dispatcher
 */
const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, { withTheme: true })(MiniDrawer as any)) as any);
