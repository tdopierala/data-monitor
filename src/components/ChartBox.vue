<template>
	<Bar :data="data" :options="options" />
</template>

<script lang="ts">
import { MonitorData } from '@/shared/interfaces/monitorData.model';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { ChartData } from '@/shared/interfaces/chartData.model';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
	name: 'App',
	components: { Bar },
	props: ['chartData'],

	data() {
		return {
			data: {
				labels: ['label1'],
				datasets: [{ data: [1] }],
			},
			options: {
				responsive: true,
			},
		};
	},

	mounted() {
		// console.log(this.chartData);
	},

	watch: {
		chartData: {
			handler(monitorData: Array<MonitorData>) {
				const newData = { labels: [''], datasets: [{ data: [1] }] };

				monitorData.forEach(row => {
					// console.log(this.data.labels);
					newData.labels.push(row.date);
					// this.data.datasets[0].data.push(10);
					newData.datasets[0].data.push(row.temperatureValue);
				});

				this.data = newData;
			},
			deep: true,
		},
	},
};
</script>
