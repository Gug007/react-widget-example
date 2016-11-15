import axios from 'axios'
const ServiceApiUrl  = 'localhost:5001'

export const API_ROOT = `http://${ServiceApiUrl}`

function serialize(obj) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

function callApi({method, url, params}) {
  const fullUrl = (url.indexOf(API_ROOT) === -1) ? API_ROOT + url : url
  const getParams = method !== 'GET' ? '' : '?' + serialize(params)
  return axios({
    method: method || 'POST',
    url: fullUrl + getParams,
    data: params, //serialize(params),
    dataType: 'jsonp',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }).then(response => response.data);
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { data } = callAPI;
  const { types } = callAPI;

  function actionWith(data){
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(data).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};