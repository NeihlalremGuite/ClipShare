import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  comments: [],
};

// Create a slice
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});

// Extract the action creators
export const { addComment, deleteComment } = commentSlice.actions;

// Export the reducer
export default commentSlice.reducer;
