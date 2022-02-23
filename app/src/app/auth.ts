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
    }
    const cognitoUser = new CognitoUser(userData)

    return cognitoUser
}
export async function getSession() {
    if (!currentUser) {
        currentUser = userPool.getCurrentUser()
    }

    return new Promise(function (resolve, reject) {
        currentUser?.getSession(function (err: any, session: any) {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(session)
            }
        })
    }).catch((err) => {
        console.log(err);
        throw err
    })
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
            newPasswordRequired: function (err: any, wtf: any) {
                reject({ code: 'NewPasswordRequired' });
            },
        })
    });
}

export function signOut(): void {
  if (currentUser) {
    currentUser.signOut()
  }
}

export async function completeNewPasswordChallenge(newPassword: string, requiredAttributeData: any) {
    return new Promise(function (resolve, reject) {
        console.log('wat');
        currentUser.completeNewPasswordChallenge(newPassword, requiredAttributeData, {
            onSuccess: function (res: any) {
                console.log(res);
                resolve(res);
            },
            onFailure: function (err: any) {
                console.log(err);
                reject(err);
            },
        })
    })
}
