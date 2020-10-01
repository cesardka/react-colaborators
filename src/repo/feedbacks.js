import config from '../config';

function getAll(colaboratorId) {
  return callApi(`${config.URL_API}/${colaboratorId}/feedback`, 'GET');
}

function getDetails(colaboratorId, feedbackId) {
  return callApi(`${config.URL_API}/${colaboratorId}/feedback/${feedbackId}`, 'GET');
}

function addFeedback(colaboratorId, body) {
  return callUpdateApi(`${config.URL_API}/${colaboratorId}/feedback/`, 'POST', body);
}

function likeFeedback(colaboratorId, feedbackId, body) {
  return callUpdateApi(`${config.URL_API}/${colaboratorId}/feedback/${feedbackId}`, 'PUT', body);
}

function removeFeedback(colaboratorId, feedbackId) {
  return callApi(`${config.URL_API}/${colaboratorId}/feedback/${feedbackId}`, 'DELETE');
}

function callApi(url, method) {
  return fetch(url, { method })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Falha na requisição abestada para [${url}]`);
      }

      return await response.json();
    });
}

function callUpdateApi(url, method, data) {
  return fetch(
    url,
    {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Falha na requisição abestada para [${url}]`);
      }

      return await response.json();
    });
}

export default {
  getAll,
  getDetails,
  addFeedback,
  likeFeedback,
  removeFeedback,
}