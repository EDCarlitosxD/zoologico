import { Injectable } from '@angular/core';
import { IUserDetails } from '../types/Auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getUserDetails } from '../utils/getUserDetails';
import { environment } from '../environment';
import { IMembresia, IMembresiaUser } from '../types/Membresia';

@Injectable({
  providedIn: 'root',
})
export class MembresiasService {
  private userDetails: IUserDetails | null;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('accept', 'application/json');
    this.userDetails = getUserDetails();
  }
  public getAll() {
    return this.http.get<IMembresia[]>(`${environment.API_URL}/membresias`);
  }
  public getActive() {
    return this.http.get<IMembresia[]>(`${environment.API_URL}/membresias?estado=1`);
  }
   public  getById(id: number | null | undefined) {
     return  this.http.get<IMembresia>(`${environment.API_URL}/membresias/${id}`);
    console.log(id);
  }
  public create(membresia: IMembresia) {
    return this.http.post<IMembresia>(
      `${environment.API_URL}/membresias`,
      membresia,
      { headers: this.headers }
    );
  }
  public update(membresia: IMembresia, id: number) {
    return this.http.put<IMembresia>(
      `${environment.API_URL}/membresias/actualizar/${id}`,
      membresia,
      { headers: this.headers }
    );
  }
  public actualizarEstado(id: number, estado: boolean) {
    return this.http.put<IMembresia>(
      `${environment.API_URL}/membresias/eliminar/${id}`,
      { headers: this.headers, estado: estado }
    );
  }

  public realizarVenta(venta: IMembresiaUser){
      return this.http.post(`${environment.API_URL}/venta/membresia`, venta, {
        headers: {
          'Authorization': `Bearer ${this.userDetails?.token}`,
      } 
      });
    }





    private membresiaSeleccionada: IMembresiaUser = {
      id_membresia: 0,
      id_usuario: 0,
      meses: 1,
      precio_total: 0,
      img: ''
    };

    setMembresia(membresia: IMembresia) {
      console.log("membresia SERVICE",membresia);
      this.membresiaSeleccionada.id_membresia = membresia.id ;
      this.membresiaSeleccionada.id_usuario = this.userDetails!.user.id;

      this.membresiaSeleccionada.precio_total = membresia.precio;
      console.log(this.membresiaSeleccionada);
      return this.membresiaSeleccionada;
    }

    setCompra(membresia: IMembresiaUser) {
      this.membresiaSeleccionada = membresia;
      console.log(this.membresiaSeleccionada);
      return this.membresiaSeleccionada;
    }
    
  
    getMembresia() {
      console.log("GET MEMBRESIA", this.membresiaSeleccionada);
      return this.membresiaSeleccionada;
    }
}
