import { ReactElement } from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';

export const Team = (): ReactElement => {
    return (
        <>
            <LoggedInWrapper>
                <div className="px-4 py-4 sm:px-0">
                    Team view
                </div>
            </LoggedInWrapper>
        </>
    )
}
