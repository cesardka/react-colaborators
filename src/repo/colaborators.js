import config from '../config';

function getAll() {
  return callApi(`${config.URL_API}`);
}

function getDetails(colaboratorId) {
  return callApi(`${config.URL_API}/${colaboratorId}`);
}

function callApi(url) {
  return fetch(url).then(async (response) => {
    if (!response.ok) {
        throw new Error(`Falha na requisição abestada para [${url}]`);
    }

    return await response.json();
  });
}

export default {
  getAll,
  getDetails,
}