/**
 * Defines all the work module actions
 * Created at 11 July 2019 
 */
/**
 *  import redux top level dependencies
 */
import CommonApi from "../api/Common";
import * as types from '../actions/Helpers';
import { IAppAction } from './Helpers';
/***
 * define interface `IWorksProps`
 *  contains method `addWorkItem`
 */
export interface IWorksProps {
    addWorkItem: () => IAppAction;
}
/***
 * define const `getWorkItemSuccess`
 * It will return props to component
 * on successfull work item added.
 * @returns object<type , works>
 */
export const getWorkItemSuccess = (data: any) => {
    return { type: types.ActionType.WORKITEM_SUCCESS, works: data };
}
/***
 * define const `getWorkItemFailed`
 * It will return props to component
 * on failure while work item added.
 * @returns object<type , works>
 */
export const getWorkItemFailed = (data: any) => {
    return { type: types.ActionType.WORKITEM_FAIL, works: data };
}

/***
 * define const `addWorkItem`
 * It will call the work item add sever api
 * call related actions on success and failure
 * @returns object<status , data>
 */
export const addWorkItem = (values: any) => {
    return (dispatch: any) => {
        delete values.works;
        delete values.errors;
        return CommonApi.addWorkItem(values).then((response) => {
            if (response && response.message) {
                const data = { status: false, data: response.message };
                dispatch(getWorkItemFailed(data));
            } else {
                const data = { status: true, data: "Work Item Id:" + response.id };
                dispatch(getWorkItemSuccess(data));
            }
        }).catch((error) => {
            const data = { status: false, data: "internal server error" };
            dispatch(getWorkItemFailed(data));
        });
    };
}