import moment from 'moment';
import { dateFormat } from '../constant/dateTemplate';

export interface MonitorData {
	temperatureValue: number;
	temperatureDirection: string;
	pressureValue: number;
	pressureDirection: string;
	date: string;
}

export const MonitorDataMock: Array<MonitorData> = [
	{
		temperatureValue: 0,
		temperatureDirection: 'up',
		pressureValue: 0,
		pressureDirection: 'up',
		date: moment().format(dateFormat),
	},
];
