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

export default function UpdatePassword({navigation}: {navigation: any}) {
  const [tagPass1, setTagPass1] = React.useState<string | undefined>();
  const [tagPass2, setTagPass2] = React.useState<string | undefined>();

  const childRef = useRef<any>();
  const childRef2 = useRef<any>();

  //Sdk Should be initialized on Application Create
  React.useEffect(() => {
    initializeUXComponents('QA', 'cfE2+PcFh20BbxPI9+IACQ==')
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }, []);

  //it receives the tokenized password
  const onPassToken = (resp: any) => {
    console.log(resp);

    Toast.show(resp.value);
  };

  //match the inputs of the user of group of components
  const matchValues = () => {
    childRef.current.getTag(); //optional
    childRef2.current.getTag(); //optional

    matchComponents([tagPass1!, tagPass2!]).then((res: any) => {
      console.log('Match components: ' + res);
      Toast.show('Match components: ' + res);
    });
  };

  //create tokens for a group of components
  //trying to figure out another way to crate Group out of components
  const createGroupTokens = () => {
    //we need to pass here the tags we get from the components
    createTokens([tagPass1!, tagPass2!]).then((res: any) => {
      console.log(res);
      console.log(res[tagPass1!]);

      Toast.show(res[tagPass1!]);
    });
  };

  const navigateToNextPage = () => {
    isAssociated().then(res => {
      if (res) {
        navigation.navigate(Routes.All_Components);
      } else {
        Toast.show('You must login first to continue!');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <SecurePasswordTextField
          placeholder="Enter Password"
          style={styles.fieldBox}
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
          placeholderTextColor={colors.brown[300]}
        />

        <SecurePasswordTextField
          placeholder="Confirm Password"
          style={styles.fieldBox}
          color={Colors.transparent}
          background={Platform.OS === 'android' ? false : true}
          onGetTag={(resp: any) => {
            console.log(resp);
            setTagPass2(resp.value);
          }}
          onCreateToken={resp => {
            console.log(resp);
          }}
          onTextChanges={resp => {
            console.log(resp);
          }}
          onFocus={resp => {
            console.log(resp);
          }}
          ref={childRef2}
          placeholderTextColor={colors.pink[200]}
        />
      </View>
      <View style={styles.margin36} />
      <View style={styles.bottomContainer}>
        <Button title="tokenize" onPress={createGroupTokens} />

        <Button title="Check Match" onPress={matchValues} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  margin36: {
    margin: 36,
  },
  bottomContainer: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    margin: 26,
  },

  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },

  fieldBox: {
    width: '95%',
    height: 45,
    marginVertical: 20,
  },
});
