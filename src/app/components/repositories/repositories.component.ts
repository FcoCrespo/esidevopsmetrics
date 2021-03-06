import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface RepositoryData {
  repository:string;  
  owner: string;
}

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  data: RepositoryData[];
  repositories: RepositoryData[] = [];
  public username: string = null;
  public tokenpass: string = null;
  public role: string = null;
  public names: string = null;
  public chartData: string = null;
  public repositoriesLenght : number = 0;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commitService : CommitService,) {

    var values = JSON.parse(localStorage.getItem("currentUser"));
    this.username = values.username;
    this.tokenpass = values.tokenPass;
    console.log(this.tokenpass);
    this.role = values.role;
    this.names = "BRANCHES \n";
    this.repositoriesLenght = 0;


    this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");

  }

  ngOnInit() {
    document.body.classList.add('bg-img-white');
    this.commitService.getRepositories(this.tokenpass)
      .subscribe((data: RepositoryData[]) => {
        this.data = data;
        console.log(this.data);
        this.repositoriesLenght = data.length;
        this.repositories = this.data;
        localStorage.setItem('repositories', JSON.stringify(this.repositories));
    });
    document.getElementById("examplebar").setAttribute("class","progress-bar-orange");
  }

  get getUsername(): string {
    return this.username;
  }

  get getRole(): string {
    return this.role;
  }

  get getChartData(): string {
    return this.chartData;
  }

  clickEvent(repository: RepositoryData){
    localStorage.setItem('RepositoryData', JSON.stringify(repository));
    this.router.navigate(['/admin']);      
  }

  goHome(){
		this.router.navigate(['/repositories']); // navigate to other page
	}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
