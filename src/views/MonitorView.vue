<template>
	<div class="home">
		<h1>{{ name }} hello there</h1>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('MonitorView');
</script>
