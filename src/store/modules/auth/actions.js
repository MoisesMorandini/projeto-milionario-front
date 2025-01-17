export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSucess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password, cpf, rg, first_phone, second_phone) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name, email, password, cpf, rg, first_phone, second_phone,
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
