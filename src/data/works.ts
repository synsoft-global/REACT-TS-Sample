/**
 *  Import actions 
 */
import * as types from '../actions/Helpers';
/**
 * Define `workItemReducer`
 * @param state 
 * @param action 
 * @returns Object
 */
export default function workItemReducer(state = {}, action: any) {
    switch (action.type) {
        case types.ActionType.WORKITEM_SUCCESS:
            return action.works;
        case types.ActionType.WORKITEM_FAIL:
            return action.works;
        default:
            return state;
    }
}