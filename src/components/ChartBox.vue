<template>
	<!-- <Bar :data="dataStructure" :options="{ responsive: true }" /> -->
	<Line :data="tempData" :options="options" />
	<Line :data="pressData" :options="options" />
</template>

<script lang="ts">
import { MonitorData } from '@/shared/interfaces/monitorData.model';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs';
import _ from 'lodash';
// import { ChartData } from '@/shared/interfaces/chartData.model';
// import { ScatterDataPoint } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default defineComponent({
	name: 'App',
	components: { Line },
	props: ['chartData'],

	data() {
		return {
			tempData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Data One',
						borderColor: '#f87979',
						backgroundColor: '#f87979',
						data: [40, 39, 10, 40, 39, 80, 40],
					},
				],
			},
			pressData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Data One',
						borderColor: '#f87979',
						backgroundColor: '#f87979',
						data: [40, 39, 10, 40, 39, 80, 40],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						min: 10,
						max: 200,
					},
				},
			},
		};
	},

	mounted() {
		// console.log(this.chartData);
	},

	watch: {
		chartData: {
			handler(monitorData: Array<MonitorData>) {
				// console.log(monitorData, this);
				console.log('chartData watch');

				const newTempData = _.cloneDeep(this.tempData);
				const newPressData = _.cloneDeep(this.pressData);
				newTempData.labels = [];
				newTempData.datasets[0].data = [];

				newPressData.labels = [];
				newPressData.datasets[0].data = [];

				monitorData.forEach(row => {
					newTempData.labels.push(row.date);
					newTempData.datasets[0].data.push(row.temperatureValue);
					newPressData.labels.push(row.date);
					newPressData.datasets[0].data.push(row.pressureValue);
				});

				this.tempData = newTempData;
				this.pressData = newPressData;
			},
			deep: true,
		},
	},
});
</script>
