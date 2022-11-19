import Userfront from "@userfront/react";

const PasswordReset = () => {

    const PasswordResetForm = Userfront.build({
        toolId: process.env.REACT_APP_RESET
    });

    return (
        <>
            <h2>Password Reset</h2>
            <PasswordResetForm />
        </>
    )
}

export default PasswordReset