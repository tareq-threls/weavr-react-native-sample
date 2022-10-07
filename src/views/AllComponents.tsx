import {
  SecurePasswordTextField,
  SecureCardPinLabel,
  SecurePasscodeTextField,
  SecureCardPinTextField,
} from '@weavr/react-native';
import React, {useRef} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Routes} from '../App';
export default function AllComponents({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [tv1, setTv1] = React.useState<string | undefined>();
  const [tv2, setTv2] = React.useState<string | undefined>();
  const [tv3, setTv3] = React.useState<string | undefined>();
  const childRef = useRef<any>();
  const childRef2 = useRef<any>();
  const childRef3 = useRef<any>();
  const labelRef = useRef<any>();

  const navigateToCardsPage = () => {
    navigation.navigate(Routes.Cards_Page, {
      token: route.params.token.toString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cusRow}>
        <SecurePasswordTextField
          placeholder="Enter Password"
          placeholderTextColor="#ff0000"
          style={styles.fieldBox}
          color="#fff000"
          background={true}
          onGetTag={(resp: any) => {
            console.log(resp);
          }}
          onCreateToken={(resp: any) => {
            Toast.show('' + resp.value);
            setTv1(resp.value);
          }}
          onFocus={(resp: any) => {
            console.log(resp);
          }}
          onTextChanges={(resp: any) => {
            console.log(resp);
          }}
          ref={childRef}
        />

        <Button
          title="Try"
          onPress={() => {
            childRef.current.createToken();
          }}
        />
      </View>
      <Text>{tv1}</Text>

      <View style={styles.cusRow}>
        <SecurePasscodeTextField
          placeholder="Enter Passcode"
          placeholderTextColor="#000000"
          background={true}
          style={styles.fieldBox}
          color="#fff000"
          onGetTag={(resp: any) => {
            console.log(resp);
          }}
          onCreateToken={(resp: any) => {
            Toast.show('' + resp.value);
            setTv2(resp.value);
          }}
          onFocus={(resp: any) => {
            console.log(resp);
          }}
          onTextChanges={(resp: any) => {
            console.log(resp);
          }}
          ref={childRef2}
        />

        <Button
          title="Try"
          onPress={() => {
            childRef2.current.createToken();
          }}
        />
      </View>
      <Text>{tv2}</Text>

      <View style={styles.cusRow}>
        <SecureCardPinTextField
          placeholder="Enter Card Pin"
          placeholderTextColor="#000000"
          style={styles.fieldBox}
          color="#fff000"
          background={true}
          onGetTag={(resp: any) => {
            console.log(resp);
          }}
          onCreateToken={(resp: any) => {
            Toast.show('' + resp.value);
            setTv3(resp.value);
          }}
          onFocus={(resp: any) => {
            console.log(resp);
          }}
          onTextChanges={(resp: any) => {
            console.log(resp);
          }}
          ref={childRef3}
        />

        <Button
          title="Try"
          onPress={() => {
            childRef3.current.createToken();
          }}
        />
      </View>
      <Text>{tv3}</Text>

      <View style={styles.cusRow}>
        <Text>Card Pin</Text>
        <SecureCardPinLabel
          labelStyle={styles.labelBox}
          style={styles.labelBox}
          textSize="14"
          color="#e4e8e5"
          textColor="#ff0000"
          copyOnClick={false}
          copyOnLongClick={true}
          toDetokenize={tv3}
          onDeTokenize={(resp: any) => {
            Toast.show('' + resp.value);
          }}
          ref={labelRef}
          onCopyToClipboard={(resp: any) => {
            Toast.show('' + resp.value);
          }}
        />
        <Button
          title="Detokenize"
          onPress={() => {
            labelRef.current.deTokenize();
          }}
        />
      </View>

      <View style={styles.cardsBtn}>
        <Button onPress={navigateToCardsPage} title="Cards" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  container: {
    flex: 1,

    justifyContent: 'flex-start',
    margin: 8,
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
    margin: 16,
    width: '80%',
    height: 40,
    marginVertical: 20,
  },
  labelBox: {
    flex: 1,
    margin: 16,
    padding: 8,
    height: 40,
    marginVertical: 20,
  },
  cusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
