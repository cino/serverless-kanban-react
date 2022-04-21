import { LockClosedIcon } from '@heroicons/react/solid'
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../App';
import { forgotPassword } from '../../app/auth';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        await forgotPassword(email)
            .then((response) => console.log(response))
            .then(() => navigate(routes.auth.confirmPassword, { state: { email: email } }));

        console.log(email);

        // handle
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot password</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>
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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={(event => setEmail(event.target.value))}
                                />
                            </div>

                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href={routes.auth.login} className="font-medium text-teal-600 hover:text-teal-500">
                                    Login
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
                                Forgot password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
