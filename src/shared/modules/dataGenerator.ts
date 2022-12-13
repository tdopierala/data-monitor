import _ from 'lodash';
import moment from 'moment';
import { MonitorData } from '../interfaces/monitorData.model';
import { dateFormat } from '../constant/dateTemplate';

const temp = { min: 1, max: 10 };
const press = { min: 5, max: 10 };

interface Limits {
	min: number;
	max: number;
}

export function limitValue(value: number, limits: Limits = { min: 0, max: 200 }): number {
	return value < limits.min ? limits.min : value > limits.max ? limits.max : value;
}

export function randomizeDirection(): string {
	return _.random(0, 1) ? 'up' : 'down';
}

export function getStartupData(data: Array<MonitorData>) {
	const latestData: MonitorData | undefined = _.last(data);

	if (latestData) {
		const tDirection: string = randomizeDirection();
		const pDirection: string = randomizeDirection();
		const prevTemp: number = latestData.temperatureValue;
		const prevPress: number = latestData.pressureValue;

		const temperatureValue = tDirection === 'up' ? prevTemp + _.random(temp.min, temp.max) : prevTemp - _.random(temp.min, temp.max);
		const pressureValue = pDirection === 'up' ? prevPress + _.random(press.min, press.max) : prevPress - _.random(press.min, press.max);

		return {
			temperatureValue: limitValue(temperatureValue),
			temperatureDirection: tDirection,
			pressureValue: limitValue(pressureValue, { min: 0, max: 300 }),
			pressureDirection: pDirection,
			date: moment(latestData.date).add(1, 'second').format(dateFormat),
		};
	}
}
