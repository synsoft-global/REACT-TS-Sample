/**
 * @author Synsoft Global
 * import top level dependencies
 */
import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import workItemReducer from "../data/works";
/**
 * define const `reducers`
 * combined reducers {utility,works}
 */
export const reducers = combineReducers({
    utility: UtilityReducer,
    works: workItemReducer
});