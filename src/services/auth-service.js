import http from 'axios';

class AuthService {
  constructor() {
    this.authEndpoint = `${process.env.REACT_APP_API_URL}/auth`;
    // this.setDefaults();
    console.log('constructor:authEndpoint', this.authEndpoint);
  }

  /* setDefaults() {
    http.defaults.headers.common['Content-Type'] = 'application/json';
    http.defaults.headers.common['Accept'] = 'application/json';
  } */

  login({ email, password }) {
    return new Promise((resolve, reject) => {
      http
        .post(`${this.authEndpoint}/login`, { email, password })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log('[auth-service:login]', error);
          reject(error.response);
        });
    });
  }
}

const instance = new AuthService();

export default instance;
