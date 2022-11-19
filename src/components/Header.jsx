import Userfront from "@userfront/react";
import { NavLink } from "react-router-dom";

const Header = () => {
    let activeStyle = {
        textDecoration: "underline",
    };


    return (
        <nav className='py-2 px-4 md:px-12 bg-stone-200 dark:bg-stone-900 dark:text-white flex gap-1'>
            <ul className="flex gap-1 w-screen justify-between">
                {!Userfront.accessToken()
                    ?
                    <>
                        <div className="flex gap-4 items-center">
                            <li>
                                <NavLink
                                    className="font-bold"
                                    to="/"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >
                                    Homebound
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className='hover:opacity-60'
                                    to="/about"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >About</NavLink>
                            </li>
                        </div>
                        <div>
                            <li className="border bg-stone-300 rounded hover:bg-stone-100 py-1 px-4 text-stone-800">
                                <NavLink
                                    className='hover:underline'
                                    to="/login"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >Login</NavLink>
                            </li>
                        </div>
                    </>

                    :
                    <>
                        <div className="flex gap-4 items-center">
                            <li>
                                <NavLink
                                    className="font-bold"
                                    to="/"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }>Homebound</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className='hover:opacity-60'
                                    to="/trip-calculator"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }>Your Trips</NavLink>
                            </li>
                        </div>
                        <div>
                            <li className='justify-self-end'>
                                <div className='flex gap-4 items-center'>
                                    <NavLink
                                        className='flex gap-2 items-center bg-stone-100 rounded-full hover:bg-stone-300 py-1 px-1 md:px-2 text-stone-800'
                                        to="/update-user"
                                    >
                                        <img src={Userfront.user.image} className='rounded-full w-7' alt="profile" />
                                        <p className='hidden md:inline-block pr-2' >{Userfront.user.username}</p>
                                    </NavLink>
                                    <button className='hidden md:inline-block hover:opacity-80' onClick={Userfront.logout}>
                                        Logout
                                    </button>
                                </div>
                            </li>
                        </div>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Header