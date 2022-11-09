import AsyncStorage from '@react-native-async-storage/async-storage';

export const QA_BASE_URL = 'https://qa.weavr.io/multi/';
export const PROD_BASE_URL = 'https://secure.weavr.io/multi/';
export const SAND_BASE_URL = 'https://sandbox.weavr.io/multi/';
export var WEAVR_BASE_URL = QA_BASE_URL;

export const QA_UI_KEY = 'cfE2+PcFh20BbxPI9+IACQ==';
export const PROD_UI_KEY = '6keyUw1XiUkBbjXjgTUACA==';
export const SAND_UI_KEY = 'I1pm4rfquPcBeTaVVFQACA==';
export const SAND_API_KEY = 'pCOJCv7s0Z4Be1QP0zcBCg==';
export const PROD_API_KEY = '';
export const QA_API_KEY = 'VzjKQYLHsAoBbxPI9+IBCQ==';
export var WEAVR_API_KEY = QA_API_KEY;

export async function updateBaseURL() {
  const env = await AsyncStorage.getItem('@env');
  switch (env) {
    case 'Production': {
      WEAVR_BASE_URL = PROD_BASE_URL;
      WEAVR_API_KEY = PROD_API_KEY;
      break;
    }
    case 'Sandbox': {
      WEAVR_BASE_URL = SAND_BASE_URL;
      WEAVR_API_KEY = SAND_API_KEY;
      break;
    }

    case 'QA': {
      WEAVR_BASE_URL = QA_BASE_URL;
      WEAVR_API_KEY = QA_API_KEY;
      break;
    }
  }
}
