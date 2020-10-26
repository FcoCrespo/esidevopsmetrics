import { DatePipe } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface BranchesData {
  idGithub:string;  
  repository: string;
  name: string;
  order: string;
}

export interface CommitsData {
  id:string;
  idGithub:string;
  oid:string;
  messageHeadline:string;
  message:string;
  messageBody:string;
  pushedDate:DatePipe;
  changedFiles:number;
  authoredByCommitter:string;
  authoredDate:DatePipe;
  authorName:string;
  authorEmail:string;
  authorDate:string;
  authorId:string;
  branch:string;
  repository:string;
}

@Component({
  selector: 'app-commitsauthor',
  templateUrl: './commitsauthor.component.html',
  styleUrls: ['./commitsauthor.component.css']
})
export class CommitsauthorComponent implements OnInit {

  data: CommitsData[];
  commits: CommitsData[] = [];
  public commitsLenght : number = 0;

  branch: BranchesData;

  public username: string = null;
  public password: string = null;
  public role: string = null;

  public authorName: string = null;
  

  constructor(private commitService : CommitService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { 

              var values = JSON.parse(localStorage.getItem("currentUser"));
              this.username = values.username;
              this.password = values.password;
              this.role = values.role;
              this.branch = JSON.parse(localStorage.getItem("BranchData"));
              this.authorName = localStorage.getItem("DataLabelChart");
  }

  ngOnInit() {
    var owner = "";

    if(this.branch.repository.localeCompare("eSalud")==0){
      console.log("entro en sherrerap");
      owner='sherrerap';
    }
    else{
      console.log("entro en crespo");
      owner='FcoCrespo';
    }

    this.commitService.getCommitsBranchAuthor(this.username, this.password, this.branch.name, this.authorName, this.branch.repository, owner)
      .subscribe((data: CommitsData[]) => {
        this.data = data;
        this.commitsLenght = data.length;
        console.log(this.commitsLenght);
        this.commits = this.data;
        for(var i = 0; i<this.commitsLenght; i++){
          
          if(this.commits[i].authoredDate!=null){
            var dateCommit = this.setDateTime(this.commits[i].authoredDate);
          }
          else{
            var dateCommit = this.setDateTime(this.commits[i].pushedDate);
          }
          document.getElementById("buscador").style.visibility = "visible";
          document.getElementById("totalCommits").style.visibility = "visible";
        }
        

    });
  }

  setDateTime(dateTime) {
    let pipe = new DatePipe('es-ES');

    const time = pipe.transform(dateTime, 'mediumTime', 'UTC');

    const date = pipe.transform(dateTime, 'dd MMMM yyyy', 'UTC');

    return date + ' Hour: ' + time;
  }

  handleSearch(value: string){
    this.filtro_valor=value;
  }
  
  filtro_valor = '';

  mostrarResultados(){
    var content = localStorage.getItem("commitsFilter");
    console.log(content);
    let row = document.createElement('p');   
      row.className = 'row'; 
      row.innerHTML = content; 
      document.querySelector('.showInputField').appendChild(row); 
  }

  totalCommits(){
    return this.commitsLenght;
  }
  commitDate(commit: CommitsData){

    if(commit.authoredDate==null){
      return this.setDateTime(commit.pushedDate);
    }
    else{
      return this.setDateTime(commit.authoredDate);
    }
  }
}