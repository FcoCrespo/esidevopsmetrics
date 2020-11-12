import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';


export interface BranchesData {
  idGithub:string;  
  repository: string;
  name: string;
  order: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  data: BranchesData[];
  branches: BranchesData[] = [];
  public username: string = null;
  public tokenpass: string = null;
  public role: string = null;
  public names: string = null;
  public chartData: string = null;
  public branchesLenght : number = 0;
  public repositoryName : string = "";

  constructor(private commitService : CommitService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    var values = JSON.parse(localStorage.getItem("currentUser"));
    this.username = values.username;
    this.tokenpass = values.tokenPass;
    console.log(this.tokenpass);
    this.role = values.role;
    this.names = "BRANCHES \n";
    this.branchesLenght = 0;

    this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");
    
  }
  

  ngOnInit() {

    document.body.classList.add('bg-img-white');
    this.commitService.getBranches(this.tokenpass, 'redmine', 'FcoCrespo')
      .subscribe((data: BranchesData[]) => {
        this.data = data;
        console.log(this.data);
        this.branchesLenght = data.length;
        this.branches = this.data;
        localStorage.setItem('branches', JSON.stringify(this.branches));
        this.repositoryName = this.branches[0].repository;
        document.getElementById("repositoryname").style.visibility = "visible";
    });

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

  clickEvent(branch: BranchesData){
    localStorage.setItem('BranchData', JSON.stringify(branch));
    this.router.navigate(['/commitsmetrics']);      
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
