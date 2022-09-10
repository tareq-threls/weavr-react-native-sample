/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Modal,
  Image,
} from 'react-native';
import {useRef} from 'react';
import Toast from 'react-native-simple-toast';
import {WEAVR_BASE_URL} from '../constants/constants';
import {Routes} from '../App';
import colors from '../utils/material-colors.json';
import {Icon} from '@rneui/themed';
import {SecureCardCVVLabel, SecureCardNumberLabel} from '@weavr/react-native';

export default function Cards({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [cards, setCards] = React.useState<CardItem[] | undefined>();
  const [selectedCard, setSelectedCard] = React.useState<CardItem>();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const labelRef3 = useRef<any>();
  const labelRef4 = useRef<any>();
  const getCards = async () => {
    try {
      const response = await fetch(WEAVR_BASE_URL + 'managed_cards', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + route.params.token.toString(),
        },
      });
      const json = await response.json();
      var newCards: CardItem[] = [];
      console.log(json.cards);
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
      setCards(newCards);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (cards == null) {
      getCards();
    }
  });

  return (
    <View style={{}}>
      {cards?.map(value => (
        <Pressable
          key={value.cardNumber}
          onPress={() => {
            setShowModal(true);
            setTimeout(() => {
              setSelectedCard(value);
              labelRef3.current.deTokenize();
              labelRef4.current.deTokenize();
              console.log('called  the card number');
            }, 1000);
          }}>
          <View
            style={{
              width: '90%',
              height: 'auto',
              margin: 16,
              borderWidth: 1,

              borderRadius: 5,
              borderColor: colors.grey[400],
            }}>
            <Text style={styles.item}>
              {value.cardFirst}******{value.cardLast}
            </Text>
            <Text style={styles.item}>{value.friendlyName}</Text>
            <Text style={styles.item}>{value.currency}</Text>
            <Text style={styles.item}>{value.nameOnCard}</Text>

            <Text
              style={[
                styles.item,
                {position: 'absolute', right: 0, bottom: 0},
              ]}>
              {value.cardBrand}
            </Text>
          </View>
        </Pressable>
      ))}
      <MyModal
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
        }}>
        <Image
          source={require('../assets/bank_card.png')}
          style={{width: '100%', height: '100%'}}
        />
        <View
          style={{
            position: 'absolute',
            top: '42%',
            left: '33%',
          }}>
          <SecureCardNumberLabel
            style={styles.labelBox}
            textColor={colors.grey[100]}
            textSize="18"
            copyOnClick={false}
            copyOnLongClick={true}
            toDetokenize={selectedCard?.cardNumber}
            onDeTokenize={(resp: any) => {
              Toast.show('' + resp.value);
            }}
            onCopyToClipboard={(resp: any) => {
              Toast.show('' + resp.value);
            }}
            ref={labelRef3}
          />
        </View>
        <Text
          style={{
            position: 'absolute',
            top: '70%',
            left: '12%',
            color: colors.grey[100],
          }}>
          {selectedCard?.nameOnCard}
        </Text>
        <View
          style={{
            position: 'absolute',
            top: '67%',
            right: '22%',
            justifyContent: 'flex-end',
          }}>
          <SecureCardCVVLabel
            style={styles.cvvLabelBox}
            textColor={colors.grey[100]}
            textSize="14"
            copyOnClick={false}
            copyOnLongClick={true}
            toDetokenize={selectedCard?.cvv}
            onDeTokenize={(resp: any) => {
              Toast.show('' + resp.value);
            }}
            onCopyToClipboard={(resp: any) => {
              Toast.show('' + resp.value);
            }}
            ref={labelRef4}
          />
        </View>
      </MyModal>
    </View>
  );
}
const MyModal: React.FC<
  React.PropsWithChildren<{
    visible: boolean;
    onCancel: () => void;
  }>
> = ({visible, onCancel, children}) => {
  const [showModal, setShowModal] = React.useState<boolean>(visible);

  React.useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  return (
    <Modal transparent visible={showModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '40%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {children}
          <Pressable
            onPress={() => {
              setShowModal(false);
              onCancel();
            }}
            style={{
              position: 'absolute',
              right: '8%',
              top: '20%',
            }}>
            <View>
              <Icon name="close" color={colors.grey[100]} />
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  item: {
    margin: 8,
  },
  labelBox: {
    width: 200,
    height: 40,
    fontFamily: 'Cochin',
  },
  cvvLabelBox: {
    width: 60,
    height: 40,
    fontFamily: 'Cochin',
  },
});

interface CardItem {
  cardBrand: string;
  nameOnCard: string;
  currency: string;
  cvv: string;
  cardNumber: string;
  friendlyName: string;
  cardFirst: string;
  cardLast: string;
}
