/**
 * @author Synsoft Global
 * import top level dependencies
 * It will list work item on microsoft azure
 */
import * as React from 'react';
import {
    Theme, withStyles
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from '../state/AppState';
import * as AppActionCreators from '../actions/App.Actions';
import * as _ from 'lodash';
import { withRouter } from 'react-router-dom';

/**
 * define inteface `IDashboardProps`
 * It will define data structure fo `IDashboardProps`
 *  classes,children and theme
 */
interface IDashboardProps {
    classes?: any;
    theme?: any;
    children?: any;
}

/**
 * Define Class `HomePage`
 * It will list menu alert and spinner
 */
class HomePage extends React.Component<IDashboardProps> {

    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Link to={'/work-item'} className="btn btn-outline-light">Create Work Item</Link>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 24,
    },
    headerTileIcon: {
        fontSize: 40,
        color: theme.palette.primary.main,
        paddingRight: 5
    },
    tileText: {
        fontSize: 20,
        color: theme.palette.grey["400"],
    },
    sectionTitle: {
        paddingLeft: theme.spacing.unit * 2,
    },
    users: {
        marginBottom: 24,
        overflowX: 'scroll'
    },
    chart: {
        width: '100%'
    },
});

/**
 * define const `mapStateToProps`
 * @param state
 * @returns Object <utility works>
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

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, { withTheme: true })(HomePage as any)) as any);
