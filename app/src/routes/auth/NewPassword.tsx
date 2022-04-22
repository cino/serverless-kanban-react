import { LockClosedIcon } from '@heroicons/react/solid';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../App';
import { completeNewPasswordChallenge } from '../../app/auth';
import MessageBar from '../../components/MessageBar';
import { validatePassword } from '../helpers';

interface NewPasswordState {
    message?: {
        type: string;
        text: string;
    },
    user?: {
        email: string
    },
    requiredAttributes?: string[],
};

export const NewPassword = (): ReactElement => {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as NewPasswordState;

    let initialMessageState = { type: '', message: '' };
    if (state?.message) {
        initialMessageState = { type: state.message.type, message: state.message.text };
    }

    const [message, setMessage] = useState(initialMessageState);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Actually check if password and passwordRepeat match
        await validatePassword(password, passwordConfirm)
            .then(() => completeNewPasswordChallenge(password, state.requiredAttributes))
            .then(() => navigate(routes.index, {
                state: {
                    message: {
                        type: 'success',
                        text: 'Password successfully changed, you can now login with your new password.'
                    }
                }
            }))
            .catch((error) => setMessage({ type: 'error', message: error }));

    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Before you can login a new password is required</h2>
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
                                    type="email"
                                    autoComplete="email"
                                    required
                                    disabled
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={state?.user?.email}
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
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(event => setPassword(event.target.value))}
                                />
                            </div>
                            <div>
                                <label htmlFor="password_confirm" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password_confirm"
                                    name="password_confirm"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm password"
                                    onChange={(event => setPasswordConfirm(event.target.value))}
                                />
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
                                Update password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
