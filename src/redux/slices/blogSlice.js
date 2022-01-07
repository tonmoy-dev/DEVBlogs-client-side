import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchAllBlogs = createAsyncThunk(
    'blog/fetchAllBlogs',
    async () => {
        const response = await fetch('https://quiet-sierra-31697.herokuapp.com/allBlogs')
            .then(res => res.json())
        return response
    })
export const fetchProgrammingBlogs = createAsyncThunk(
    'blog/fetchProgrammingBlogs',
    async () => {
        const response = await fetch('https://quiet-sierra-31697.herokuapp.com/allBlogs')
            .then(res => res.json())
        return response.filter(blog => blog.blog_catagory === 'programming')
    })
export const fetchCarrierBlogs = createAsyncThunk(
    'blog/fetchCarrierBlogs',
    async () => {
        const response = await fetch('https://quiet-sierra-31697.herokuapp.com/allBlogs')
            .then(res => res.json())
        return response.filter(blog => blog.blog_catagory === 'Carrier')
    })

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        programmingBlogs: [],
        carrierBlogs: [],
        allBlogs:[]
    },

    reducers: {
        addToAllBlogs: (state, { payload }) => {
            state.allBlogs.push(payload)
        },
        addToProgrammingBlogs: (state, { payload }) => {
            state.programmingBlogs.push(payload)
        },
        addToCarrierBlogs: (state, { payload }) => {
            state.carrierBlogs.push(payload);
        },
        /* 
        removeDataFromCarrierBlogs: (state, { payload }) => {
            state.programmingBlogs = state.programmingBlogs.filter(blog => blog.id !== payload.id);
        },
        removeDataFromProgrammingBlogs: (state, { payload }) => {
            state.carrierBlogs = state.carrierBlogs.filter(blog => blog.id !== payload.id);
        }, */
        // Use the PayloadAction type to declare the contents of `action.payload`

        /* incrementByAmount: (state, action) => {
          state.value += action.payload;
        }, */
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    /* extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            });
    }, */

    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
          // Add user to the state array
          state.allBlogs = action.payload;
        })
        builder.addCase(fetchProgrammingBlogs.fulfilled, (state, action) => {
          // Add user to the state array
          state.programmingBlogs = action.payload;
        })
        builder.addCase(fetchCarrierBlogs.fulfilled, (state, action) => {
          // Add user to the state array
          state.carrierBlogs = action.payload;
        })
      }
    
});

export const { addToAllBlogs, addToProgrammingBlogs, addToCarrierBlogs} = blogSlice.actions;

export default blogSlice.reducer;