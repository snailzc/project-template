// use storage the user token
export function getToken() {
  return localStorage.getItem('token') || null;
}

export function setToken(token) {
  return localStorage.setItem('token', token);
}
