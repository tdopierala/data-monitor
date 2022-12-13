<template>
	<v-container>
		<v-row>
			<v-col>
				<div class="d-flex align-center justify-center flex-column flex-sm-row">
					<MonitorCard :latestData="latestTemp" />
					<MonitorCard :latestData="latestPress" />
				</div>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<div class="chart-box">
					<chart-box :data="tempChartData" :options="tempChartOptions" />
				</div>

				<div class="chart-box">
					<chart-box :data="pressChartData" :options="pressChartOptions" />
				</div>
			</v-col>
		</v-row>

		<MonitorTable :monitorData="monitorData" />
	</v-container>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { MonitorData, MonitorDataMock } from '@/shared/interfaces/monitorData.model';
import { defineComponent } from 'vue';
import _ from 'lodash';
import moment from 'moment';

import ChartBox from '@/components/ChartBox.vue';
import MonitorTable from '@/components/MonitorTable.vue';
import MonitorCard from '@/components/MonitorCard.vue';

export default defineComponent({
	components: { ChartBox, MonitorTable, MonitorCard },

	data() {
		return {
			name: 'MonitorView' as string,
			dataInterval: undefined as number | undefined,

			monitorData: MonitorDataMock as Array<MonitorData>,

			latestTemp: 0 as number | undefined,
			latestPress: 0 as number | undefined,

			tempChartData: {
				labels: ['1'],
				datasets: [
					{
						label: 'Temperatura',
						borderColor: '#f87979',
						backgroundColor: '#f87979',
						pointRadius: 0,
						data: [1],
					},
				],
			},

			tempChartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: { min: 0, max: 200 },
					x: { grid: { display: false } },
				},
			},

			pressChartData: {
				labels: ['1'],
				datasets: [
					{
						label: 'Ciśnienie',
						borderColor: '#1C71D8',
						backgroundColor: '#1C71D8',
						pointRadius: 0,
						data: [1],
					},
				],
			},

			pressChartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: { min: 0, max: 300 },
					x: { grid: { display: false } },
				},
			},
		};
	},

	computed: {
		...mapGetters(['getData']),
	},

	methods: {
		...mapActions(['generateStartupData', 'generateData']),

		refresh() {
			this.generateStartupData();
		},
	},

	watch: {
		monitorData: {
			handler(monitorData: Array<MonitorData>) {
				console.log(monitorData);
				console.log('chartData watch');

				const newTempChartData = _.cloneDeep(this.tempChartData);
				const newPressChartData = _.cloneDeep(this.pressChartData);

				newTempChartData.labels = [];
				newTempChartData.datasets[0].data = [];

				newPressChartData.labels = [];
				newPressChartData.datasets[0].data = [];

				monitorData.forEach(row => {
					newTempChartData.labels.push(moment(row.date).format('mm:ss'));
					newTempChartData.datasets[0].data.push(row.temperatureValue);
					newPressChartData.labels.push(moment(row.date).format('mm:ss'));
					newPressChartData.datasets[0].data.push(row.pressureValue);
				});

				this.tempChartData = newTempChartData;
				this.pressChartData = newPressChartData;
			},
			deep: true,
		},
	},

	mounted() {
		if (this.getData.length <= 1) {
			this.generateStartupData();
		}

		this.monitorData = this.getData;

		clearInterval(this.dataInterval);
		this.dataInterval = setInterval(() => {
			this.generateData();
			this.monitorData.shift();
			this.latestTemp = _.last(this.monitorData)?.temperatureValue;
			this.latestPress = _.last(this.monitorData)?.pressureValue;
		}, 1000);
	},

	beforeUnmount() {
		clearInterval(this.dataInterval);
	},
});
</script>

<style scoped lang="scss">
.chart-box {
	height: 300px;
}
</style>
