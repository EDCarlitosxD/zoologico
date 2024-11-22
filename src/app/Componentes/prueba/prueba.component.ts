import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PruebaServiceService } from './prueba-service.service';
import { Post } from './interface';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent {

  variable: Post[] = [];
  constructor(private service: PruebaServiceService) { 
    
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.service.GetPosts().subscribe(data => this.variable = data);

  }
}
