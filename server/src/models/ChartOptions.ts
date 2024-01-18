import { ChartPlugins } from "./ChartPlugins";

export class ChartOptions {

    plugins : ChartPlugins

    constructor(plugins : ChartPlugins) {
        this.plugins = plugins;
    }

    toObject?() {
        return {
            plugins: this.plugins.toObject ? this.plugins.toObject() : this.plugins
        };
    }


}