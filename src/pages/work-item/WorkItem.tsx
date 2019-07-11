/**
 * @author Synsoft Global
 * import top level dependencies
 * It will add a work item on microsoft azure
 */
import * as React from 'react';
import {
    Theme, withStyles, Paper, Grid, FormControl, InputLabel, Input, Button, FormHelperText, MenuItem, Select
} from '@material-ui/core';
import * as HELPER from '../../common/helper';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from '../../state/AppState';
import * as AppActionCreators from '../../actions/App.Actions';
import * as _ from 'lodash';
import { withRouter } from 'react-router-dom';
import * as WorkItemAction from "../../actions/Works.Actions";
import { AlertDialog } from '../../alert/Alert';
import SpinnerDialog from '../../spinner/Spinner';
import { IApplicationProps } from '../../actions/App.Actions';
import { Alert } from '../../state/Alert';


/**
 * define inteface `IWorkItemProps`
 * It will define data structure fo `IWorkItemProps`
 *  contains addWorkItem,classes,children, renderSpinner, renderAlert and theme
 */
interface IWorkItemProps extends IApplicationProps {
    classes?: any;
    theme?: any;
    children?: any;
    addWorkItem?: (data: any) => void;
    renderSpinner?: (data: any) => void;
    renderAlert?: (data: any) => void;
    WorkItemAction?: (data: any) => void;
}

/**
 * define inteface `IWorkState`
 * It will define data structure fo `IWorkState`
 *  contains formData,errors and errorsStatus
 */
interface IWorkState {
    formData: any;
    errors: any;
    errorsStatus: any;
}

/**
 * Define Class `WorkItemPage`
 * It will perform all the operation related to adding work item on microsoft azure and listing them.
 */
class WorkItemPage extends React.Component<IWorkItemProps, IWorkState> {
    /***
     * define private handleSubmit
     * @param e
     * It will add work item props
     */
    private handleSubmit = (e: any) => {
        e.preventDefault();
        const res = HELPER.validateWorkCreation(this.state.formData);
        if (!res.errorStatus) {
            this.props.addWorkItem(res.values);
        } else {
            this.setState({ errors: res.errors, errorsStatus: res.errorsStatus });
        }
    }
    /***
     * define private renderAlert
     * It will render alert box
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
     /***
     * define private renderSpinner
     * It will render Spinner
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
    /***
     * define public state 
     * It will initialize data structure
     * formData,errors and errorsStatus
     */
    public state = {
        formData: {
            title: "",
            DataDeliveryTeam: "",
            request_sponsor: "",
            resource_type: "Data Request",
            TargetDate: "",
            BusinessValue: "",
            description: "",
            ValuePropositionBet: "",
        },
        errors: {
            title: "",
            DataDeliveryTeam: "",
            request_sponsor: "",
            resource_type: "",
            BusinessValue: "",
            description: "",
            ValuePropositionBet: "",
        },
        errorsStatus: {
            title: false,
            DataDeliveryTeam: false,
            request_sponsor: false,
            resource_type: false,
            BusinessValue: false,
            description: false,
            ValuePropositionBet: false,
        }
    };

    /***
     * define public getDerivedStateFromProps 
     * retrieve state params from props
     * @param nextProps
     * @param prevState
     * @returns Object
     */
    public static getDerivedStateFromProps(nextProps: any, prevState: any) {

        if (nextProps.works !== prevState.works) {
            return { works: nextProps.works };
        }
        else { return null };
    }
    /***
     * define public navigate 
     * retrieve state params from props
     * @param path
     */
    private navigate = (path?: string) => {
        if (path) {
            this.props.history.push(path);
        }
    }
    /***
     * define public componentDidUpdate 
     * react life cycle method, executes  after there is any change in component
     * @param prevProps
     */
    public componentDidUpdate(prevProps: any) {
        console.log('getDerivedStateFromProps', this.props.works.status);
        if (prevProps.works !== this.props.works) {
            if (this.props.works.status === true) {
                this.props.showPopup(new Alert({
                    title: "Success",
                    message: this.props.works.data
                }))
                this.navigate("/");
            } else {
                this.props.showPopup(new Alert({
                    title: "Error",
                    message: this.props.works.data
                }))
            }
        }
    }

