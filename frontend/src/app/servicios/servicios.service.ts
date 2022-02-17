import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  constructor(private http:HttpClient) { }

  url = "http://192.168.0.19:8080/"

  strace = "http://34.123.112.42:3000/"


  cabecera = new HttpHeaders();

  getInfoRam():Observable<any>{
    return this.http.get(this.url+"RAM");
  }
  getProcesos():Observable<any>{
    return this.http.get(this.url+"procesos");
  }

  getStrace():Observable<any>{
    return this.http.post(this.strace+"api/strace",
    {
      name: "nfsd"
    }
    );
  }

  kill(pid:string):Observable<any>{
    this.cabecera.set('Content-Type','application/json')
    let datos = {
      "pid" : pid
    }

    return this.http.post(this.url+"kill",datos,{headers:this.cabecera})
  }
  cpu():Observable<any>{
    return this.http.get(this.url+"cpu")
  }

  async terminar(pid:string){
    let datos ={
      pid : pid
    }
    const respuestaRaw = await fetch(this.url, {
        body: JSON.stringify(datos), // <-- Aquí van los datos
        headers: {
          "Content-Type": "application/json", // <-- Importante el encabezado
        },
          method: "POST",
    })
    const resp = respuestaRaw.ok
    return resp
  }

  async usuario(user:string){
    let datos ={
      user : String(user)
    }
    const respuestaRaw = await fetch(this.url+"/user", {
        body: JSON.stringify(datos), // <-- Aquí van los datos
        headers: {
          "Content-Type": "application/json", // <-- Importante el encabezado
        },
          method: "POST",
    })
    const resp = await respuestaRaw.json();
    return resp.values
  }
}
