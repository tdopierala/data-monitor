<template>
	<v-table>
		<thead>
			<tr>
				<th class="text-left">No.</th>
				<th class="text-left">data</th>
				<th class="text-left">temperatura</th>
				<th class="text-left">ciśnienie</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(row, idx) in monitorData" v-bind:key="row.date + row.temperatureValue">
				<td>{{ idx + 1 }}</td>
				<td>{{ row.date }}</td>
				<td>{{ row.temperatureValue }}</td>
				<td>{{ row.pressureValue }}</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'MonitorTable',
	props: ['monitorData'],
});
</script>
