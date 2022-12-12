export class dataGenerator {
	// getStartupData() {
	// }

	/* 	
		generateData() {
		const tDirection: string = _.random(0, 1) ? 'up' : 'down';
		const pDirection: string = _.random(0, 1) ? 'up' : 'down';
		const prevTemp: number = lastData.temperatureValue;
		const prevPress: number = lastData.pressureValue;

		const temperatureValue: number = tDirection === 'up' ? prevTemp + _.random(temp.min, temp.max) : prevTemp - _.random(temp.min, temp.max);
		const pressureValue: number = pDirection === 'up' ? prevPress + _.random(press.min, press.max) : prevPress - _.random(press.min, press.max);

		commit('setData', {
			temperatureValue: temperatureValue > 0 ? temperatureValue : 0,
			temperatureDirection: tDirection,
			pressureValue: pressureValue > 0 ? pressureValue : 0,
			pressureDirection: pDirection,
			date: moment(lastData.date).add(1, 'second').format(dateFormat),
		} as MonitorData);
	} */
}
