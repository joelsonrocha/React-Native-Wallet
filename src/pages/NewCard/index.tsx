/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import BaseScreen from '../../global/baseScreen';
import topography from '../../global/typography';
import theme from '../../global/theme';
import CustomHeaderSlim from '../../components/CustomHeaderSlim';
import {SvgXml} from 'react-native-svg';
import {CameraIcon} from '../../assets';
import CustomButton from '../../components/CustomButton';

function NewCard(): JSX.Element {
  const [cardNumber, setCardNumber] = useState('');
  const [personName, setPersonName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const saveCard = async () => {
    console.log('salvar cartão');
  };

  useEffect(() => {
    if (cardNumber && personName && dueDate && securityCode) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [cardNumber, personName, dueDate, securityCode]);

  return (
    <BaseScreen>
      <View style={styles.container}>
        <CustomHeaderSlim title="cadastro" />
        <View style={styles.body}>
          <Text style={[topography.h1, styles.title]}>Wallet Test</Text>

          <View style={styles.inputContainer}>
            <Text style={[topography.small, styles.label]}>
              Número do cartão
            </Text>
            <View style={styles.viewInputCardNumber}>
              <TextInput
                style={[
                  topography.paragraph,
                  styles.input,
                  styles.inputCardNumber,
                ]}
                onChangeText={setCardNumber}
                value={cardNumber}
                keyboardType="numeric"
                maxLength={16}
              />
              <View style={styles.elipse}>
                <SvgXml xml={CameraIcon} />
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[topography.small, styles.label]}>
              Nome do titular do cartão
            </Text>
            <TextInput
              style={[topography.paragraph, styles.input]}
              onChangeText={setPersonName}
              value={personName}
              keyboardType="default"
              maxLength={16}
            />
          </View>
          <View style={styles.containerMiniIputs}>
            <View style={styles.inputContainer}>
              <Text style={[topography.small, styles.label]}>Vencimento</Text>
              <TextInput
                style={[topography.paragraph, styles.input, styles.miniInput]}
                onChangeText={setDueDate}
                value={dueDate}
                placeholder="00/00"
                keyboardType="numeric"
                maxLength={16}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[topography.small, styles.label]}>
                Código de segurança
              </Text>
              <TextInput
                style={[topography.paragraph, styles.input, styles.miniInput]}
                onChangeText={setSecurityCode}
                value={securityCode}
                placeholder="***"
                keyboardType="numeric"
                maxLength={16}
              />
            </View>
          </View>
          <CustomButton
            textButton="avançar"
            onClick={() => saveCard()}
            typeButton={disableButton ? 'disabled' : 'primary'}
            disabled={disableButton}
          />
        </View>
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: theme.baseColor.blueDark,
    justifyContent: 'flex-start',
  },
  title: {
    color: theme.textColor.white,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  subtitle: {
    color: theme.baseColor.greenLight,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    marginBottom: 22,
  },
  label: {
    color: theme.textColor.grey,
    marginBottom: 4,
    height: 29,
  },
  input: {
    width: 310,
    height: 45,
    borderRadius: 6,
    backgroundColor: theme.baseColor.greyLight,
    borderColor: theme.baseColor.greyLight,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  miniInput: {
    width: 145,
  },
  inputCardNumber: {
    position: 'relative',
    paddingLeft: 52,
    fontFamily: 'PT Sans',
  },
  viewInputCardNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elipse: {
    width: 32,
    height: 32,
    backgroundColor: theme.baseColor.blueLight,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 6,
    top: 6,
  },
  containerMiniIputs: {
    width: 310,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default NewCard;
