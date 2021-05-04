import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  currentUserSubject: any;
  constructor(private http: HttpClient) { }


  getRepositories(tokenpass) {
    return this.http.get<any[]>(`${environment.apiUrl}/commits/allrepositories?tokenpass=${tokenpass}`);
  }

  getBranches(tokenpass, reponame, owner) {
      return this.http.get<any[]>(`${environment.apiUrl}/commits/allbranches?tokenpass=${tokenpass}&reponame=${reponame}&owner=${owner}`);
  }

  getCommitsBranch(tokenpass, branch, reponame, owner){
    return this.http.get<any[]>(`${environment.apiUrl}/commits/commitsbranch?tokenpass=${tokenpass}&branch=${branch}&reponame=${reponame}&owner=${owner}`);
  }
  
  getCommitsBranchAuthor(tokenpass, branch, authorname, reponame, owner){
    return this.http.get<any[]>(`${environment.apiUrl}/commits/commitsbranchauthor?tokenpass=${tokenpass}&branch=${branch}&reponame=${reponame}&authorname=${authorname}&owner=${owner}`);
  }
    
}
