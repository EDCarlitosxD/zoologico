import { IUserDetails } from "../types/Auth";

export function getUserDetails(){
  const userString = localStorage.getItem('userDetails');

  if(userString === null){
    return null;
  }


  const user: IUserDetails | null = JSON.parse(userString);

  return user;

}
