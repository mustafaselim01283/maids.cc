import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  userDetails, usersData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor(private clint:HttpClient) { }

getAllUsers(pageNo:number):Observable<usersData>{
  return this.clint.get<usersData>(`https://reqres.in/api/users?page=${pageNo}`)
}

GetUser(id:number):Observable<userDetails>{

  return this.clint.get<userDetails>(`https://reqres.in/api/users/${id}`)
}
}
