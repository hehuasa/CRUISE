
export default {
  namespace: 'mark',

  state: {
    markShow: true,
    data: [],
  },

  effects: {
    *save({ payload }, { put }) {
      yield put({
        type: 'queryData',
        payload,
      });
    },

  },

  reducers: {
    queryData(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    queryMarkShow(state, { payload }) {
      return {
        ...state,
        markShow: payload,
      };
    },
  },
};
