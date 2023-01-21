export class DateLogController {
    async getAllDateLogs(userAuthToken) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/datelogs', {
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

    async getDateLogById(userAuthToken, dateLogId) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/datelogs/' + dateLogId, {
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

    async addDateLogs(userAuthToken, dateLogs) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/datelogs', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dateLogs)
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateDateLog(userAuthToken, dateLogId, dateLog) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/datelogs/' + dateLogId, {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dateLog)
            })
            console.log(response.json());
        } catch (error) {
            console.log(error);
        }
    }
}
