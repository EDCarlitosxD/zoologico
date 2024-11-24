export interface User {
  id: number;
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  estado: number;
  rol: RoleEnum;
}
export enum RoleEnum{
  ADMIN = 'admin',
  CLIENTE = 'cliente'
}
export interface AuthResponse {
  token: string;
  user: User;
}

export interface IUserDetails{
  token: string,
  user: User
}
