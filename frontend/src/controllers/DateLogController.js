export class DateLogController {
    async getAllDateLogs(userAuth) {
        try {
            const response = await fetch('http://localhost:7000/api/datelogs', {
                    method: 'GET',
                    headers: {
                        'user-auth': userAuth.uid
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getDateLogById(userAuth, dateLogId) {
        try {
            const response = await fetch('http://localhost:7000/api/datelogs/' + dateLogId, {
                    method: 'GET',
                    headers: {
                        'user-auth': userAuth.uid
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async addDateLogs(userAuth, dateLogs) {
        try {
            const response = await fetch('http://localhost:7000/api/datelogs', {
                method: 'POST',
                headers: {
                    'user-auth': userAuth.uid,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dateLogs)
            })
            console.log(response.json());
        } catch (error) {
            console.log(error);
        }
    }

    async updateDateLog(userAuth, dateLogId, dateLog) {
        try {
            const response = await fetch('http://localhost:7000/api/datelogs/' + dateLogId, {
                method: 'PUT',
                headers: {
                    'user-auth': userAuth.uid,
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
