import axios from 'axios';

const apiEndPoint = 'http://10.128.0.7:8080/activity/'

function getFunc() {
  return axios.get(apiEndPoint)
}

function postFunc(postBody) {
  axios.post(apiEndPoint, postBody)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export default HttpRequests;