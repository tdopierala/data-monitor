<template>
	<v-card title="Temperatura" max-width="500" class="ma-2 pa-5 w-50 text-center">
		<div class="text-h2 font-weight-bold">{{ latestData }} &deg;C</div>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MonitorCard',
	props: ['latestData'],
});
</script>