    /***
     * define private onValueChange 
     * set/update state parmeter for form
     * validate data on the basis of applied checks
     * @param e
     */
    private onValueChange = (e: any) => {
        this.state["formData"][e.target.name] = e.target.value;
        const res = HELPER.validateWorkCreation(this.state.formData);
        this.state["errors"][e.target.name] = res.errors[e.target.name];
        this.state["errorsStatus"][e.target.name] = res.errorsStatus[e.target.name];
        this.setState({ formData: this.state["formData"] });
    }
    /**
     * Component view renderer
     */
    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <h2>{'Create Work Item'}</h2>
                    {/* Form tag initialize */}
                    <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit} noValidate={true}>
                        <Grid container={true} spacing={24}>
                            <Grid item={true} lg={4} xs={12} sm={6}>
                                {/* FormControl for workitem title */}
                                <FormControl error={this.state.errorsStatus.title} required={true} fullWidth={true} className={classes.field}>
                                    <InputLabel htmlFor="title">Title</InputLabel>
                                    <Input
                                        required={true}
                                        value={this.state.formData.title}
                                        onChange={this.onValueChange}
                                        id="title"
                                        name="title"
                                        aria-describedby="title-helper-text"
                                    />
                                    {this.state.errors && this.state.errors.title && <span className="error_msg1"><FormHelperText id="title-helper-text">{this.state.errors.title}</FormHelperText></span>}

                                </FormControl>
                            </Grid>
                            <Grid item={true} lg={4} xs={12} sm={6}>
                                {/* FormControl for workitem DataDeliveryTeam */}
                                <FormControl error={this.state.errorsStatus.DataDeliveryTeam} required={true} fullWidth={true} className={classes.field}>
                                    <InputLabel htmlFor="DataDeliveryTeam">Data Delivery Team</InputLabel>
                                    <Select
                                        value={this.state.formData.DataDeliveryTeam}
                                        onChange={this.onValueChange}
                                        required={true}
                                        inputProps={{
                                            name: 'DataDeliveryTeam',
                                            id: 'DataDeliveryTeam',
                                        }}
                                        aria-describedby="DataDeliveryTeam-helper-text"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Commercial"}>Commercial</MenuItem>
                                        <MenuItem value={"Operations"}>Operations</MenuItem>
                                    </Select>
                                    {this.state.errors && this.state.errors.DataDeliveryTeam && <span className="error_msg1"><FormHelperText id="DataDeliveryTeam-helper-text">{this.state.errors.DataDeliveryTeam}</FormHelperText></span>}
                                </FormControl>
                            </Grid>
                            <Grid item={true} lg={4} xs={12} sm={6}>
                                {/* FormControl for workitem request_sponsor */}
                                <FormControl error={this.state.errorsStatus.request_sponsor} required={true} fullWidth={true} className={classes.field}>
                                    <InputLabel htmlFor="request_sponsor">Request Sponsor</InputLabel>
                                    <Input
                                        value={this.state.formData.request_sponsor}
                                        id="request_sponsor"
                                        name="request_sponsor"
                                        onChange={this.onValueChange}
                                        aria-describedby="request_sponsor-helper-text"
                                    />
                                    <FormHelperText id="request_sponsor-helper-text">Please enter request sponsor first name then last name</FormHelperText>
                                    {this.state.errors && this.state.errors.request_sponsor && <span className="error_msg1"><FormHelperText id="request_sponsor-helper-text">{this.state.errors.request_sponsor}</FormHelperText></span>}
                                </FormControl>
                            </Grid>
                            <Grid item={true} lg={4} xs={12} sm={6}>
                                {/* FormControl for workitem resource_type */}
                                <FormControl error={this.state.errorsStatus.resource_type} required={true} fullWidth={true} className={classes.field}>
                                    <InputLabel htmlFor="resource_type">Request Type</InputLabel>
                                    <Select
                                        value={this.state.formData.resource_type}
                                        onChange={this.onValueChange}
                                        inputProps={{
                                            name: 'resource_type',
                                            id: 'resource_type',
                                        }}
                                        aria-describedby="resource_type-helper-text"
                                    >
                                        <MenuItem value={"Data Request"}>Data Request</MenuItem>
                                        <MenuItem value={"Platform Request"}>Platform Request</MenuItem>
                                    </Select>
                                    {this.state.errors && this.state.errors.resource_type && <span className="error_msg1"><FormHelperText id="resource_type-helper-text">{this.state.errors.resource_type}</FormHelperText></span>}
                                </FormControl>
                            </Grid>
                            <Grid item={true} lg={4} xs={12} sm={6}>
                                {/* FormControl for workitem Target Date */}
                                <InputLabel htmlFor="TargetDate">Target Date</InputLabel>
                                <FormControl fullWidth={true} className={classes.field}>
                                    <Input
                                        type="date"
                                        value={this.state.formData.TargetDate}
                                        id="TargetDate"
                                        name="TargetDate"
                                        onChange={this.onValueChange}
                                        aria-describedby="TargetDate-helper-text"
                                    />
                                    <FormHelperText id="TargetDate-helper-text">Please supply target date if there is a relevant date requirement.</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item={true} lg={4} xs={12} sm={6}>
                                {/* FormControl for workitem BusinessValue */}
                                <FormControl error={this.state.errorsStatus.BusinessValue} required={true} fullWidth={true} className={classes.field}>
                                    <InputLabel htmlFor="BusinessValue">Monthly Business Value</InputLabel>
                                    <Input
                                        value={this.state.formData.BusinessValue}
                                        id="BusinessValue"
                                        type="number"
                                        name="BusinessValue"
                                        onChange={this.onValueChange}
                                        aria-describedby="BusinessValue-helper-text"
                                    />
                                    <FormHelperText id="BusinessValue-helper-text">Total monthly bet based on described efficiency, cost savings and analytic value creation.</FormHelperText>
                                    {this.state.errors && this.state.errors.BusinessValue && <span className="error_msg1"><FormHelperText id="BusinessValue-helper-text">{this.state.errors.BusinessValue}</FormHelperText></span>}
                                </FormControl>
                            </Grid>
                            <Grid item={true} lg={12} xs={12} sm={12}>
                                {/* FormControl for workitem description */}
                                <FormControl error={this.state.errorsStatus.description} required={true} fullWidth={true} className={classes.field}>
                                    <InputLabel htmlFor="description">Description</InputLabel>
                                    <Input
                                        value={this.state.formData.description}
                                        id="description"
                                        name="description"
                                        onChange={this.onValueChange}
                                        aria-describedby="description-helper-text"
                                    />
                                    {this.state.errors && this.state.errors.description && <span className="error_msg1"><FormHelperText id="description-helper-text">{this.state.errors.description}</FormHelperText></span>}
                                </FormControl>
                            </Grid>
                            <Grid item={true} lg={12} xs={12} sm={12}>
                                {/* FormControl for workitem ValuePropositionBet */}
                                <FormControl error={this.state.errorsStatus.ValuePropositionBet} required={true} fullWidth={true} className={classes.field}>
                                    <InputLabel htmlFor="ValuePropositionBet">Value Proposition / Bet</InputLabel>
                                    <Input
                                        value={this.state.formData.ValuePropositionBet}
                                        id="ValuePropositionBet"
                                        name="ValuePropositionBet"
                                        onChange={this.onValueChange}
                                        aria-describedby="ValuePropositionBet-helper-text"
                                    />
                                    <FormHelperText id="ValuePropositionBet-helper-text">Please describe the monetized value associated with this request.  Once implemented, how will this increase efficiency or reduce cost?  How will this create analytic value beyond our current base case?</FormHelperText>
                                    {this.state.errors && this.state.errors.ValuePropositionBet && <span className="error_msg1"><FormHelperText id="ValuePropositionBet-helper-text">{this.state.errors.ValuePropositionBet}</FormHelperText></span>}
                                </FormControl>

                            </Grid>
                            <Grid item={true} lg={12} xs={12} sm={12}>
                                {/* FormControl for workitem submit button */}
                                <div className={classes.actions}>
                                    <Button
                                        type="submit"
                                        onSubmit={this.handleSubmit}
                                        variant="raised"
                                        color="primary"
                                        className={classes.button}>
                                        Submit
                                     </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                    {/* Form tag ends */}

                </Paper>
                {this.renderAlert()}
                {this.renderSpinner()}
            </div >
        )
    }
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 24,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    headerTiles: {
        overflowX: 'hidden',
        display: 'flex',
        borderRight: `5px solid ${theme.palette.secondary.main}`,
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

});
/**
 * define const `mapStateToProps`
 * @param state
 * @returns Object <utility works>
 */
const mapStateToProps = (state: AppState) => ({
    utility: state.utility,
    works: state.works
});
/**
 * define const `mapDispatchtoProps`
 * @param Dispatch
 * It will bind action and dispatcher
 */
const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, AppActionCreators, WorkItemAction), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, { withTheme: true })(WorkItemPage as any)) as any);
