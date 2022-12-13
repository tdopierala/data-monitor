export interface ChartDataset {
	data: Array<string | number>;
}

export interface ChartData {
	labels: Array<string>;
	datasets: Array<ChartDataset>;
}
