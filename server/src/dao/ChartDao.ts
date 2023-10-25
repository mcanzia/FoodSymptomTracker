import { db } from '../configs/firebase';
import { Chart } from '../models/Chart';
import { DatabaseError } from '../util/error/CustomError';

export interface ChartDao {
    getAllCharts(authId : any) : Promise<Chart[]>;
    getChartById(authId : any, chartId : string) : Promise<Chart>;
    addCharts(authId : any, charts : Array<Chart>) : void;
    updateChart(authId : any, chartId : string, chartData : Chart) : void;
    deleteCharts(authId : any, chartIds : Array<string>) : void;
}

