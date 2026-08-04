const getEnvVariable = (key, fallback = undefined) => {
  const value = import.meta.env[key] || fallback;
  
  if (value === undefined) {
    console.warn(`[Config Warning]: Environment variable "${key}" is missing.`);
  }
  
  return value;
};
export const config = {
  apiBaseUrl: getEnvVariable('VITE_API_BASE_URL', 'http://localhost:5000/api'),
  appEnv: getEnvVariable('VITE_APP_ENV', 'development'),
  isProduction: getEnvVariable('VITE_APP_ENV', 'development') === 'production',
};

export default config;