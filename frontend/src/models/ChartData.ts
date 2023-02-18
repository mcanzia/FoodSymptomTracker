import { DataSet } from "./DataSet";

export class ChartData {

    datasets : Array<DataSet>
    labels : Array<string>

    constructor(datasets : Array<DataSet>, labels : Array<string>) {
        this.datasets = datasets;
        this.labels = labels;
    }


}