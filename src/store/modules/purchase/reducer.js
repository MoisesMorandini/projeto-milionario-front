import produce from 'immer';

const INITIAL_STATE = {
  installments: null,
  total: null,
};

export default function purchase(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@purchase/ADD_INSTALLMENTS': {
        draft.installments = action.payload.installments;
        break;
      }
      case '@purchase/ADD_TOTAL': {
        draft.total = action.payload.total;
        break;
      }

      default:
        return state;
    }
  });
}
