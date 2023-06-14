import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import BaseScreen from '../../global/baseScreen';
import topography from '../../global/typography';
import theme from '../../global/theme';
import CustomHeaderSlim from '../../components/CustomHeaderSlim';
import {SvgXml} from 'react-native-svg';
import {CameraIcon} from '../../assets';
import CustomButton from '../../components/CustomButton';
import {saveCardService} from '../../services';
import CreditCard from '../../components/CreditCard';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

function NewCard(): JSX.Element {
  const [createdNewCard, setCreatedNewCard] = useState<CardData | null>(null);
  const navigation = useNavigation();

  const schema = yup.object().shape({
    name: yup.string().required('Nome do titular é obrigatório'),
    number: yup.string().required('Número do cartão é obrigatório'),
    cvv: yup.string().required('Código de segurança é obrigatório'),
    validate: yup
      .string()
      .required('Vencimento é obrigatório')
      .matches(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'Vencimento inválido'),
    typeCard: yup.string(),
  });

  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      number: '',
      cvv: '',
      validate: '',
      typeCard: '',
    },
  });

  const onSubmit = async (data: any) => {
    const cardData: CardData = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
      cvv: data.cvv,
      validate: data.validate,
      typeCard: typeCreditCard() as 'black' | 'green',
    };
    await saveCardService.saveCard(cardData);
    setCreatedNewCard(cardData);
    reset();
  };

  const creditCardMask = (value: string) => {
    let maskedText = value.replace(/\D/g, '');
    maskedText = maskedText.replace(/(\d{4})(?=\d)/g, '$1 ');

    return maskedText;
  };

  const validateMask = (value: string) => {
    let maskedText = value.replace(/\D/g, '');
    maskedText = maskedText.replace(/(\d{2})(\d{2})/, '$1/$2');

    return maskedText;
  };

  const typeCreditCard = () => {
    const typeCard = ['black', 'green'];
    const ramdomIndex = Math.floor(Math.random() * typeCard.length);
    return typeCard[ramdomIndex];
  };

  const handleContinue = async () => {
    navigation.navigate({name: 'MyCards'} as never);
  };

  return (
    <BaseScreen>
      <View style={styles.container}>
        <CustomHeaderSlim title="cadastro" />
        <View style={styles.body}>
          <Text style={[topography.h1, styles.title]}>Wallet Test</Text>
          {!createdNewCard && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[topography.small, styles.label]}>
                  Número do cartão
                </Text>
                <View style={styles.viewInputCardNumber}>
                  <Controller
                    control={control}
                    name="number"
                    render={({field: {onChange, onBlur, value}}) => (
                      <View>
                        <TextInput
                          style={[
                            topography.paragraph,
                            styles.input,
                            styles.inputCardNumber,
                          ]}
                          onBlur={onBlur}
                          onChangeText={text => onChange(creditCardMask(text))}
                          value={value}
                          keyboardType="numeric"
                          maxLength={19}
                        />
                        {errors.number && (
                          <Text style={styles.error}>
                            {errors.number.message}
                          </Text>
                        )}
                      </View>
                    )}
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
                <Controller
                  control={control}
                  name="name"
                  render={({field: {onChange, onBlur, value}}) => (
                    <View>
                      <TextInput
                        style={[topography.paragraph, styles.input]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.name && (
                        <Text style={styles.error}>{errors.name.message}</Text>
                      )}
                    </View>
                  )}
                />
              </View>
              <View style={styles.containerMiniIputs}>
                <View style={styles.inputContainer}>
                  <Text style={[topography.small, styles.label]}>
                    Vencimento
                  </Text>
                  <Controller
                    control={control}
                    name="validate"
                    render={({field: {onChange, onBlur, value}}) => (
                      <View>
                        <TextInput
                          style={[
                            topography.paragraph,
                            styles.input,
                            styles.miniInput,
                          ]}
                          onBlur={onBlur}
                          onChangeText={text => onChange(validateMask(text))}
                          value={value}
                          placeholder="00/00"
                          keyboardType="numeric"
                          maxLength={5}
                        />
                        {errors.validate && (
                          <Text style={styles.error}>
                            {errors.validate.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={[topography.small, styles.label]}>
                    Código de segurança
                  </Text>
                  <Controller
                    control={control}
                    name="cvv"
                    render={({field: {onChange, onBlur, value}}) => (
                      <View>
                        <TextInput
                          style={[
                            topography.paragraph,
                            styles.input,
                            styles.miniInput,
                          ]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="***"
                          keyboardType="numeric"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <Text style={styles.error}>{errors.cvv.message}</Text>
                        )}
                      </View>
                    )}
                  />
                </View>
              </View>
              <CustomButton
                textButton="avançar"
                onClick={handleSubmit(onSubmit)}
                typeButton={!isValid ? 'disabled' : 'primary'}
                disabled={!isValid}
              />
            </View>
          )}
          {createdNewCard && (
            <View style={styles.success}>
              <Text style={[topography.h4, styles.title]}>
                cartão cadastrado com sucesso
              </Text>
              <CreditCard card={createdNewCard} />
              <CustomButton
                textButton="avançar"
                onClick={() => handleContinue()}
                typeButton={'primary'}
              />
            </View>
          )}
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
  form: {
    width: 310,
    justifyContent: 'center',
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
    justifyContent: 'space-between',
  },
  success: {},
  creditCard: {
    width: 300,
    height: 180,
    borderRadius: 16,
    paddingTop: 30,
    paddingLeft: 15,
    marginBottom: 30,
  },
  error: {
    color: theme.alert.red,
    fontSize: 13,
  },
});

export default NewCard;
