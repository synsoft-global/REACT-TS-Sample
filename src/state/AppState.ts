/**
 * @author Synsoft Global
 * import top level dependencies
 */
import { Utility } from './Utility';
import { Model } from "./Helpers";

/**
 * define inteface `IAppState`
 * It will define data structure fo `IAppState`
 *  contains works and utility
 */
export interface IAppState {
    utility?: Utility;
    works?: any;
}
/**
 * define inteface `AppStateModel`
 * It will define data structure fo `AppStateModel`
 *  contains works and utility
 */
export const AppStateModel = Model<IAppState>({
    utility: new Utility(),
    works: null
});
/**
 * Define Class `AppState`
 * It defines the data structure of App state
 */
export class AppState extends AppStateModel {
    public static UTILITY = 'utility';
    public utility: Utility;
    public works: any;
}