import { Chart } from "../../models/Chart"
import { MockFoods } from "./MockFoods";
import { MockComponents } from "./MockComponents";
import { ChartData } from "../../models/ChartData";
import { ChartOptions } from "../../models/ChartOptions";

export class MockCharts {

    static createChartData() : ChartData {
      return {
        datasets : [
          {
            data : [1, 2, 3],
            label : 'Label 1'
          },
          {
            data : [4, 5, 6],
            label : 'Label 2'
          }
        ],
        labels : ['Label 1', 'Label 2']
      }
    }

    static createChartOptions(title : string) : ChartOptions {
      return {
        plugins : {
          title : {
            display: true,
            text: title
          }
        }
      }
    }

    static createChart() : Chart {
        return {
          id : '1',
          chartTitle : 'Test Chart',
          chartType: 'AVERAGE',
          chartShape : 'bar',
          chartData : MockCharts.createChartData(),
          chartOptions : MockCharts.createChartOptions('Test Chart'),
          selectedComponent : MockComponents.createComponent(),
          selectedFood : MockFoods.createFoodItem(),
          startDate : "",
          endDate : ""
        }
    }

    static createChartArray() : Array<Chart> {
        return [
            {
              id : '1',
              chartTitle : 'Test Chart 1',
              chartType: 'AVERAGE',
              chartShape : 'bar',
              chartData : MockCharts.createChartData(),
              chartOptions : MockCharts.createChartOptions('Test Chart 1'),
              selectedComponent : MockComponents.createComponent(),
              selectedFood : MockFoods.createFoodItem(),
              startDate : "",
              endDate : ""
            },
            {
              id : '2',
              chartTitle : 'Test Chart 2',
              chartType: 'AVERAGE',
              chartShape : 'line',
              chartData : MockCharts.createChartData(),
              chartOptions : MockCharts.createChartOptions('Test Chart 2'),
              selectedComponent : MockComponents.createComponent(),
              selectedFood : MockFoods.createFoodItem(),
              startDate : "",
              endDate : ""
            }
          ]
    }

    static createChartArrayTwo() : Array<Chart> {
      return [
          {
            id : '3',
            chartTitle : 'New Test Chart 3',
            chartType: 'AVERAGE',
            chartShape : 'pie',
            chartData : MockCharts.createChartData(),
            chartOptions : MockCharts.createChartOptions('New Test Chart 3'),
            selectedComponent : MockComponents.createComponent(),
            selectedFood : MockFoods.createFoodItem(),
            startDate : "",
            endDate : ""
          },
          {
            id : '4',
            chartTitle : 'New Test Chart 4',
            chartType: 'AVERAGE',
            chartShape : 'donut',
            chartData : MockCharts.createChartData(),
            chartOptions : MockCharts.createChartOptions('New Test Chart 4'),
            selectedComponent : MockComponents.createComponent(),
            selectedFood : MockFoods.createFoodItem(),
            startDate : "",
            endDate : ""
          }
        ]
  }
}

