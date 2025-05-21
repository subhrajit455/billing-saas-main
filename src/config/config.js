const config = {
    authBaseUrl: import.meta.env.VITE_AUTH_BASE_URL,
  };
  
  export const authUrl = {
    login: `${config.authBaseUrl}/login`,
    register: `${config.authBaseUrl}/register`,
    logout: `${config.authBaseUrl}/logout`,
  };
