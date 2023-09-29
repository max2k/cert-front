import baseUrl from './baseUrl';

function getRequestOptionsPost(reqData) {
  const requestOptions = {
    method: 'POST',
    //    mode: 'no-cors',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(reqData),
  };

  return requestOptions;
}

export async function userLogin(reqData) {
  const loginForm = {
    username: reqData.userLogin,
    password: reqData.userPassword,
  };

  const res = await fetch(
    `${baseUrl}/auth/login`,
    getRequestOptionsPost(loginForm),
  );

  if (!res.ok) throw Error('Failed login call');

  const data = await res.json();
  return data;
}

export async function deleteCertApi(id, jwt) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  };
  const res = await fetch(`${baseUrl}/GiftCertificates/${id}`, requestOptions);
  if (!res.ok) throw Error('Error deleting certificate with id ' + id);
  return;
}
