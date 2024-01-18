import { DataSet } from "./DataSet";

export class ChartData {

    datasets : Array<DataSet>;
    labels : Array<String>

    constructor(datasets? : Array<DataSet>, labels? : Array<String>) {
        this.datasets = datasets ? datasets : new Array<DataSet>;
        this.labels = labels ? labels : new Array<String>;
    }

    toObject?() {
        return {
            datasets: this.datasets.map(dataset => dataset.toObject ? dataset.toObject() : dataset),
            labels: [...this.labels]
        };
    }


}