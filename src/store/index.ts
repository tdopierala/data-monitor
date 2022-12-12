import { createStore } from 'vuex';
import _ from 'lodash';
import moment from 'moment';
import { MonitorData, MonitorDataMock } from '@/shared/interfaces/monitorData.model';
import { dateFormat } from '@/shared/constant/dateTemplate';

const dataAmount = 100;
const temp = { min: 1, max: 10 };
const press = { min: 5, max: 10 };

export default createStore({
	state: {
		monitorData: MonitorDataMock as Array<MonitorData>,
	},
	getters: {
		getData: state => state.monitorData,
	},
	mutations: {
		setData(state, data: MonitorData) {
			state.monitorData.push(data);
		},
		initData(state, data: Array<MonitorData>) {
			state.monitorData = data;
		},
	},
	actions: {
		generateStartupData({ commit }) {
			const startData: Array<MonitorData> = [];

			for (let i = 0; i < dataAmount; i++) {
				if (startData.length === 0) {
					startData.push({
						temperatureValue: _.random(60, 100),
						temperatureDirection: _.random(0, 1) ? 'up' : 'down',
						pressureValue: _.random(100, 150),
						pressureDirection: _.random(0, 1) ? 'up' : 'down',
						date: moment().subtract(dataAmount, 'seconds').format(dateFormat),
					});
				} else {
					const tDirection: string = _.random(0, 1) ? 'up' : 'down';
					const pDirection: string = _.random(0, 1) ? 'up' : 'down';
					const prevTemp: number = startData[i - 1].temperatureValue;
					const prevPress: number = startData[i - 1].pressureValue;

					const temperatureValue = tDirection === 'up' ? prevTemp + _.random(temp.min, temp.max) : prevTemp - _.random(temp.min, temp.max);
					const pressureValue = pDirection === 'up' ? prevPress + _.random(press.min, press.max) : prevPress - _.random(press.min, press.max);

					startData.push({
						temperatureValue: temperatureValue > 0 ? temperatureValue : 0,
						temperatureDirection: tDirection,
						pressureValue: pressureValue > 0 ? pressureValue : 0,
						pressureDirection: pDirection,
						date: moment(startData[i - 1].date)
							.add(1, 'second')
							.format(dateFormat),
					});
				}
			}

			commit('initData', startData);
		},

		generateData({ commit, state }) {
			const lastData: MonitorData | undefined = _.last(state.monitorData);

			if (lastData) {
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
			}
		},
	},
	modules: {},
});
