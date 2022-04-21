import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'

const userPoolId = process.env.REACT_APP_USERPOOL_ID
const clientId = process.env.REACT_APP_CLIENT_ID

const poolData = {
  UserPoolId: `${userPoolId}`,
  ClientId: `${clientId}`,
}

const userPool: CognitoUserPool = new CognitoUserPool(poolData)

export let currentUser: any = userPool.getCurrentUser();

function getCognitoUser(username: string) {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return cognitoUser;
}

export async function getSession() {
  if (!currentUser) {
    currentUser = userPool.getCurrentUser()
  }

  return new Promise(function (resolve, reject) {
    currentUser?.getSession(function (err: any, session: any) {
      if (err) {
        reject(err)
      } else {
        resolve(session)
      }
    });
  }).catch((err) => {
    throw err;
  });
}
export async function getAttributes(): Promise<any> {
  return new Promise(function (resolve, reject) {
    currentUser.getUserAttributes(function (err: any, attributes: any) {
      if (err) {
        reject(err)
      } else {
        resolve(attributes)
      }
    })
  }).catch((err) => {
    throw err
  })
}

// export async function getAuthState(): Promise<AuthState> {
//     try {
//         const session: any = await getSession();
//         const attr: any = await getAttributes();

//         console.log('wat');

//         return {
//             isAuthenticated: true,
//             sessionInfo: {
//                 accessToken: session.getAccessToken().getJwtToken(),
//                 refreshToken: session.getRefreshToken().getToken(),
//                 username: attr[2].getValue(),
//                 email: attr[1].getValue(),
//                 sub: attr[0].getValue(),
//             }
//         }
//         // setSessionInfo({
//         //     accessToken: session.accessToken.jwtToken,
//         //     refreshToken: session.refreshToken.token,
//         // })
//         // setAttrInfo(attr)
//         // setAuthStatus(AuthStatus.SignedIn)
//     } catch (err) {
//         console.log('correct');
//         // setAuthStatus(AuthStatus.SignedOut)
//         return {
//             isAuthenticated: false,
//             sessionInfo: {
//                 accessToken: undefined,
//                 refreshToken: undefined,
//                 username: undefined,
//                 email: undefined,
//                 sub: undefined,
//             }
//         }
//     }
// }

export function signInWithEmail(username: string, password: string): Promise<any> {
  return new Promise(function (resolve, reject) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    currentUser = getCognitoUser(username);
    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
      newPasswordRequired: function (user: any, requiredAttributes: any) {
        reject({
          code: 'NewPasswordRequired',
          user: user,
          requiredAttributes: requiredAttributes,
        });
      },

    })
  });
}

export async function signOut(): Promise<void> {
  return new Promise(function (resolve, reject) {
    currentUser.signOut()

    resolve();
  });
}

export async function completeNewPasswordChallenge(newPassword: string, requiredAttributeData: any) {
  return new Promise(function (resolve, reject) {
    currentUser.completeNewPasswordChallenge(newPassword, requiredAttributeData, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
    })
  })
}

export async function forgotPassword(email: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(email);

    cognitoUser.forgotPassword({
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
      inputVerificationCode: function (data: any) {
        resolve(data);
      },
    })
  });
}

export async function confirmPassword(email: string, verificationCode: string, password: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(email);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
    })
  });
}
