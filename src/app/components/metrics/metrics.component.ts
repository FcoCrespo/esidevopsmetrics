import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services'

export interface BranchesData {
  idGithub:string;  
  repository: string;
  name: string;
  order: string;
}

const ELEMENT_DATA: BranchesData[] = [];

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  branches: BranchesData[];
  labelsBranches: Array<string> = [];
  ordersBranches: Array<string> = [];
  colorsBranches: Array<string> = [];
  charts: Array<Chart> = [];
  colors: Array<string> = [ 'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 206, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 0, 54)',
                            'rgb(219, 217, 36)',
                            'rgb(0, 255, 201)'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
     
  }

  ngOnInit() {
    this.branches = JSON.parse(localStorage.getItem("branches"));
    console.log(this.branches);

    for(var i = 0; i<this.branches.length; i++){
      this.labelsBranches.push(this.branches[i].name);
    }

    for(var j = 0; j<this.branches.length; j++){
      this.ordersBranches.push(this.branches[j].order);
    }

    var colores = 0;
    for(var cont = 0; cont<this.branches.length; cont++){
      this.colorsBranches.push(this.colors[colores])
      colores = colores + 1;
      if(colores==this.colors.length){
        colores=0;
      }
    }
    


    var myRouter = this.router;
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.labelsBranches,
        datasets: [{
          label: '# of Votes',
          data: this.ordersBranches,
          backgroundColor: this.colorsBranches,
          borderColor: this.colorsBranches,
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
        onClick: function(e) {
          var element = this.getElementsAtEvent(e);
          if (element.length>0) {
             var clickedIndex = element[0]["_index"];
             console.log(myChart.data.labels[clickedIndex]+" "+ myChart.data.datasets[0].data[clickedIndex]);
             myRouter.navigate(['/admin']);
             localStorage.setItem('DataLabelChart', myChart.data.labels[clickedIndex]);
             localStorage.setItem('DataChart', myChart.data.datasets[0].data[clickedIndex]);
          }
        }
      }
    });

    var myChart2 = new Chart("myChart2", {
      type: 'line',
      data: {
        labels: this.labelsBranches,
        datasets: [{
          label: '# of Votes',
          data: this.ordersBranches,
          borderColor: 'rgb(54, 162, 235)',
          fill: false
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
        onClick: function(e) {
          var element = this.getElementsAtEvent(e);
          if (element.length>0) {
             var clickedIndex = element[0]["_index"];
             console.log(myChart.data.labels[clickedIndex]+" "+ myChart.data.datasets[0].data[clickedIndex]);
             myRouter.navigate(['/admin']);
             localStorage.setItem('DataLabelChart', myChart2.data.labels[clickedIndex]);
             localStorage.setItem('DataChart', myChart2.data.datasets[0].data[clickedIndex]);
          }
        }
      }
    });

    var myChart3 = new Chart("myChart3", {
      type: 'doughnut',
      data: {
        labels: this.labelsBranches,
        datasets: [{
          label: '# of Votes',
          data: this.ordersBranches,
          backgroundColor: this.colorsBranches,
          borderColor: 'rgb(255,255,255)',
          borderWidth: 1
        }]
      },
      options: {
        onClick: function(e) {
          var element = this.getElementsAtEvent(e);
          if (element.length>0) {
             var clickedIndex = element[0]["_index"];
             console.log(myChart.data.labels[clickedIndex]+" "+ myChart.data.datasets[0].data[clickedIndex]);
             myRouter.navigate(['/admin']);
             localStorage.setItem('DataLabelChart', myChart3.data.labels[clickedIndex]);
             localStorage.setItem('DataChart', myChart3.data.datasets[0].data[clickedIndex]);
          }
        }
      }
    });

    //Se puede sacar todo con el .config.etc
    //console.log(myChart2.config.type);

    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  } 

  
}
