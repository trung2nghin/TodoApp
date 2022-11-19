import { createSlice } from '@reduxjs/toolkit';
import { data } from '../../api/data';

export const folderSlice = createSlice({
  name: 'folder',
  initialState: data,
  reducers: {
    addFolder: (state, action) => {
      state = [...state, action.payload];
      return state.reverse();
    },
    editFolder: (state, action) => {
      state.map(x => {
        if (x.id === action.payload.id) {
          x.desc = action.payload.desc;
          return x;
        }
        return x;
      });
    },
    searchFolder: (state, action) => {
      return action.payload
        ? state.filter(x => {
            const itemData = x.title.toUpperCase();
            const textData = String(action.payload).toUpperCase();
            return itemData.indexOf(textData) > -1;
          })
        : data;
    },
    deleteFolder: (state, action) => {
      return state.filter(x => x.id !== action.payload);
    },
    completedFolder: (state, action) => {
      state.map(x => {
        if (x.id === action.payload.id) {
          x.status = 'Done';
          return x;
        }
        return x;
      });
    },
  },
});

export const {
  addFolder,
  deleteFolder,
  editFolder,
  searchFolder,
  completedFolder,
} = folderSlice.actions;

export default folderSlice.reducer;
