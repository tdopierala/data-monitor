<template>
	<div class="home">
		<h1>{{ name }} hello there</h1>

		<h2>{{ latestTemp }} *C</h2>
		<h2>{{ latestPress }} psi</h2>

		<div>
			<chart-box :chartData="data" />
		</div>

		<table>
			<tr v-for="(row, idx) in data" v-bind:key="row.date + row.temperatureValue">
				<td>{{ idx }}</td>
				<td>{{ row.temperatureValue }}</td>
				<td>{{ row.pressureValue }}</td>
				<td>{{ row.date }}</td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { MonitorData, MonitorDataMock } from '@/shared/interfaces/monitorData.model';
import { defineComponent } from 'vue';
import _ from 'lodash';

import ChartBox from '@/components/ChartBox.vue';

export default defineComponent({
	components: { ChartBox },

	data() {
		return {
			name: 'MonitorView' as string,
			data: MonitorDataMock as Array<MonitorData>,
			latestTemp: 0 as number | undefined,
			latestPress: 0 as number | undefined,
			dataInterval: undefined as number | undefined,

			chartdata: {
				labels: ['1', '2', '3'],
				datasets: [{ data: [0, 1, 2], backgroundColor: '#e23333' }],
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

	mounted() {
		this.generateStartupData();
		this.data = this.getData;
		// console.table(this.data);
		clearInterval(this.dataInterval);
		this.dataInterval = setInterval(() => {
			this.generateData();
			this.data.shift();
			this.latestTemp = _.last(this.data)?.temperatureValue;
			this.latestPress = _.last(this.data)?.pressureValue;
		}, 1000);
	},
});
</script>
