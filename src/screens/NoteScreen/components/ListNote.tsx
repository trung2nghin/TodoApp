import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';

import { Colors, Metrics } from '../../../assets';
import { Subject } from '../../../types/subject';
import { useDispatch } from 'react-redux';
import {
  completedFolder,
  deleteFolder,
} from '../../../redux/folder/folderSlice';

interface Props {
  data: Array<Subject>;
}

const ListNote: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const { navigate } = useNavigation<any>();

  const deleteItem = (item: Subject) => {
    dispatch(deleteFolder(item.id));
  };

  const complelteItem = (item: Subject) => {
    dispatch(completedFolder(item));
  };

  const onNavDetail = useCallback(
    (index: number) => {
      navigate('DETAIL', {
        noteData: data[index],
      });
    },
    [data],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        style={styles.mgT}
        renderItem={({ item, index }) => {
          let colorPicker =
            item.priority.toUpperCase() === 'LOW'
              ? Colors.neonBlue
              : item.priority.toUpperCase() === 'HIGH'
              ? Colors.red
              : Colors.tangerineYellow;

          const rightSwipe = () => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => deleteItem(item)}
                  activeOpacity={0.6}>
                  <View style={[styles.viewBox, styles.viewBoxRed]}>
                    <Ionicons name="trash" size={24} color={Colors.white} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => complelteItem(item)}
                  activeOpacity={0.6}>
                  <View style={[styles.viewBox, styles.viewBoxBlue]}>
                    <Ionicons
                      name="md-checkmark-sharp"
                      size={24}
                      color={Colors.white}
                    />
                  </View>
                </TouchableOpacity>
              </>
            );
          };

          return (
            <Swipeable
              renderRightActions={rightSwipe}
              overshootRight={false}
              overshootFriction={1}
              childrenContainerStyle={styles.childContainer}
              containerStyle={[
                data.length === 1
                  ? { ...styles.containerSwipable, borderRadius: 8 }
                  : index === 0 && data.length !== 1
                  ? {
                      ...styles.containerSwipable,
                      ...styles.brTop,
                    }
                  : index === data.length - 1
                  ? {
                      ...styles.containerSwipable,
                      ...styles.brBot,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                onPress={() => onNavDetail(index)}
                style={[
                  index === 0
                    ? {
                        ...styles.btnContainer,
                        ...styles.btnContainer0,
                      }
                    : index === data.length - 1
                    ? {
                        ...styles.btnContainer,
                        ...styles.btnContainer01,
                      }
                    : {
                        ...styles.btnContainer,
                        ...styles.btnContainer02,
                      },
                ]}
                activeOpacity={1}>
                <View style={styles.viewBtn}>
                  <View style={styles.viewIC}>
                    <Ionicons
                      name={
                        item.status === 'Done'
                          ? 'checkmark-circle'
                          : item.status === 'Doing'
                          ? 'md-reload-circle'
                          : 'close-circle'
                      }
                      size={16}
                      color={item.status === 'Done' ? Colors.green : Colors.red}
                    />
                    <Text style={styles.txtTitle}>{item.title}</Text>
                  </View>
                  <Ionicons name="pricetag" size={20} color={colorPicker} />
                </View>
                <Text numberOfLines={1} style={styles.txtDesc}>
                  {`${item.createAt}   ${item.desc}`}
                </Text>
              </TouchableOpacity>
            </Swipeable>
          );
        }}
      />
    </View>
  );
};

export default ListNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: Metrics.screen.width - 32,
  },
  btnContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: Colors.neroGray,
  },
  btnContainer0: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 1,
    borderColor: Colors.nightRiderGrey,
  },
  btnContainer01: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  btnContainer02: {
    borderBottomWidth: 1,
    borderColor: Colors.nightRiderGrey,
  },
  containerSwipable: { backgroundColor: Colors.neroGray },
  childContainer: {
    height: Metrics.screen.height / 12,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Metrics.screen.width / 5,
    backgroundColor: Colors.grey,
    height: '100%',
  },
  mgT: { marginTop: 32 },
  viewIC: { flexDirection: 'row', alignItems: 'center' },
  viewBoxRed: { backgroundColor: Colors.red },
  viewBoxBlue: { backgroundColor: Colors.neonBlue },
  txtTitle: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    color: Colors.white,
    marginBottom: 3,
    marginLeft: 6,
  },
  txtDesc: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13.5,
    color: 'white',
  },
  brTop: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  brBot: { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 },
});
