"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCharts = void 0;
const MockFoods_1 = require("./MockFoods");
const MockComponents_1 = require("./MockComponents");
class MockCharts {
    static createChartData() {
        return {
            datasets: [
                {
                    data: [1, 2, 3],
                    label: 'Label 1'
                },
                {
                    data: [4, 5, 6],
                    label: 'Label 2'
                }
            ],
            labels: ['Label 1', 'Label 2']
        };
    }
    static createChartOptions(title) {
        return {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        };
    }
    static createChart() {
        return {
            id: '1',
            chartTitle: 'Test Chart',
            chartType: 'bar',
            chartData: MockCharts.createChartData(),
            chartOptions: MockCharts.createChartOptions('Test Chart'),
            selectedComponent: MockComponents_1.MockComponents.createComponent(),
            selectedFood: MockFoods_1.MockFoods.createFoodItem(),
            startDate: "",
            endDate: ""
        };
    }
    static createChartArray() {
        return [
            {
                id: '1',
                chartTitle: 'Test Chart 1',
                chartType: 'bar',
                chartData: MockCharts.createChartData(),
                chartOptions: MockCharts.createChartOptions('Test Chart 1'),
                selectedComponent: MockComponents_1.MockComponents.createComponent(),
                selectedFood: MockFoods_1.MockFoods.createFoodItem(),
                startDate: "",
                endDate: ""
            },
            {
                id: '2',
                chartTitle: 'Test Chart 2',
                chartType: 'line',
                chartData: MockCharts.createChartData(),
                chartOptions: MockCharts.createChartOptions('Test Chart 2'),
                selectedComponent: MockComponents_1.MockComponents.createComponent(),
                selectedFood: MockFoods_1.MockFoods.createFoodItem(),
                startDate: "",
                endDate: ""
            }
        ];
    }
    static createChartArrayTwo() {
        return [
            {
                id: '3',
                chartTitle: 'New Test Chart 3',
                chartType: 'pie',
                chartData: MockCharts.createChartData(),
                chartOptions: MockCharts.createChartOptions('New Test Chart 3'),
                selectedComponent: MockComponents_1.MockComponents.createComponent(),
                selectedFood: MockFoods_1.MockFoods.createFoodItem(),
                startDate: "",
                endDate: ""
            },
            {
                id: '4',
                chartTitle: 'New Test Chart 4',
                chartType: 'donut',
                chartData: MockCharts.createChartData(),
                chartOptions: MockCharts.createChartOptions('New Test Chart 4'),
                selectedComponent: MockComponents_1.MockComponents.createComponent(),
                selectedFood: MockFoods_1.MockFoods.createFoodItem(),
                startDate: "",
                endDate: ""
            }
        ];
    }
}
exports.MockCharts = MockCharts;
