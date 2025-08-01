import { serverURI } from './globals-variables';

const saveDataToServer = async (url, data, method='POST') => {
  const response = await fetch(serverURI + url, {
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    method: method,
  });

  if (!response.ok) {
    const err = new Error(
      `Something wrong occurred! The status code is ${response.status}`
    );
    err.status = response.status;
    throw err;
  }

  return { status: response.status, success: true };
}

export { saveDataToServer };