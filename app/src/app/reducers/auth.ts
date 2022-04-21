import { createAction, createReducer } from '@reduxjs/toolkit';
import { currentUser } from '../auth';

// export interface UserState {
//   email?: string;
//   signedIn: boolean;
//   emailVerified?: boolean;
//   status?: string
// }

// export const setCredentialsAsync = createAsyncThunk(
//   'user/setCredentials',
//   async () => {
//     const currentSession = await getSession();
//     if (currentSession) {
//       const currentAttributes = await getAttributes();

//       return {
//         signedIn: true,
//         email: currentAttributes[2].getValue(),
//         emailVerified: currentAttributes[1].getValue() === 'true',
//       }
//     }
//     console.log('ok');
//     return {
//       signedIn: false,
//     }
//   }
// );

// export const signOutAsync = createAsyncThunk(
//   'user/signOut',
//   async () => {
//     signOut();

//     return {
//       signedIn: false,
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: 'user',

//   initialState: (): UserState => {
//     return {
//       email: currentUser?.getUsername(),
//       signedIn: currentUser !== undefined && currentUser !== null,
//     };
//   },
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: {

//   },
//   // The `extraReducers` field lets the slice handle actions defined elsewhere,
//   // including actions generated by createAsyncThunk or in other slices.
//   extraReducers: (builder) => {
//     builder
//       .addCase(setCredentialsAsync.fulfilled, (state, action) => {
//         state.signedIn = action.payload.signedIn;
//         state.email = action.payload.email;
//         state.emailVerified = action.payload.emailVerified;

//         console.log(state.email);
//       })
//       .addCase(signOutAsync.fulfilled, (state, action) => {
//         state.signedIn = action.payload.signedIn;
//         state.email = undefined;
//         state.emailVerified = undefined;
//       });
//   },
// });

// export const selectAuth = (state: RootState) => state.auth;

// export const { increment, decrement, incrementByAmount } = authSlice.actions;

// export default authSlice.reducer;

interface AuthStateInterface {
  email?: string;
}

const initialState = {
  email: currentUser?.getUsername() || undefined,
} as AuthStateInterface;

const signedIn = createAction('auth/signedIn');
const signedOut = createAction('auth/signedOut');

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signedIn, (state, action) => {
      state.email = action.payload;
    })
    .addCase(signedOut, (state, action) => {
      state.email = undefined;
    });
});
