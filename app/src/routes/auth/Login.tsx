import { LockClosedIcon } from '@heroicons/react/solid'
import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../App';
import { signInWithEmail } from '../../app/auth';
import { useAppDispatch } from '../../app/hooks';
import MessageBar from '../../components/MessageBar';

interface LoginState {
  message?: {
    type: string;
    text: string;
  },
};

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const state = location.state as LoginState;

  let initialMessageState = {type: '', message: ''};
  if (state?.message) {
    initialMessageState = { type: 'success', message: state.message.text };
  }
  const [message, setMessage] = useState(initialMessageState);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO; Handle redirect for TFA
    await signInWithEmail(username, password)
      .then((response) => dispatch({
        type: 'auth/signedIn',
        payload: 'test'
      }))
      .then(() => navigate(routes.index))
      .catch((error) => {

        if (error.code === 'UserNotConfirmedException') {
          navigate(routes.auth.verify);
        } else if (error.code === 'NewPasswordRequired') {
          navigate(routes.auth.newPassword, {
            state: {
              user: error.user,
              requiredAttributes: error.requiredAttributes,
            },
          });

        } else {
          setMessage({ type: 'error', message: error.message });
        }
      });
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <a href={routes.auth.register} className="font-medium text-teal-600 hover:text-teal-500"> sign up here! </a>
            </p>
          </div>

          {message.type && <MessageBar type={message.type} message={message.message} />}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Email address / username"
                  onChange={(event => setUsername(event.target.value))}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(event => setPassword(event.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href={routes.auth.forgotPassword} className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-teal-500 group-hover:text-teal-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
