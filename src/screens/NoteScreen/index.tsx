import React, { FC, useCallback, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { Colors, Metrics } from '../../assets';
import { useAppSelector } from '../../hooks/useRedux';
import { addFolder } from '../../redux/folder/folderSlice';
import { todayDate } from '../../utils/date';
import { Container } from '../components';
import SearchBar from '../components/SearchBar';
import Footer from './components/Footer';
import Header from './components/Header';
import ListNote from './components/ListNote';

const NoteScreen: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [onChangeTitle, setOnChangeTitle] = useState('');
  const [onChangeStatus, setOnChangeStatus] = useState('');
  const [onChangePriority, setOnChangePriority] = useState('');

  const dispatch = useDispatch();
  const folder = useAppSelector(state => state.reducer.folderReducer);

  const onChangeTitleText = useCallback(
    debounce((text: string) => {
      setOnChangeTitle(text);
    }, 400),
    [],
  );

  const onChangeStatusText = useCallback(
    debounce((text: string) => {
      setOnChangeStatus(text);
    }, 400),
    [],
  );

  const onChangePriorityText = useCallback(
    debounce((text: string) => {
      setOnChangePriority(text);
    }, 400),
    [],
  );

  const onAddNote = useCallback((dataChild: any) => {
    setModalVisible(dataChild);
  }, []);

  const onSaveNote = useCallback(() => {
    const newData = {
      createAt: todayDate(),
      desc: '',
      exist: true,
      id: Date.now(),
      priority: onChangePriority,
      status: onChangeStatus,
      title: onChangeTitle,
    };
    dispatch(addFolder(newData));
    setModalVisible(false);
  }, [onChangePriority, onChangeStatus, onChangeTitle]);

  return (
    <Container
      header={<Header />}
      footer={<Footer title={`${folder.length} notes`} onModal={onAddNote} />}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.txt}>New folder</Text>
              <Text style={styles.txtSmall}>Enter a name for this folder</Text>
            </View>
            <TextInput
              placeholder="Title"
              autoFocus
              onChangeText={onChangeTitleText}
              cursorColor={Colors.tangerineYellow}
              placeholderTextColor={Colors.chacoralGray}
              style={styles.txtInput}
            />
            <TextInput
              placeholder="Status (Todo, Doing, Done)"
              onChangeText={onChangeStatusText}
              cursorColor={Colors.tangerineYellow}
              placeholderTextColor={Colors.chacoralGray}
              style={styles.txtInput}
            />
            <TextInput
              placeholder="Priority (Low, High, Normal)"
              onChangeText={onChangePriorityText}
              cursorColor={Colors.tangerineYellow}
              placeholderTextColor={Colors.chacoralGray}
              style={styles.txtInput}
            />
            <View style={styles.viewBtn}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.txtBtnCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSaveNote} style={styles.btnSave}>
                <Text style={styles.txtBtnSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.txtContainer}>Todo list</Text>
        <SearchBar />
      </View>
      <ListNote data={folder} />
    </Container>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  txtContainer: {
    fontFamily: 'Manrope-ExtraBold',
    color: Colors.white,
    fontSize: 32,
    marginBottom: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Metrics.screen.width - 96,
    height: Metrics.screen.height / 2.4,
    backgroundColor: Colors.neroGray01,
    borderRadius: 12,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtInput: {
    width: '90%',
    height: '13%',
    borderRadius: 8,
    backgroundColor: Colors.neroGray,
    borderColor: Colors.chacoralGray,
    borderWidth: 1,
    paddingLeft: 8,
    color: Colors.white,
  },
  txt: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
  },
  txtSmall: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  viewBtn: {
    width: '100%',
    height: '14%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 0.5,
    borderColor: Colors.chacoralGray,
    flexDirection: 'row',
  },
  btnCancel: {
    flex: 1,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0.5,
    borderColor: Colors.chacoralGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSave: {
    flex: 1,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0.5,
    borderColor: Colors.chacoralGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnCancel: {
    fontSize: 15,
    color: Colors.tangerineYellow,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
  },
  txtBtnSave: {
    fontSize: 15,
    color: Colors.suvarGray,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
  },
});
