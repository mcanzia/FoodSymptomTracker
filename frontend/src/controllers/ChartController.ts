import { Chart } from "../models/Chart";
export class ChartController {
    async getAllCharts(userAuthToken : any) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts', {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getChartById(userAuthToken : any, chartId : string) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts/' + chartId, {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async addCharts(userAuthToken : any, charts : Array<Chart>) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(charts)
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateChart(userAuthToken : any, chart : Chart) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts/' + chart.id, {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createAverageChart(userAuthToken : any, chart : Chart) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts/average', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async createFoodValueChart(userAuthToken : any, chart : Chart) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts/food-value', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async createSingleValueComponentWeightByFoodChart(userAuthToken : any, chart : Chart) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts/single-value-component-weight-by-food', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async createMultiValueComponentWeightByFoodChart(userAuthToken : any, chart : Chart) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/charts/multi-value-component-weight-by-food', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }
}
