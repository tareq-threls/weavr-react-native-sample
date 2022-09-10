/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import {
  initializeUXComponents,
  isAssociated,
  setUserToken,
  clearCache,
  SecurePasswordTextField,
  matchComponents,
  createTokens,
} from '@weavr/react-native';
import {useRef} from 'react';
import Toast from 'react-native-simple-toast';
import {WEAVR_BASE_URL} from '../constants/constants';
import {Routes} from '../App';
import colors from '../utils/material-colors.json';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function SignIn({navigation}: {navigation: any}) {
  const [tagPass1, setTagPass1] = React.useState<string | undefined>();
  const [tagPass2, setTagPass2] = React.useState<string | undefined>();
  const [loginToken, setLoginToken] = React.useState<string | undefined>();

  const [password, setPassword] = React.useState<string | undefined>();
  const [emailAddress, setEmailAddress] = React.useState<string | undefined>();

  const childRef = useRef<any>();
  const childRef2 = useRef<any>();

  //Sdk Should be initialized on Application Create
  // React.useEffect(() => {
  //   initializeUXComponents('QA', 'cfE2+PcFh20BbxPI9+IACQ==')
  //     .then(res => console.log(res))
  //     .catch(e => console.log(e));
  // }, []);

  //It checks wheather our sdk is associated with a user or not
  const isAssociatedFunc = () => {
    console.log('called func');
    isAssociated().then((res: Boolean) => {
      console.log(res);
      Toast.show('' + res);
    });
  };

  //clears the cache of the sdk, If you clear the cache you must re initialize sdk
  const clearCacheFunc = () => {
    clearCache().then((res: any) => {
      console.log(res);
      Toast.show(res);
    });
  };

  //it associate a user into sdk
  const setUserTokenInSDK = (token: string) => {
    console.log('set User token: ' + token);
    setUserToken(token).then((res: any) => {
      console.log(res);
      Toast.show(res);
    });
  };

  const createToken1 = () => {
    childRef.current.createToken();
  };

  //it receives the tokenized password
  const onPassToken = (resp: any) => {
    console.log(resp);
    setPassword(resp.value);
    Toast.show(resp.value);
  };

  //Just a login function
  const loginApiAsync = async () => {
    try {
      const response = await fetch(WEAVR_BASE_URL + 'login_with_password', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress ? emailAddress : 'gary@test.com',
          password: {value: password},
        }),
      });
      const json = await response.json();

      console.log(json);
      setLoginToken(json.token);
      setUserTokenInSDK(json.token);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToNextPage = () => {
    isAssociated().then(res => {
      if (res) {
        navigation.navigate(Routes.All_Components, {token: loginToken});
      } else {
        Toast.show('You must login first to continue!');
      }
    });
  };

  const navigateToUpdatePasswordPage = () => {
    navigation.navigate(Routes.Update_Password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput
          placeholder="Enter mail address"
          placeholderTextColor={colors.bluegrey[400]}
          style={styles.input}
          onChangeText={setEmailAddress}
        />
        <View style={styles.input}>
          <SecurePasswordTextField
            placeholder="Enter Password"
            style={[styles.fieldBox]}
            textSize="16"
            background={false} //here default behaviour is system default
            onCreateToken={onPassToken}
            onGetTag={(resp: any) => {
              console.log(resp);
              setTagPass1(resp.value);
            }}
            onTextChanges={resp => {
              console.log(resp);
            }}
            onFocus={resp => {
              console.log(resp);
            }}
            ref={childRef}
            placeholderTextColor={colors.bluegrey[400]}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button title="tokenize" onPress={createToken1} />

        <View style={styles.row}>
          <Button title="isAssociated" onPress={isAssociatedFunc} />

          <Button title="Login" onPress={loginApiAsync} />

          <Button title="U.Password" onPress={navigateToUpdatePasswordPage} />
        </View>

        <Button title="Next" onPress={navigateToNextPage} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bottomContainer: {
    margin: 8,
    alignItems: 'center',
  },
  topContainer: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    height: 45,
    width: '95%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.grey[300],
    backgroundColor: colors.amber[300],
    fontSize: 16,
    fontWeight: Platform.OS === 'android' ? 'semi-bold' : '600',
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 26,
  },

  fieldBox: {
    width: '95%',
    height: 45,
    marginStart: 8,
    position: 'absolute',
  },
});
