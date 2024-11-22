import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './interface';


@Injectable({
  providedIn: 'root'
})
export class PruebaServiceService {

  constructor(private http: HttpClient) { 

  }


  GetPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  }  
}
