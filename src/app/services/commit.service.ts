import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  currentUserSubject: any;
  constructor(private http: HttpClient) { }

  getBranches(username, password, reponame, owner) {
      return this.http.get<any[]>(`${environment.apiUrl}/commits/allbranches?username=${username}&password=${password}&reponame=${reponame}&owner=${owner}`);
  }
    
}
