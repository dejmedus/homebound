import Userfront from "@userfront/react";

const Login = () => {

    const LoginForm = Userfront.build({
        toolId: process.env.REACT_APP_LOGIN
    });

    return (
        <div className='text-center'>
            <h2 className='pb-6'>Welcome Back!</h2>
            <LoginForm />
        </div>
    )
}

export default Login