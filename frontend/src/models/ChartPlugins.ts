import { ChartTitle } from "./ChartTitle";

export class ChartPlugins {

    title : ChartTitle

    constructor(title : string) {
        this.title = new ChartTitle(title);
    }


}