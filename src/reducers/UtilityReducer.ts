/**
 * @author Synsoft Global
 * import top level dependencies
 */
import { IAppAction, ActionType } from './../actions/Helpers';
import { Utility } from '../state/Utility';
/**
 * define const `UtilityReducer`
 *  @param state
 *  @param action
 */
export const UtilityReducer = (state: Utility = new Utility(), action: IAppAction): Utility => {
    /**
     * Switch case to identify action and return action accordingly
     * update state
     * @return updated state as utility
     */
    switch (action.type) {
        case ActionType.OPEN_DRAWER:
            return state.set(Utility.DRAWER_OPEN, true) as Utility;
        case ActionType.CLOSE_DRAWER:
            return state.set(Utility.DRAWER_OPEN, false) as Utility;
        case ActionType.OPEN_ALERT:
            return state.set(Utility.ALERT, action.payload) as Utility;
        case ActionType.CLOSE_ALERT:
            return state.set(Utility.ALERT, null) as Utility;
        case ActionType.OPEN_SPINNER:
            return state.set(Utility.SPINNER, action.payload) as Utility;
        case ActionType.CLOSE_SPINNER:
            return state.set(Utility.SPINNER, null) as Utility;
        default:
            return state;
    }
};