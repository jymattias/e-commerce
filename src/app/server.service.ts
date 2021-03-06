import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: HttpClient) { 

  }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  //------------------------------------User Service-----------------------------------------------//
  
  addUsers(usuario) {
    return this.request('POST', `${environment.serverUrl}/usuario`, usuario);
  }

  getUsers(){
    return this.request('GET', `${environment.serverUrl}/usuario`);
  }

  updateUser(usuario) {
    return this.request('PUT', `${environment.serverUrl}/usuario/${usuario.idUsuario}`, usuario)
  }
  
  deleteUser(usuario) {
    return this.request('DELETE', `${environment.serverUrl}/usuario/${usuario.idUsuario}`)
  }

}



