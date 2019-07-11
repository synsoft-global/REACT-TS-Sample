/**
 * @author Synsoft Global
 * import top level dependencies
 */
import { Model } from "./Helpers";
import { Alert } from './Alert';
import { Spinner } from "./Spinner";

/**
 * define inteface `IUtility`
 * It will define data structure fo `IUtility`
 *  contains message
 */
export interface IUtility {
    drawerOpen?: boolean;
    alert?: Alert;
    spinner?: Spinner;
}

/**
 * define inteface `UtilityModel`
 * It will define data structure fo `UtilityModel`
 *  contains drawerOpen,alert & spinner
 */
export const UtilityModel = Model<IUtility>({
    drawerOpen: false,
    alert: null,
    spinner: null
});

/**
 * define inteface `Utility`
 * It will define data structure fo `Utility`
 * initialize intial value for utility model
 */
export class Utility extends UtilityModel {
    public static DRAWER_OPEN = 'drawerOpen';
    public static ALERT = 'alert';
    public static SPINNER = 'spinner';

    public drawerOpen: boolean;
    public alert: Alert;
    public spinner: Spinner;
}
