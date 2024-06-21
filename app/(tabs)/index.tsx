import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { addUser, removeUser } from '@/src/redux/slices/auth';
import { RootState, useAppDispatch, useSelector } from '@/src/redux/store';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { img } from '@/constants/Link';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const userData = useSelector((state: RootState) => state?.auth.user);
  const [todoData, setTodoData] = useState(userData);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [title, setTitle] = useState<string>(userData[0]?.title);
  const [description, setDescription] = useState<string>(
    userData[0]?.description
  );
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    setTodoData(userData);
  }, [userData]);
  useEffect(() => {
    setTitle(todoData?.filter((item) => item.id === currentId)[0]?.title);
    setDescription(
      todoData?.filter((item) => item.id === currentId)[0]?.description
    );
  }, [currentId]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.container}>
        <Checkbox
          status={item.completed ? 'checked' : 'unchecked'}
          onPress={() => {
            const updatedArray = todoData?.map((items) => {
              if (items.id === item.id) {
                return {
                  ...items,
                  completed: !items.completed,
                };
              }
              return items;
            });
            dispatch(addUser(updatedArray));
          }}
          color={Colors.light.primary}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              { textDecorationLine: item.completed ? 'line-through' : 'none' },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.title,
              { textDecorationLine: item.completed ? 'line-through' : 'none' },
            ]}
          >
            {item.description}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Status:</Text>
            <View
              style={[
                styles.status,
                {
                  backgroundColor: item.completed
                    ? Colors.light.primary
                    : Colors.light.yellow,
                },
              ]}
            >
              <Text
                style={{
                  fontWeight: '600',
                  color: item.completed ? Colors.light.background : '#000',
                }}
              >
                {item.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.innerView}>
          <TabBarIcon
            name='pencil'
            size={25}
            onPress={() => {
              setModalOpen(true);
              setCurrentId(item.id);
            }}
          />
          <View style={{ height: 10, width: 10 }} />
          <TabBarIcon
            name='trash-bin'
            color={Colors.light.error}
            size={25}
            onPress={() => {
              dispatch(removeUser({ id: item.id }));
            }}
          />
        </View>
      </View>
    );
  };

  const onSavePress = () => {
    const updatedArray = todoData?.map((item) => {
      if (item.id === currentId) {
        return {
          id: currentId,
          title: title,
          description: description,
        };
      } else {
        return item;
      }
    });
    setModalOpen(!modalOpen);
    dispatch(addUser(updatedArray));
  };
  return (
    <View style={styles.background}>
      <View style={styles.spacer} />
      <Text style={styles.heading}>My Todo - List</Text>
      {userData?.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            marginTop: 80,
          }}
        >
          <Image
            src={img}
            style={{ height: 300, width: 350 }}
            resizeMode='contain'
          />
          <Text style={styles.title}>No tasks yet!</Text>
        </View>
      ) : (
        <View style={styles.flatlistCon}>
          <FlatList
            data={userData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      )}
      {modalOpen && (
        <Modal
          isVisible={modalOpen}
          hasBackdrop={true}
          onBackdropPress={() => setModalOpen(!modalOpen)}
        >
          <View
            style={{
              backgroundColor: Colors.light.primary,
              padding: 16,
            }}
          >
            <TextInput
              mode='outlined'
              autoCapitalize='none'
              value={title}
              outlineColor={Colors.light.background}
              outlineStyle={styles.textinput}
              activeOutlineColor={Colors.light.primary}
              onChangeText={(value: string) => {
                setTitle(value);
              }}
            />
            <View style={{ height: 10, width: 10 }} />
            <TextInput
              mode='outlined'
              autoCapitalize='none'
              value={description}
              outlineColor={Colors.light.background}
              outlineStyle={styles.textinput}
              activeOutlineColor={Colors.light.primary}
              onChangeText={(value: string) => {
                setDescription(value);
              }}
            />
            <View style={{ height: 10, width: 10 }} />
            <Button
              mode='contained'
              onPress={onSavePress}
              buttonColor={Colors.light.primary}
            >
              Save
            </Button>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    elevation: 8,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    height: 80,
    width: 80,
  },
  background: {
    flex: 1,
    backgroundColor: Colors.light.primary,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  textinput: {
    borderRadius: 5,
    borderWidth: 1,
  },
  label: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 15,
    marginRight: 5,
  },
  status: {
    padding: 5,
    borderRadius: 8,
  },
  flatlistCon: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});
