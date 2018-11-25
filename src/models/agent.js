import { getAgentList, editAgent } from '../services/api';

const typing = (data) => {
  const status = { building: 0, idle: 0, ALL: 0, PHYSICAL: 0, VIRTUAL: 0 };
  const sortedData = [
    { type: 'all', name: 'all', data: [] },
    { type: 'physical', name: 'Physical', data: [] },
    { type: 'virtual', name: 'Virtual', data: [] },
  ];
  for (const item of data) {
    switch (item.status) {
      case 'building': status.building += 1; break;
      case 'idle': status.idle += 1; break;
      default: break;
    }
    switch (item.type) {
      case 'physical':
        sortedData.find(value => value.type === 'physical').data.push(item);
        status.PHYSICAL += 1;
        break;
      case 'virtual':
        sortedData.find(value => value.type === 'virtual').data.push(item);
        status.VIRTUAL += 1;
        break;
      default: break;
    }
    sortedData.find(value => value.type === 'all').data.push(item);
    status.ALL += 1;
  }
  return { status, sortedData };
};
export default {
  namespace: 'agent',

  state: {
    status: { building: 0, idle: 0, ALL: 0, PHYSICAL: 0, VIRTUAL: 0 },
    sortedData: [
      { type: 'all', name: 'all', data: [] },
      { type: 'physical', name: 'Physical', data: [] },
      { type: 'virtual', name: 'Virtual', data: [] },
    ],
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(getAgentList, payload);
      const { sortedData, status } = typing(data);
      yield put({
        type: 'queryData',
        payload: sortedData,
      });
      yield put({
        type: 'queryStatus',
        payload: status,
      });
    },
      *editAgent({ payload }, { call, put }){
      const { id, params } = payload;
      yield call(editAgent, ({ id, params }));
      }
  },

  reducers: {
    queryData(state, { payload }) {
      return {
        ...state,
        sortedData: payload,
      };
    },
    queryStatus(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
  },
};
