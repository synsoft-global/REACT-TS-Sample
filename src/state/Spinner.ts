/**
 * @author Synsoft Global
 * import top level dependencies
 */
import { Model } from "./Helpers";

/**
 * define inteface `ISpinner`
 * It will define data structure fo `ISpinner`
 *  contains message
 */
export interface ISpinner {
    message: string;
}
/**
 * define inteface `ISpinner`
 * It will define data structure fo `ISpinner`
 *  contains message
 */
export const SpinnerModel = Model<ISpinner>({
    message: null
});
/**
 * Define Class `Spinner`
 * It will initialize spinner Model with initial values
 */
export class Spinner extends SpinnerModel {
    public static MESSAGE = 'message';
    
    public message: string;
}