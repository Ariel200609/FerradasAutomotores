import { loginAPI, registerAPI } from '../services/apiService';

// Login de usuario
export const loginUser = async ({ email, password }: { email: string, password: string }) => {
  return loginAPI({ email, password });
};

// Registro de usuario
export const registerUser = async ({ username, email, password }: { username: string, email: string, password: string }) => {
  return registerAPI({ username, email, password });
}; 