/**
 * Defines all the top level actions
 * Created at 11 July 2019 
 */
/**
 *  Inclued top level dependencies..  
 */
import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { Utility } from '../state/Utility';
import { Alert } from '../state/Alert';
import { Spinner } from '../state/Spinner';
/***
 * IApplicationProps interface
 * @param match
 * @param location
 * @param history
 * @param utility
 * @param works
 */
export interface IApplicationProps {
    openDrawer: () => IAppAction;
    closeDrawer: () => IAppAction;
    showPopup: (alert: Alert) => IAppAction;
    closePopup: () => IAppAction;
    showSpinner: (message: string) => IAppAction;
    hideSpinner: () => IAppAction;
    match: match<any>,
    location: any,
    history: any,
    utility: Utility;
    works: any;
}
/**
 * const function openDrawer
 * @returns object with action type `OPEN_DRAWER`
 */
export const openDrawer = (): IAppAction => {
    return {
        type: ActionType.OPEN_DRAWER
    };
};
/**
 * const function closeDrawer
 * @returns object with action type `CLOSE_DRAWER`
 */
export const closeDrawer = (): IAppAction => {
    return {
        type: ActionType.CLOSE_DRAWER
    };
};

/**
 * const function showPopup
 * It opens a alert popup
 * @returns object with action type `OPEN_ALERT`
 */
export const showPopup = (data: Alert): IAppAction => {
    return {
        type: ActionType.OPEN_ALERT,
        payload: data
    };
};
/**
 * const function closePopup
 * It close a alert popup
 * @returns object with action type `CLOSE_ALERT`
 */
export const closePopup = (): IAppAction => {
    return {
        type: ActionType.CLOSE_ALERT
    };
};

/**
 * const function showSpinner
 * It will show a loader on the html
 * @returns object with action type `OPEN_SPINNER`
 */

export const showSpinner = (message: string): IAppAction => {
    return {
        type: ActionType.OPEN_SPINNER,
        payload: new Spinner({ message })
    };
};

/**
 * const function hideSpinner
 * It will hide a loader from the html
 * @returns object with action type `CLOSE_SPINNER`
 */
export const hideSpinner = (): IAppAction => {
    return {
        type: ActionType.CLOSE_SPINNER
    };
};