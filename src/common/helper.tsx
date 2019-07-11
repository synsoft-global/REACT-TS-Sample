/**
 * import constants from config
 */
import * as CONFIG from '../common/config';

/**
 * Define `getToken`
 * Get PAT Token for authentication.
 * @returns auth token 
 */
export const getToken = () => {
  return 'Basic ' + btoa(`${CONFIG.USERNAME}:${CONFIG.PAT}`);
}

/**
 *  Define `getDefaultFormData`
 * Get Default data for create work item.
 * Defines the data structure of post parameters.
 * @returns `postParams`
 */
export const getDefaultFormData = () => {
  const postParams = [
    {
      "op": "add",
      "path": "/fields/System.Title",
      "from": '',
      "value": ""
    },
    {
      "op": "add",
      "path": "/fields/System.Description",
      "from": null,
      "value": ""
    },
    {
      "op": "add",
      "path": "/fields/System.AreaPath",
      "from": null,
      "value": ""
    },
    {
      "op": "add",
      "path": "/fields/System.TeamProject",
      "from": null,
      "value": CONFIG.TeamProject
    },
    {
      "op": "add",
      "path": "/fields/System.IterationPath",
      "from": null,
      "value": ""
    },
    {
      "op": "add",
      "path": "/fields/Microsoft.VSTS.Common.BusinessValue",
      "from": null,
      "value": ""
    },
    {
      "op": "add",
      "path": "/fields/Microsoft.VSTS.Common.ValueArea",
      "from": null,
      "value": "Business"
    },
    {
      "op": "add",
      "path": "/fields/System.Tags",
      "from": null,
      "value": ""
    },
    {
      "op": "add",
      "path": "/fields/Microsoft.VSTS.Scheduling.TargetDate",
      "from": null,
      "value": ""
    }
  ];
  return postParams;
}

/**
 * MAP defualt data with user data.
 * @param {object} type Defualt Data
 * @param {object} type Post Data
 */
export const getWorkData = (postParams: any[] = [], params: any) => {
  postParams = postParams.map(p => {
    if (p.path === '/fields/System.Title') {
      p.value = params.title
    }
    if (p.path === '/fields/System.Description') {
      p.value = `<b>Use Case</b><br/>${params.description}<br/><b>Value</b><br/>${params.ValuePropositionBet}<br/><b>Effort</b><br/>TBD`;
    }
    if (p.path === '/fields/System.AreaPath') {
      if (params.DataDeliveryTeam === 'Operations' && params.resource_type === 'Data Request') {
        p.value = `${CONFIG.TeamProject}\\\\${params.DataDeliveryTeam}\\\\Data Delivery`;
      } else if (params.DataDeliveryTeam === 'Operations' && params.resource_type === 'Platform Request') {
        p.value = `${CONFIG.TeamProject}\\\\${params.DataDeliveryTeam}\\\\Data Delivery`;
      } else if (params.DataDeliveryTeam === 'Commercial' && params.resource_type === 'Data Request') {
        p.value = `${CONFIG.TeamProject}\\\\${params.DataDeliveryTeam} Data\\\\DataRequest`;
      } else if (params.DataDeliveryTeam === 'Commercial' && params.resource_type === 'Platform Request') {
        p.value = `${CONFIG.TeamProject}\\\\${params.DataDeliveryTeam} Data\\\\Platform`;
      }
    }

    if (p.path === '/fields/System.IterationPath') {
      p.value = `${CONFIG.TeamProject}\\\\${params.DataDeliveryTeam}\\\\Data Delivery`;
    }

    if (p.path === '/fields/Microsoft.VSTS.Common.BusinessValue') {
      p.value = params.BusinessValue;
    }

    if (p.path === '/fields/System.Tags') {
      p.value = `IsUserSubmitted;IsSponsoredby${params.request_sponsor}`;
    }

    if (p.path === '/fields/Microsoft.VSTS.Scheduling.TargetDate') {
      if (params.TargetDate) {
        p.value = params.TargetDate;
      }
    }
    return p;
  });

  return postParams;
}

/**
 * Validate Create work item form
 * @param {formData} type* 
 */
export const validateWorkCreation = (values: any) => {
  const errors: any = {};
  const errorsStatus: any = {};
  let errorStatus = false;
  /**
   * Check if `title` exists
   */
  if (!values.title) {
    errors.title = ['The Title is required'];
    errorStatus = true;
    errorsStatus.title = true;
  }
   /**
   * Check if `DataDeliveryTeam` exists
   */
  if (!values.DataDeliveryTeam) {
    errors.DataDeliveryTeam = ['The Data Delivery Team is required'];
    errorStatus = true;
    errorsStatus.DataDeliveryTeam = true;
  }
   /**
   * Check if `request_sponsor` exists
   */
  if (!values.request_sponsor) {
    errors.request_sponsor = ['The Request Sponsor is required'];
    errorStatus = true;
    errorsStatus.request_sponsor = true;
  }
   /**
   * Check if `resource_type` exists
   */
  if (!values.resource_type) {
    errors.resource_type = ['The Request Type is required'];
    errorStatus = true;
    errorsStatus.resource_type = true;
  }
   /**
   * Check if `description` exists
   */
  if (!values.description) {
    errors.description = ['The Description is required'];
    errorStatus = true;
    errorsStatus.description = true;
  }
   /**
   * Check if `ValuePropositionBet` exists
   */
  if (!values.ValuePropositionBet) {
    errors.ValuePropositionBet = ['The Value Proposition / Bet is required'];
    errorStatus = true;
    errorsStatus.ValuePropositionBet = true;
  }
   /**
   * Check if `BusinessValue` exists
   */
  if (!values.BusinessValue) {
    errors.BusinessValue = ['The Monthly Business Value is required'];
    errorStatus = true;
    errorsStatus.BusinessValue = true;
  }
   /**
   * Check if `request_sponsor` exists
   */
  if (values.request_sponsor) {
    values.request_sponsor = values.request_sponsor.replace(/ /g, "");
  }
  /**
   * @return @type Object <errors, errorStatus, values, errorsStatus>
   */
  return { errors, errorStatus, values, errorsStatus };
};