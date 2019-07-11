/**
 * @author Synsoft Global
 * import top level dependencies
 */
import { reducers } from '../reducers/CombinedReducers';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

/**
 * create store 
 * take reducers in actions and apply middlere with redux thunk
 */
export const store = createStore(reducers, applyMiddleware(thunk));