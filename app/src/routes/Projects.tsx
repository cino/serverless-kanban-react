import { ReactElement } from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';

export const Projects = (): ReactElement => {
    return (
        <>
            <LoggedInWrapper>
                <div className="px-4 py-4 sm:px-0">
                    Projects view
                </div>
            </LoggedInWrapper>
        </>
    )
}
