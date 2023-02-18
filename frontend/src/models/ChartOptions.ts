import { ChartPlugins } from "./ChartPlugins";

export class ChartOptions {

    plugins : ChartPlugins

    constructor(title : string) {
        this.plugins = new ChartPlugins(title);
    }


}