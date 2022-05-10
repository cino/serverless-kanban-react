import { createAction, createReducer } from '@reduxjs/toolkit';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { currentUser } from '../auth';

interface AuthStateInterface {
  email?: string;
  firstName?: string;
  lastName?: string;
  notifications?: {
    notifyItemUpdated: boolean;
    notifyMentioned: boolean;
  }
}

const initialState = {
  email: currentUser?.getUsername() || undefined,
} as AuthStateInterface;

const signedIn = createAction('auth/signedIn');
const signedOut = createAction('auth/signedOut');
const setUser = createAction('auth/setUser');

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signedIn, (state, action) => {
      state.email = action.payload;
    })
    .addCase(signedOut, (state, action) => {
      state = {};
    })
    .addCase(setUser, (state, action) => {
      // TODO: fix typing.
      state.firstName = action.payload.find((attribute: CognitoUserAttribute) => attribute.Name === 'given_name')?.Value;
      state.lastName = action.payload.find((attribute: CognitoUserAttribute) => attribute.Name === 'family_name')?.Value;
      state.notifications = {
        notifyItemUpdated: action.payload.find((attribute: CognitoUserAttribute) => attribute.Name === 'custom:notifyItemUpdated')?.Value,
        notifyMentioned: action.payload.find((attribute: CognitoUserAttribute) => attribute.Name === 'custom:notifyMentioned')?.Value,
      };
    });
});
