import { LoggedInWrapper } from "../components/LoggedInWrapper"

export const Team = () => {
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