import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'node_modules/chart.js';
import { SBSortableHeaderDirective, SortEvent } from 'src/app/modules/tables/directives';
import { Country } from 'src/app/modules/tables/models';
import { CountryService } from 'src/app/modules/tables/services';
import { Observable } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface BranchesData {
  idGithub: string;
  repository: string;
  name: string;
  order: string;
}

export interface CommitsData {
  id: string;
  oid: string;
  messageHeadline: string;
  message: string;
  pushedDate: DatePipe;
  changedFiles: number;
  authorName: string;
  branch: string;
  repository: string;
}

@Component({
  selector: 'app-commitsmetrics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './commitsmetrics.component.html',
  styleUrls: ['./commitsmetrics.component.css']
})
export class CommitsmetricsComponent implements OnInit {

  @Input() pageSize = 4;

  countries$!: Observable<Country[]>;
  total$!: Observable<number>;
  sortedColumn!: string;
  sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  public idCanvas: number = 0;

  branch: BranchesData;
  data: CommitsData[];
  commits: CommitsData[] = [];

  public commitsLenght: number = 0;

  public username: string = null;
  public tokenpass: string = null;
  public role: string = null;

  labelsCommitsDate: Array<string> = [];
  numCommitsDate: Array<number> = [];

  labelsCommitsAuthor: Array<string> = [];
  numCommitsAuthor: Array<number> = [];

  ordersBranches: Array<string> = [];
  colorsCommits: Array<string> = [];
  charts: Array<Chart> = [];
  colors: Array<string> = ['rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(255, 0, 54)',
    'rgb(219, 217, 36)',
    'rgb(0, 255, 201)'];


  constructor(
    private commitService: CommitService,
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public countryService: CountryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.idCanvas = 0;
  }

  ngOnInit() {
    document.body.classList.add('bg-img-white');
    this.countryService.pageSize = this.pageSize;
    this.countries$ = this.countryService.countries$;
    this.total$ = this.countryService.total$;

    this.branch = JSON.parse(localStorage.getItem("BranchData"));
    console.log(this.branch);
    var values = JSON.parse(localStorage.getItem("currentUser"));
    this.username = values.username;
    this.tokenpass = values.tokenPass;
    this.role = values.role;

    var owner = "";

    if (this.branch.repository.localeCompare("eSalud") == 0) {
      console.log("entro en sherrerap");
      owner = 'sherrerap';
    }
    else {
      console.log("entro en crespo");
      owner = 'FcoCrespo';
    }

    this.commitService.getCommitsBranch(this.tokenpass, this.branch.name, this.branch.repository, owner)
      .subscribe((data: CommitsData[]) => {
        this.data = data;
        this.commitsLenght = data.length;
        this.commits = this.data;
        console.log(this.commitsLenght);

        this.obtenerLabelsCommitsAuthor();
        console.log(this.labelsCommitsAuthor);
        this.contarCommitsAuthor();
        console.log(this.numCommitsAuthor);

        var colores = 0;
        for (var cont = 0; cont < this.labelsCommitsAuthor.length; cont++) {
          this.colorsCommits.push(this.colors[colores])
          colores = colores + 1;
          if (colores == this.colors.length) {
            colores = 0;
          }
        }
        this.crearCanvasBarCommitAuthor();
        this.crearCanvasPieCommitAuthor();
      });

    document.getElementById("report").style.visibility = "visible";

  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;
    this.countryService.sortColumn = column;
    this.countryService.sortDirection = direction;
    this.changeDetectorRef.detectChanges();
  }

  obtenerLabelsCommitsAuthor() {
    var labelsCommitsAuthoraux = [];
    for (var i = 0; i < this.commitsLenght; i++) {
      if (this.commits[i].authorName !== undefined) {
        if (labelsCommitsAuthoraux[this.commits[i].authorName]) continue;
        labelsCommitsAuthoraux[this.commits[i].authorName] = true;
        this.labelsCommitsAuthor.push(this.commits[i].authorName);
      }
    }
  }

