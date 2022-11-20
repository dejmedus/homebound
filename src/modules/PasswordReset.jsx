import Userfront from "@userfront/react";

const PasswordReset = () => {

    const PasswordResetForm = Userfront.build({
        toolId: process.env.REACT_APP_RESET
    });

    return (
        <>
            <PasswordResetForm />
        </>
    )
}

export default PasswordReset