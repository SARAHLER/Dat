import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { sortItemsdata } from './dataOperations'; 
import axios from 'axios'

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get('/angular_react_Response.json');
    if (response.status === 200) {
      const filteredData = sortItemsdata(response.data.results);
      return filteredData;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw error;
  }
});
export const updateItem = createAsyncThunk('data/updateItem', async ({ item, editedTitle, previousTitle }) => {
  try {
    if (editedTitle !== item.Title) {
      const response = await axios.put(`/angular_react_Response.json/${item.imdbID}`, { Title: editedTitle });
      if (response.status === 200) {
        return { imdbID: item.imdbID, editedTitle };
      } else {
        throw new Error('Failed to update item');
      }
    } else {
      return { imdbID: item.imdbID, editedTitle: item.Title };
    }
  } catch (error) {
    console.error('Failed to update item:', error);
    throw error;
  }
});

export const updateFilteredItems = createAction('data/updateFilteredItems', (filteredItems) => ({
  payload: filteredItems,
}));

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    loading: false,
    items: [],
    error: null,
    searchTerm: '',
    filteredItems: [], 
    sortOrder: 'asc',  
    previousItemTitle: '',

  },
  reducers: {
    fetchDataRequest: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    
      if (state.searchTerm) {
        state.filteredItems = state.items.filter((item) => {  

          const { Title, Year } = item;   

          return (
            Title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            Year.toLowerCase().includes(state.searchTerm.toLowerCase())
          );

        });
      
      } else {
        state.filteredItems = [];
      }
      state.error = null;
    },
    
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      console.log("state",state);

    },

    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredItems = [];
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    setPreviousItemTitle: (state, action) => {
      state.previousItemTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.error.message;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const { imdbID, editedTitle } = action.payload;
        state.items = state.items.map((item) =>
          item.imdbID === imdbID ? { ...item, Title: editedTitle } : item
        );
       state.previousItemTitle = editedTitle;
      })
      .addCase(updateFilteredItems, (state, action) => {
        console.log("Filtered items:", action.payload);

        state.filteredItems = action.payload;
      });
      
      
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  sortItem,
  sortItemsByName,
  clearSearch,
  toggleSortOrder,
  setPreviousItemTitle,
  setSearchTerm 
} = dataSlice.actions;

export default dataSlice.reducer;