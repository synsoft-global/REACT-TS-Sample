/**
 * Defines all the top level actions
 * Created at 11 July 2019 
 */
/**
 *  import redux top level dependency for Actions 
 */
import { Action } from "redux";
/**
 *  export all defined actions
 *  @type `enum`
 */
export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    OPEN_ALERT,
    CLOSE_ALERT,
    OPEN_SPINNER,
    CLOSE_SPINNER,
    WORKITEM_REQUEST,
    WORKITEM_SUCCESS,
    WORKITEM_FAIL
}
/**
 *  export IAppAction extend from ActionType for redux actions
 * @type `any`
 */
export interface IAppAction extends Action<ActionType> {
    payload?: any;
}