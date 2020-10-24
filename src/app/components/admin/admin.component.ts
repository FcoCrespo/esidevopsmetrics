import { Component, OnInit } from '@angular/core';
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

const ELEMENT_DATA: BranchesData[] = [];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  data: BranchesData[];
  branches: BranchesData[] = [];
  public username: string = null;
  public password: string = null;
  public role: string = null;
  public names: string = null;
  public chartData: string = null;
  public branchesLenght : number = 0;

  constructor(private commitService : CommitService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    var values = JSON.parse(localStorage.getItem("currentUser"));
    this.username = values.username;
    this.password = values.password;
    this.role = values.role;
    this.names = "BRANCHES \n";
    this.branchesLenght = 0;

    this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");
    
  }
  

  ngOnInit() {

    document.body.classList.add('bg-img-white');
    this.commitService.getBranches(this.username, this.password, 'redmine', 'FcoCrespo')
      .subscribe((data: BranchesData[]) => {
        this.data = data;
        console.log(this.data);
        this.branchesLenght = data.length;
        this.branches = this.data;
        localStorage.setItem('branches', JSON.stringify(this.branches));
    });

  }

  get getUsername(): string {
    return this.username;
  }

  get getPassword(): string {
    return this.password;
  }

  get getRole(): string {
    return this.role;
  }

  get getChartData(): string {
    return this.chartData;
  }

  clickEvent(){
    this.router.navigate(['/metrics']);      
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
