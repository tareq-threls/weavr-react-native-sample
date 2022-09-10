import AsyncStorage from '@react-native-async-storage/async-storage';

export const QA_BASE_URL = 'https://qa.onvirtual.cards/proxy/multi/';
export const PROD_BASE_URL = 'https://secure.onvirtual.cards/proxy/multi/';
export const SAND_BASE_URL = 'https://sandbox.onvirtual.cards/proxy/multi/';
export var WEAVR_BASE_URL = QA_BASE_URL;

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
