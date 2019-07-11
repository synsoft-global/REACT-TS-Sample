/**
 * @author Synsoft Global
 * import top level dependencies
 */
import { Model } from "./Helpers";

interface IAlertButtonOptions {
    label: string;
    handler: () => void;
}
/**
 * define inteface `IAlert`
 * It will define data structure fo `IAlert`
 *  contains title,message and buttons
 */
export interface IAlert {
    title?: string;
    message: string;
    buttons?: IAlertButtonOptions[];
}
/**
 * define inteface `IAlert`
 * It will define data structure fo `IAlert`
 *  contains title,message and buttons
 */
export const AlertModel = Model<IAlert>({
    title: null,
    message: null,
    buttons: null
});
/**
 * Define Class `Alert`
 * It will render Alert HTML
 */
export class Alert extends AlertModel {
    public title: string;
    public message: string;
    public buttons: IAlertButtonOptions[];

    constructor(data: IAlert) {
        super(data);
    }
}