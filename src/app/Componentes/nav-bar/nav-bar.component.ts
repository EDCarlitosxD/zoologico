import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getUserDetails } from '../../utils/getUserDetails';
import { IUserDetails, User, RoleEnum } from '../../types/Auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class NavBarComponent implements OnInit {
  user: User | null = null; // Holds user details if logged in
  isLoggedIn = false; // Boolean flag for login status
  role: RoleEnum | null = null; // Tracks user role

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      const userDetails: IUserDetails = JSON.parse(storedUser);
      this.user = userDetails.user;
      this.role = userDetails.user.rol;
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    localStorage.removeItem('userDetails');
    this.isLoggedIn = false;
    this.user = null;
    this.role = null;
  }
}
