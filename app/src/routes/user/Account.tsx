import { LoggedInWrapper } from "../../components/LoggedInWrapper";
import { SettingsScreenWrapper } from "./SettingsScreenWrapper";
import { ChangeEvent, ReactElement, useState } from "react";
import { updateAttributes } from "../../app/auth";
import { ICognitoUserAttributeData } from "amazon-cognito-identity-js";

const user = {
    handle: 'tommycooks',
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export const Account = (): ReactElement => {
    // get cognitoUser;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const attributes: ICognitoUserAttributeData[] = [
            {
                Name: 'given_name',
                Value: firstName,
            },
            {
                Name: 'family_name',
                Value: lastName,
            },
            {
                Name: 'email',
                Value: email,
            }
        ];

        await updateAttributes(attributes)
            .catch((error) => console.log(error));
    }

    return (
        <>
            <LoggedInWrapper title="Account settings">
                <SettingsScreenWrapper>
                    <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit} method="POST">
                        <div className="py-6 px-4 sm:p-6 lg:pb-8">
                            <div>
                                <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
                            </div>

                            <div className="mt-6 flex flex-col lg:flex-row">
                                <div className="flex-grow space-y-6">
                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            onChange={(event => setFirstName(event.target.value))}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            onChange={(event => setLastName(event.target.value))}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            onChange={(event => setEmail(event.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                    <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                                        Photo
                                    </p>
                                    <div className="mt-1 lg:hidden">
                                        <div className="flex items-center">
                                            <div
                                                className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                                aria-hidden="true"
                                            >
                                                <img className="rounded-full h-full w-full" src={user.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-5 rounded-md shadow-sm">
                                                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                                    <label
                                                        htmlFor="mobile-user-photo"
                                                        className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                                    >
                                                        <span>Change</span>
                                                        <span className="sr-only"> user photo</span>
                                                    </label>
                                                    <input
                                                        id="mobile-user-photo"
                                                        name="user-photo"
                                                        type="file"
                                                        className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden relative rounded-full overflow-hidden lg:block">
                                        <img className="relative rounded-full w-40 h-40" src={user.imageUrl} alt="" />
                                        <label
                                            htmlFor="desktop-user-photo"
                                            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                                        >
                                            <span>Change</span>
                                            <span className="sr-only"> user photo</span>
                                            <input
                                                type="file"
                                                id="desktop-user-photo"
                                                name="user-photo"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                                <button
                                    type="button"
                                    className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
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
