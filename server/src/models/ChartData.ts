import { DataSet } from "./DataSet";

export class ChartData {

    startDate : Date;
    endDate : Date;
    datasets : Array<DataSet>;
    labels : Array<String>

    constructor(startDate : Date, endDate : Date, datasets? : Array<DataSet>, labels? : Array<String>) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.datasets = datasets ? datasets : new Array<DataSet>;
        this.labels = labels ? labels : new Array<String>;
    }


}