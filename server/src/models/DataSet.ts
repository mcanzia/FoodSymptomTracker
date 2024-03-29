export class DataSet {

    data : Array<Number>;
    label : string;

    constructor(data : Array<Number>, label : string) {
        this.data = data;
        this.label = label;
    }

    toObject?() {
        return {
            data: [...this.data],
            label: this.label
        };
    }
}