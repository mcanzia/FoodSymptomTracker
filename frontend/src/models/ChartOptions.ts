import { ChartPlugins } from "./ChartPlugins";

export class ChartOptions {

    plugins : ChartPlugins
    scales? : any | null;

    constructor(title : string) {
        this.plugins = new ChartPlugins(title);
    }


}