  contarCommitsAuthor() {
    var cont = 0;

    for (var j = 0; j < this.labelsCommitsAuthor.length; j++) {
      for (var i = 0; i < this.commitsLenght; i++) {
        if (this.commits[i].authorName !== undefined && this.labelsCommitsAuthor[j] !== undefined) {
          if (this.commits[i].authorName.localeCompare(this.labelsCommitsAuthor[j]) == 0) {
            cont = cont + 1;
          }
        }
      }
      this.numCommitsAuthor.push(cont);
      cont = 0;
    }

  }

  crearCanvasBarCommitAuthor() {
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChart').appendChild(myCanvasExample);
    var myRouter = this.router;
    var myChart = new Chart("myChart" + this.idCanvas, {
      type: 'bar',
      data: {
        labels: this.labelsCommitsAuthor,
        datasets: [{
          label: 'Number of Commits per Author in ' + this.branch.name + ' Branch ',
          data: this.numCommitsAuthor,
          backgroundColor: this.colorsCommits,
          borderColor: this.colorsCommits,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        onClick: function (e) {
          var element = this.getElementsAtEvent(e);
          if (element.length > 0) {
            var clickedIndex = element[0]["_index"];
            console.log(myChart.data.labels[clickedIndex] + " " + myChart.data.datasets[0].data[clickedIndex]);
            localStorage.setItem('DataLabelChart', myChart.data.labels[clickedIndex]);
            localStorage.setItem('DataChart', myChart.data.datasets[0].data[clickedIndex]);
            myRouter.navigate(['/commitsauthor']);
          }
        }
      }
    });
  }

  crearCanvasPieCommitAuthor() {
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChartCircle').appendChild(myCanvasExample);
    var myRouter = this.router;
    var myChart = new Chart("myChart" + this.idCanvas, {
      type: 'doughnut',
      data: {
        labels: this.labelsCommitsAuthor,
        datasets: [{
          label: 'Number of Commits per Author in ' + this.branch.name + ' Branch ',
          data: this.numCommitsAuthor,
          backgroundColor: this.colorsCommits,
          borderColor: 'rgb(255,255,255)',
          borderWidth: 1
        }]
      },
      options: {
        onClick: function (e) {
          var element = this.getElementsAtEvent(e);
          if (element.length > 0) {
            var clickedIndex = element[0]["_index"];
            console.log(myChart.data.labels[clickedIndex] + " " + myChart.data.datasets[0].data[clickedIndex]);
            myRouter.navigate(['/commitsauthor']);
            localStorage.setItem('DataLabelChart', myChart.data.labels[clickedIndex]);
            localStorage.setItem('DataChart', myChart.data.datasets[0].data[clickedIndex]);
          }
        }
      }
    });
  }

  async exportAsPDF() {
    let ids: Array<string>;
    ids = ['myChart1', 'myChart2'];

    const title = 'Number of Commits per Author in Branch ' + this.branch.name + '  from Repository ' + this.branch.repository;

    const doc = new jsPDF('l', 'mm', 'a4');
    doc.text(title, 10, 10);
    const options = {
      pagesplit: true
    };
    const length = ids.length;
    for (let i = 0; i < length; i++) {
      const chart = document.getElementById(ids[i]);
      // excute this function then exit loop
      await html2canvas(chart, {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
      }).then(function (canvas) {
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 25, 50, 160, 110);
        if (i < (length - 1)) {
          doc.addPage();
          doc.text(title, 10, 10);
        }
      });
    }
    // download the pdf with all charts
    var f = new Date();
    var mes = f.getMonth() + 1;
    doc.save('Commits_report_Branch_' + this.branch.name + '_Repository_' + this.branch.repository + '_' + f.getDate() + "-" + mes + "-" + f.getFullYear() + '-' + f.getHours() + '-' + f.getMinutes() + '.pdf');
  }

  goHome() {
    this.router.navigate(['/repositories']); // navigate to other page
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
