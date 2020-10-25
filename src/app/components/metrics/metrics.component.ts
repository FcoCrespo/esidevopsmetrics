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

  public htmlToAdd: string = "";
  public idCanvas: number = 0;
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
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService
  ) {
    this.idCanvas=0;
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

    var myChart4= new Chart("myChart4", {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
          },
          {
            label: '# of Votes 2',
            data: [15, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
          scales: {
              yAxes: [{
                  stacked: true,
                  ticks: {
                      beginAtZero: true
                  }
              }],
              xAxes: [{
                stacked: true
              }]
          },
          onClick: function(e) {
            var element = this.getElementAtEvent(e)[0];
            var elementLabel = this.getElementsAtEvent(e);
            var clickedIndexLabel = elementLabel[0]["_index"];
            var data = element._chart.data;
            var clickedIndex = element._datasetIndex;
            var label = myChart4.data.labels[clickedIndexLabel];
            var value = data.datasets[clickedIndex].data[element._index];
            console.log("ESTOY :" + label + " " + value);

            localStorage.setItem('DataLabelChart', label);
            localStorage.setItem('DataChart', value);
            myRouter.navigate(['/admin']);
            /*setTimeout(() => {
              myRouter.navigate(['/admin']);
            },
              5000);*/
            
          }
      }
    });

    //Se puede sacar todo con el .config.etc
    //console.log(myChart2.config.type);

    
  }

  appendElement(){
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myRouter = this.router;
    let myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myCanvasExample"+this.idCanvas);
    document.getElementById('addElement').appendChild(myCanvasExample);
    var myChart = new Chart("myCanvasExample"+this.idCanvas, {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [this.idCanvas, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
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
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  } 

  
}
