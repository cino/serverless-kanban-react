import { LoggedInWrapper } from "../../components/LoggedInWrapper"
import { SettingsScreenWrapper } from "./SettingsScreenWrapper"

export const Password = () => {
    return (
        <>
            <LoggedInWrapper title="Account settings">
                <SettingsScreenWrapper>
                    Password page.
                </SettingsScreenWrapper>
            </LoggedInWrapper>
        </>
    )
}
