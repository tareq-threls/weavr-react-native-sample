import AsyncStorage from '@react-native-async-storage/async-storage';
import {QA_API_KEY, PROD_API_KEY, SAND_API_KEY} from '@env';
export const QA_BASE_URL = 'https://qa.weavr.io/multi/';
export const PROD_BASE_URL = 'https://secure.weavr.io/multi/';
export const SAND_BASE_URL = 'https://sandbox.weavr.io/multi/';
export var WEAVR_BASE_URL = QA_BASE_URL;

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
