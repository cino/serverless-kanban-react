import { ChangeEvent, useState, ReactElement } from 'react';
import { Switch } from '@headlessui/react';
import { LoggedInWrapper } from '../../components/LoggedInWrapper';
import { SettingsScreenWrapper } from './SettingsScreenWrapper';
import { classNames } from '../helpers';
import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js';
import { updateAttributes } from '../../app/auth';

export const Notifications = (): ReactElement => {
    // TODO: Set Initial state based on CurrentUser
    const [issueUpdated, setIssueUpdated] = useState(true)
    const [mentioned, setMentioned] = useState(false)

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const attributes: ICognitoUserAttributeData[] = [
            {
                Name: 'custom:notifyItemUpdated',
                Value: issueUpdated.toString(),
            },
            {
                Name: 'custom:notifyMentioned',
                Value: mentioned.toString(),
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
                        <div className="pt-6 divide-y divide-gray-200">
                            <div className="px-4 sm:px-6">
                                <div>
                                    <h2 className="text-lg leading-6 font-medium text-gray-900">Notifications</h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Here you can manage on what events you'd like to receive <strong>email</strong> notifications.
                                    </p>
                                </div>

                                <ul className="mt-2 divide-y divide-gray-200">
                                    <Switch.Group as="li" className="py-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                Issue updated
                                            </Switch.Label>
                                            <Switch.Description className="text-sm text-gray-500">
                                                Whenever an issue gets updated which you created or assigned to you.
                                            </Switch.Description>
                                        </div>
                                        <Switch
                                            checked={issueUpdated}
                                            onChange={setIssueUpdated}
                                            className={classNames(
                                                issueUpdated ? 'bg-teal-500' : 'bg-gray-200',
                                                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    issueUpdated ? 'translate-x-5' : 'translate-x-0',
                                                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>

                                    <Switch.Group as="li" className="py-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                Mentioned
                                            </Switch.Label>
                                            <Switch.Description className="text-sm text-gray-500">
                                                When someone mentions you in a comment
                                            </Switch.Description>
                                        </div>
                                        <Switch
                                            checked={mentioned}
                                            onChange={setMentioned}
                                            className={classNames(
                                                mentioned ? 'bg-teal-500' : 'bg-gray-200',
                                                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    mentioned ? 'translate-x-5' : 'translate-x-0',
                                                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                </ul>
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
