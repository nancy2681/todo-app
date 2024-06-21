import { addUser } from '../../src/redux/slices/auth';
import { RootState, useAppDispatch } from '../../src/redux/store';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [warningTitle, setWarningTitle] = useState<boolean>(false);
  const [warningDes, setWarningDes] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const userData = useSelector((state: RootState) => state?.auth.user);

  const handleSubmit = () => {
    if (title !== '' && description !== '') {
      setTitle('');
      setDescription('');
      const updatedArr = [
        ...userData,
        {
          id: userData?.length + 1 || 1,
          title: title,
          description: description,
          completed: false,
        },
      ];
      dispatch(addUser(updatedArr));
      navigation.goBack();
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Let's get Started!</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.addTitle}>Add Title</Text>
        <TextInput
          mode='outlined'
          autoCapitalize='none'
          value={title}
          outlineColor={Colors.light.background}
          outlineStyle={styles.textinput}
          activeOutlineColor={Colors.light.primary}
          onChangeText={(value: string) => {
            setTitle(value);
            setWarningTitle(value.trim() === '');
          }}
        />
        {warningTitle && (
          <Text style={styles.warningText}>Field required!</Text>
        )}
        <View style={styles.spacer} />
        <Text style={styles.addTitle}>Add Description</Text>
        <TextInput
          mode='outlined'
          autoCapitalize='none'
          value={description}
          outlineColor={Colors.light.background}
          outlineStyle={styles.textinput}
          activeOutlineColor={Colors.light.primary}
          onChangeText={(value: string) => {
            setDescription(value);
            setWarningDes(value.trim() === '');
          }}
        />
        {warningDes && <Text style={styles.warningText}>Field required!</Text>}
        <View style={styles.spacer} />
        <Button
          mode='contained'
          onPress={handleSubmit}
          buttonColor={Colors.light.primary}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.4,
    backgroundColor: Colors.light.primary,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 80,
  },
  mainContainer: {
    flex: 0.8,
    justifyContent: 'center',
    padding: 16,
  },
  addTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  textinput: {
    borderRadius: 5,
    borderWidth: 1,
  },
  warningText: {
    fontWeight: '600',
    marginTop: 5,
    color: Colors.light.error,
  },
  spacer: {
    height: 30,
    width: 30,
  },
});
