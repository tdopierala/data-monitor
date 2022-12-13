<template>
	<Line :data="data" :options="options" />
</template>

<script lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default defineComponent({
	name: 'App',
	components: { Line },
	props: ['data', 'options'],
});
</script>
