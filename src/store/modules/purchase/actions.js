export function addInstallments(installments) {
  return {
    type: '@purchase/ADD_INSTALLMENTS',
    payload: { installments },
  };
}

export function addTotal(total) {
  console.tron.log(total);
  return {
    type: '@purchase/ADD_TOTAL',
    payload: { total },
  };
}
