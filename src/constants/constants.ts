import AsyncStorage from '@react-native-async-storage/async-storage';

export const QA_BASE_URL = 'https://qa.onvirtual.cards/proxy/multi/';
export const PROD_BASE_URL = 'https://secure.onvirtual.cards/proxy/multi/';
export const SAND_BASE_URL = 'https://sandbox.onvirtual.cards/proxy/multi/';
export var WEAVR_BASE_URL = QA_BASE_URL;

export const QA_UI_KEY = 'cfE2+PcFh20BbxPI9+IACQ==';
export const PROD_UI_KEY = '6keyUw1XiUkBbjXjgTUACA==';
export const SAND_UI_KEY = 'I1pm4rfquPcBeTaVVFQACA==';

export async function updateBaseURL() {
  const env = await AsyncStorage.getItem('@env');
  switch (env) {
    case 'Production': {
      WEAVR_BASE_URL = PROD_BASE_URL;
      break;
    }
    case 'Sandbox': {
      WEAVR_BASE_URL = SAND_BASE_URL;
      break;
    }

    case 'QA': {
      WEAVR_BASE_URL = QA_BASE_URL;
      break;
    }
  }
}
