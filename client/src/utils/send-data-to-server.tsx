import { serverURI } from './global-variables';

const sendDataToServer = async (url: String, data: Object, method='POST') => {
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
    throw err;
  }

  return { status: response.status, success: true };
}

export default sendDataToServer;