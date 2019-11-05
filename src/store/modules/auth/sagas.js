import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert('Autenticação', 'Falha na autenticação, verifique seus dados');

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { email, name, password } = payload;

    yield call(api.post, 'users', {
      email,
      name,
      password,
    });

    NavigationService.navigate('SignIn');
  } catch (err) {
    Alert.alert(
      'Cadastro',
      'Falha ao realizar o cadastro, verifique os dados!'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
]);
