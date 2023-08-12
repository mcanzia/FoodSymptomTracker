export class ChartController {
    async getAllCharts(userAuthToken) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts', {
                method: 'GET',
                headers: {
                    'Authorization': bearer
                }
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
    async getChartById(userAuthToken, chartId) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts/' + chartId, {
                method: 'GET',
                headers: {
                    'Authorization': bearer
                }
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
    async addCharts(userAuthToken, charts) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(charts)
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateChart(userAuthToken, chart) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts/' + chart.id, {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async createAverageChart(userAuthToken, chart) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts/average', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
    async createFoodValueChart(userAuthToken, chart) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts/food-value', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
    async createSingleValueComponentWeightByFoodChart(userAuthToken, chart) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts/single-value-component-weight-by-food', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
    async createMultiValueComponentWeightByFoodChart(userAuthToken, chart) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/charts/multi-value-component-weight-by-food', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chart)
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
}
//# sourceMappingURL=ChartController.js.map