import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getAttributes, getSession, signOut } from './auth';

export interface UserState {
    email?: string;

    signedIn: boolean;
    emailVerified?: boolean;

    status?: string
}

const initialState: UserState = {
    signedIn: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const setCredentialsAsync = createAsyncThunk(
    'user/setCredentials',
    async () => {
        const currentSession = await getSession();
        if (currentSession) {
            const currentAttributes = await getAttributes();

            return {
                signedIn: true,
                email: currentAttributes[2].getValue(),
                emailVerified: currentAttributes[1].getValue() === 'true',
            }
        }

        return {
            signedIn: false,
        }
    }
);

export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async () => {
         signOut();

        return {
            signedIn: false,
        }
    }
);

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(setCredentialsAsync.fulfilled, (state, action) => {
                state.signedIn = action.payload.signedIn;
                state.email = action.payload.email;
                state.emailVerified = action.payload.emailVerified;

                console.log(state.email);
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.signedIn = action.payload.signedIn;
                state.email = undefined;
                state.emailVerified = undefined;
            });
    },
});

export const selectAuth = (state: RootState) => state.auth;

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
