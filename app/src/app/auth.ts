import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession, ICognitoUserAttributeData } from 'amazon-cognito-identity-js'

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
        reject(err);
      } else {
        resolve(session);
      }
    });
  }).catch((err) => {
    throw err;
  });
}
export async function getAttributes(): Promise<any> {
  return new Promise(function (resolve, reject) {
    const user = userPool.getCurrentUser();

    user?.getSession(function (err: any, session: CognitoUserSession) {
      if (err) {
        reject(err);
      } else {
        user.getUserAttributes(function (err: any, attributes: any) {
          if (err) {
            reject(err);
          } else {
            // Directly resolving the attributes turns in a `A non-serializable value was detected in an action, in the path` error
            resolve(attributes.map((attribute: ICognitoUserAttributeData) => {
              return {
                Name: attribute.Name,
                Value: attribute.Value,
              }
            }));
          }
        });
      }
    });
  });
}

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

export async function changePassword(oldPassword: string, newPassword: string) {
  return new Promise(async function (resolve, reject) {
    const user = userPool.getCurrentUser();

    user?.getSession(function (err: any, session: CognitoUserSession) {
      if (err) {
        reject(err);
      } else {
        user.changePassword(oldPassword, newPassword, function (err: any) {
          if (err) {
            reject(err);
          } else {
            resolve('success');
          }
        });
      }
    });
  });
}


export async function updateAttributes(attributes: ICognitoUserAttributeData[]) {
  return new Promise(async function (resolve, reject) {
    const user = userPool.getCurrentUser();

    user?.getSession(function (err: any, session: CognitoUserSession) {
      if (err) {
        reject(err);
      } else {
        user.updateAttributes(attributes, function (err: any) {
          if (err) {
            reject(err);
          } else {
            resolve('success');
          }
        });
      }
    });
  });
}
