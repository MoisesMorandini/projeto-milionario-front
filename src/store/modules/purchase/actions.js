export function addInstallments(installments) {
  return {
    type: '@purchase/ADD_INSTALLMENTS',
    payload: { installments },
  };
}

export function addTotal(total) {
  return {
    type: '@purchase/ADD_TOTAL',
    payload: { total },
  };
}
