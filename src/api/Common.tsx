/**
 * Defines common api file
 * it interacts with server
 * Created at 11 July 2019 
 */
/**
 *  import top level dependencies
 *  import config and helper 
 */
import * as CONFIG from '../common/config';
import * as HELPER from '../common/helper';

/**
 * Define Class `CommonApi`
 * It contains all the methods which will communicate with server
 * @method addWorkItem
 */

class CommonApi {
    /**
     * public static method `addWorkItem`
     * @param data 
     * @returns Json (success / failure)
     */
    public static addWorkItem(data: any[]) {
        const defualtPost = HELPER.getDefaultFormData();
        const postParams = HELPER.getWorkData(defualtPost, data);
        const url = `${CONFIG.APIURL}`;
        const options = {
            headers: new Headers({
                'Content-Type': 'application/json-patch+json',
                Authorization: HELPER.getToken()
            }),
            method: 'POST',
            body: JSON.stringify(postParams)
        };
        //return api response
        return fetch(url, options)
            .then((response) => response.json()).catch((error) => ({ status: false, message: "internal server error" + error }));

    }
}

/**
 * export class `CommonApi`
 */
export default CommonApi;