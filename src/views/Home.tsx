/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {type PropsWithChildren} from 'react';
import colors from '../utils/material-colors.json';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Chip, Divider, Icon, Image} from '@rneui/themed';
import {Routes} from '../App';
import {initializeUXComponents} from '@weavr/react-native';
import {ENV} from '@weavr/react-native/lib/typescript/types/WeavrEnv';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROD_UI_KEY, QA_UI_KEY, SAND_UI_KEY} from '../constants/constants';
const Home = ({navigation}: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedENV, setSelectedENV] = React.useState<ENV>();
  React.useEffect(() => {
    AsyncStorage.getItem('@env').then(env => {
      console.log('ENV:   ' + env);
      switch (env) {
        case 'Production': {
          setSelectedENV('Production');
          initialize('Production', PROD_UI_KEY);
          break;
        }
        case 'Sandbox': {
          setSelectedENV('Sandbox');
          initialize('Sandbox', SAND_UI_KEY);
          break;
        }

        case 'QA': {
          setSelectedENV('QA');
          initialize('QA', QA_UI_KEY);
          break;
        }
      }
    });
  });

  const storeEnv = async (env: string) => {
    try {
      await AsyncStorage.setItem('@env', env);
    } catch (e) {
      console.log('async storage error:  ' + e);
    }
  };
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
    storeEnv(env);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background}>
        <View style={styles.envSelector}>
          <Image
            source={{
              uri: 'https://assets-global.website-files.com/605f2547102fdbbeff1b21e0/60b5fcf89069129d4f1d3758_weavr-logo.png',
            }}
            style={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.nextBtn}>
          <Pressable
            onPress={() => {
              navigateToNextPage();
            }}>
            <View style={styles.margin20}>
              <View style={styles.row}>
                <Text style={styles.btnFontStyle}>UX-Components</Text>
                <Icon name="chevron-right" color="#00aced" />
              </View>
              <Divider
                style={styles.padding5}
                width={1}
                color={colors.blue[700]}
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.envSelectorContainer}>
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}>
            <Text style={styles.envSwitchColor}> Switch ENV</Text>
          </Pressable>
        </View>
      </View>

      <MyModal
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
        }}>
        <View style={styles.modalHeader}>
          <Text style={{color: colors.blue[600]}}>Select Your Environment</Text>
          <Divider width={1.5} />

          <View style={styles.center}>
            <Chip
              title="Production"
              onPress={() => {
                console.log('Icon chip was pressed!');
                setSelectedENV('Production');
                initialize('Production', PROD_UI_KEY);
                setShowModal(false);
              }}
              type={selectedENV === 'Production' ? 'solid' : 'outline'}
              containerStyle={styles.marginVertical15}
            />
            <Chip
              title="Sandbox"
              onPress={() => {
                console.log('Icon chip was pressed!');
                setSelectedENV('Sandbox');
                initialize('Sandbox', SAND_UI_KEY);
                setShowModal(false);
              }}
              type={selectedENV === 'Sandbox' ? 'solid' : 'outline'}
              containerStyle={styles.marginVertical15}
            />
            <Chip
              title="QA"
              onPress={() => {
                console.log('Icon chip was pressed!');
                setSelectedENV('QA');
                initialize('QA', QA_UI_KEY);
                setShowModal(false);
              }}
              type={selectedENV === 'QA' ? 'solid' : 'outline'}
              containerStyle={styles.marginVertical15}
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
      <View style={styles.modalBackground}>
        <View style={styles.modalCardBackground}>
          {children}
          <Pressable
            onPress={() => {
              setShowModal(false);
              onCancel();
            }}
            style={styles.modalCrossPos}>
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
  center: {
    justifyContent: 'center',
  },
  modalCrossPos: {
    position: 'absolute',
    right: '2%',
    top: '2%',
  },
  modalCardBackground: {
    backgroundColor: 'white',
    width: '60%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginVertical15: {
    marginVertical: 15,
  },
  modalHeader: {
    flex: 1,
    margin: 12,
  },
  envSwitchColor: {
    color: 'dodgerblue',
  },
  envSelectorContainer: {
    position: 'absolute',
    right: '05%',
    top: '1.5%',
  },
  padding5: {
    paddingTop: 5,
  },
  btnFontStyle: {
    fontSize: 18,
    color: colors.blue[700],
  },
  row: {
    flexDirection: 'row',
  },
  margin20: {
    margin: 20,
  },
  nextBtn: {
    position: 'relative',
    marginTop: '10%',
    alignItems: 'flex-start',
    flex: 1,
  },
  logo: {
    aspectRatio: 5,
    width: '75%',
  },
  envSelector: {
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'linen',
  },
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
