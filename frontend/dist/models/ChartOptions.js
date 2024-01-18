import { ChartPlugins } from "./ChartPlugins";
export class ChartOptions {
    plugins;
    scales;
    constructor(title) {
        this.plugins = new ChartPlugins(title);
    }
}
//# sourceMappingURL=ChartOptions.js.map