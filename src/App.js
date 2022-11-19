
import {Routes, Route, Link, Navigate } from "react-router-dom";
import Userfront from "@userfront/react";

Userfront.init(process.env.REACT_APP_USERFRONT);

const SignupForm = Userfront.build({
  toolId: process.env.REACT_APP_SIGNUP
});

const LoginForm = Userfront.build({
  toolId: process.env.REACT_APP_LOGIN
});

const PasswordResetForm = Userfront.build({
  toolId: process.env.REACT_APP_RESET
});

// const LogoutButton = Userfront.build({
//   toolId: process.env.REACT_APP_LOGOUT
// });

export default function App() {
  return (
      <div className="h-screen bg-sky-50">
        <nav>
          <ul className="flex gap-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/reset" element={<PasswordReset />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
  );
}

function Home() {
  return  <>
  <h2>Home</h2>
  <SignupForm />
  </>
}

function Login() {
  return <>
    <h2>Login</h2>
    <LoginForm />
  </>
}

function PasswordReset() {
  return <>
    <h2>Password Reset</h2>
    <PasswordResetForm />
  </>
}

function Dashboard() {
  function Auth({ location }) {
    // If the user is not logged in, redirect to login
    if (!Userfront.accessToken()) {
      return (
        <Navigate
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    }

    // If the user is logged in, show the dashboard
    const userData = JSON.stringify(Userfront.user, null, 2);
    return (
      <div>
        <h2>Dashboard</h2>
        <pre>{userData}</pre>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  }

  return <Auth></Auth>
}