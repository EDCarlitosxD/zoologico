import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const location = inject(Location);

  if(localStorage.getItem("userDetails")){
    location.back()
    return false;
  }

  return true;
};
