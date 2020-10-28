import { DatePipe } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';


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
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})

export class CommitsComponent implements OnInit {
  data: CommitsData[];
  commits: CommitsData[] = [];
  public commitsLenght : number = 0;
  

  

  constructor(private commitService : CommitService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { 

    }

  ngOnInit() {
    this.commitService.getCommitsBranch('admin', '1.1-stable', 'redmine', 'FcoCrespo')
      .subscribe((data: CommitsData[]) => {
        this.data = data;
        this.commitsLenght = data.length;
        console.log(this.commitsLenght);
        this.commits = this.data;
        for(var i = 0; i<this.commitsLenght; i++){
          
          if(this.commits[i].authoredDate!=null){
            var dateCommit = this.setDateTime(this.commits[i].authoredDate);
            console.log(dateCommit);
          }
          else{
            var dateCommit = this.setDateTime(this.commits[i].pushedDate);
            console.log(dateCommit);
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
