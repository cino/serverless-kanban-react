import { ChangeEvent, useState, ReactElement } from 'react';
import { changePassword } from "../../app/auth";
import { LoggedInWrapper } from "../../components/LoggedInWrapper"
import MessageBar from "../../components/MessageBar";
import { validatePassword } from "../helpers";
import { SettingsScreenWrapper } from "./SettingsScreenWrapper"

export const Password = (): ReactElement => {
    let initialMessageState = { type: '', message: '' };

    const [message, setMessage] = useState(initialMessageState);
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(initialMessageState);

        await validatePassword(password, passwordConfirm)
            .then(() => changePassword(currentPassword, passwordConfirm))
            .catch((error) => {
                setMessage({ type: 'error', message: error.message });
            });
    }

    return (
        <>
            <LoggedInWrapper title="Account settings">
                <SettingsScreenWrapper>
                    <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit} method="POST">
                        <div className="py-6 px-4 sm:p-6 lg:pb-8">
                            <div>
                                <h2 className="text-lg leading-6 font-medium text-gray-900">Password</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    To change your password please enter your current password and a new password.
                                </p>
                            </div>

                            {message.type && <MessageBar type={message.type} message={message.message} />}

                            <div className="mt-6 grid grid-cols-12 gap-6">
                                <div className="col-span-12 sm:col-span-6">
                                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="current-password"
                                        id="current-password"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                        onChange={(event => setCurrentPassword(event.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-12 gap-6">
                                <div className="col-span-12 sm:col-span-6">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                        onChange={(event => setPassword(event.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-12 gap-6">
                                <div className="col-span-12 sm:col-span-6">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                        onChange={(event => setPasswordConfirm(event.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 py-4">
                                <button
                                    type="submit"
                                    className="bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>

                </SettingsScreenWrapper>
            </LoggedInWrapper>
        </>
    )
}
