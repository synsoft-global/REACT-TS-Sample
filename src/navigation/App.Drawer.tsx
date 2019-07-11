/**
 * @author Synsoft Global
 * import top level dependencies
 */
import * as React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Drawer, IconButton, Divider, Theme, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Utility } from '../state/Utility';
import { NavLink } from 'react-router-dom';
import { styles } from './styles';
const classNames = require('classnames');

/**
 * define inteface IAppDrawer
 * It will define data structure fo `IAppDrawer`
 *  contains utility,classes,handleDrawerClose and theme
 */

interface IAppDrawer {
    utility: Utility;
    classes?: any;
    theme?: Theme;
    handleDrawerClose?: () => void;
}
/**
 * Define Class `AppDrawer`
 * It will render the drawer with spinner and alert content
 */

class AppDrawer extends React.Component<IAppDrawer, {}> {
    /**
     * Define public routes
     */
    public routes = [
        { path: '/', title: 'Dashboard', icon: () => <DashboardIcon /> },
        { path: '/work-item', title: 'Work Item', icon: () => <AccountCircleIcon /> }
    ]
    /**
     * define public render
     */
    public render(): JSX.Element {
        const { classes, utility, theme } = this.props;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !utility.drawerOpen && classes.drawerPaperClose),
                }}
                open={utility.drawerOpen}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.props.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                {this.routes.map((route, index) => {
                    return (
                        <NavLink key={index} exact={true} activeClassName={classes.current} className={classes.link} to={route.path} >
                            <ListItem button={true}>
                                <ListItemIcon>
                                    {route.icon()}
                                </ListItemIcon>
                                <ListItemText primary={route.title} />
                            </ListItem>
                        </NavLink>
                    );
                })}
                <Divider />
            </Drawer>
        );
    }
}

export default withStyles(styles as any, { withTheme: true })(AppDrawer as any) as any;