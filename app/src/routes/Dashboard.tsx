import { ReactElement } from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';

export const Dashboard = (): ReactElement => {
    return (
        <>
            <LoggedInWrapper>
                <div className="px-4 py-4 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
            </LoggedInWrapper>
        </>
    )
}
