import {WEAVR_API_KEY, WEAVR_BASE_URL} from '../constants/constants';
import {CardItem} from '../models/CardItem';
import {updateBaseURL} from '../constants/constants';

//Just a login function
const loginAsync = async (password?: string, emailAddress?: string) => {
  try {
    await updateBaseURL();
    console.log(WEAVR_BASE_URL);
    const response = await fetch(WEAVR_BASE_URL + 'login_with_password', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'api-key': WEAVR_API_KEY,
      },
      body: JSON.stringify({
        email: emailAddress ? emailAddress : 'gary@test.com',
        password: {value: password},
      }),
    });

    if (!response.ok) {
      throw new Error('Response code: ' + response.status);
    }

    const json = await response.json();

    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Just a logout function
const logoutAsync = async (bearerToken: string) => {
  try {
    await updateBaseURL();
    console.log(WEAVR_BASE_URL);
    const response = await fetch(WEAVR_BASE_URL + 'logout', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'api-key': WEAVR_API_KEY,
        Authorization: 'Bearer ' + bearerToken,
      },
    });

    if (!response.ok) {
      throw new Error('Response code: ' + response.status);
    }

    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCardsAsync = async (token: string) => {
  try {
    await updateBaseURL();
    const response = await fetch(WEAVR_BASE_URL + 'managed_cards', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
        'api-key': WEAVR_API_KEY,
      },
    });
    const json = await response.json();
    var newCards: CardItem[] = [];
    console.log(json.cards);
    if (json.cards === undefined) {
      return newCards;
    }

    json.cards.forEach((element: any) => {
      newCards.push({
        cardBrand: element.cardBrand,
        cardFirst: element.cardNumberFirstSix,
        cardLast: element.cardNumberLastFour,
        currency: element.currency,
        cardNumber: element.cardNumber.value,
        cvv: element.cvv.value,
        nameOnCard: element.nameOnCard,
        friendlyName: element.friendlyName,
      });
    });
    console.log(newCards);
    return newCards;
  } catch (error) {
    console.error(error);
  }
};

export {loginAsync, logoutAsync, getCardsAsync};
