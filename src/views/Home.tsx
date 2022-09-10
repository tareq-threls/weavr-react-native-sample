/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {type PropsWithChildren} from 'react';
import colors from '../utils/material-colors.json';

import {
  Alert,
  Button,
  ColorValue,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Center from '../widgets/Center';
import {Chip, Divider, Icon, Image} from '@rneui/themed';
import {Routes} from '../App';
import {initializeUXComponents} from '@weavr/react-native';
import {ENV} from '@weavr/react-native/lib/typescript/types/WeavrEnv';
import Toast from 'react-native-simple-toast';

const Home = ({navigation}: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedENV, setSelectedENV] = React.useState<string>();
  const navigateToNextPage = () => {
    if (selectedENV != null) {
      navigation.navigate(Routes.Sign_In);
    } else {
      Toast.show('You must select a Env first!');
    }
  };

  const initialize = (env: ENV, uiKey: string) => {
    initializeUXComponents(env, uiKey)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'linen',
        }}>
        <View
          style={{
            position: 'relative',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '20%',
          }}>
          <Image
            source={{
              uri: 'https://assets-global.website-files.com/605f2547102fdbbeff1b21e0/60b5fcf89069129d4f1d3758_weavr-logo.png',
            }}
            style={{
              aspectRatio: 5,
              width: '75%',
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View
          style={{
            position: 'relative',

            marginTop: '10%',
            alignItems: 'flex-start',
            flex: 1,
          }}>
          <Pressable
            onPress={() => {
              navigateToNextPage();
            }}>
            <View style={{margin: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 18, color: colors.blue[700]}}>
                  UX-Components
                </Text>
                <Icon name="chevron-right" color="#00aced" />
              </View>
              <Divider
                style={{paddingTop: 5}}
                width={1}
                color={colors.blue[700]}
              />
            </View>
          </Pressable>
        </View>

        <View style={{position: 'absolute', right: '05%', top: '1.5%'}}>
          <Pressable
            onPress={() => {
              console.log('Pressed on the fu');
              setShowModal(true);
            }}>
            <Text style={{color: 'dodgerblue'}}> Switch ENV</Text>
          </Pressable>
        </View>
      </View>

      <MyModal
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
        }}>
        <View style={{flex: 1, margin: 12}}>
          <Text style={{color: colors.blue[600]}}>Select Your Environment</Text>
          <Divider width={1.5} />

          <View>
            <Chip
              title="Production"
              onPress={() => {
                console.log('Icon chip was pressed!');
                setSelectedENV('production');
                initialize('Production', '6keyUw1XiUkBbjXjgTUACA==');
              }}
              type={selectedENV === 'production' ? 'solid' : 'outline'}
              containerStyle={{marginVertical: 15}}
            />
            <Chip
              title="Sandbox"
              onPress={() => {
                console.log('Icon chip was pressed!');
                setSelectedENV('sandbox');
                initialize('Sandbox', 'I1pm4rfquPcBeTaVVFQACA==');
              }}
              type={selectedENV === 'sandbox' ? 'solid' : 'outline'}
              containerStyle={{marginVertical: 15}}
            />
            <Chip
              title="QA"
              onPress={() => {
                console.log('Icon chip was pressed!');
                setSelectedENV('qa');
                initialize('QA', 'cfE2+PcFh20BbxPI9+IACQ==');
              }}
              type={selectedENV === 'qa' ? 'solid' : 'outline'}
              containerStyle={{marginVertical: 15}}
            />
          </View>
        </View>
      </MyModal>
    </SafeAreaView>
  );
};

const MyModal: React.FC<
  PropsWithChildren<{
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
            backgroundColor: 'white',
            width: '60%',
            height: '30%',
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
              right: '2%',
              top: '2%',
            }}>
            <View>
              <Icon name="close" />
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
