import { ChartTitle } from "./ChartTitle";

export class ChartPlugins {

    title : ChartTitle

    constructor(title : ChartTitle) {
        this.title = title
    }

    toObject?() {
        return {
            title: this.title.toObject ? this.title.toObject() : this.title
        };
    }
    
}