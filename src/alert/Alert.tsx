/**
 * Defines alert component to show success/failre/informative alerts
 * Created at 11 July 2019 
 */
/**
 *  import top level dependencies
 * import all the state and material dependencies require to define alert UI
 */
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert } from '../state/Alert';

/**
 * interface IAlertProps defines the data structure of IAlertProps * 
 */
interface IAlertProps {
    data?: Alert;
    handleClose: () => void;
    children?: any;
}
/**
 * define class `AlertDialog` extending react component
 *  It will render the alert the againt any reques
 */
export class AlertDialog extends React.Component<IAlertProps, {}> {
    /**
     * public handleClose
     * It will close the alert box
     * update to the props
     */
    public handleClose = () => {
        this.props.handleClose();
    };

    /**
     * public render
     * It will render the alert box
     * using material Dialog
     */
    public render() {
        return (

            <Dialog
                open={this.props.data !== null}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.data.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.data.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Ok
                     </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
