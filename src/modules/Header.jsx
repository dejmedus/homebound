import Userfront from "@userfront/react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className='py-2 px-12 bg-neutral-200 dark:bg-neutral-900 dark:text-white flex gap-1'>
            <ul className="flex gap-1 w-screen justify-between">
                {!Userfront.accessToken()
                    ?
                    <>
                        <div className="flex gap-4 items-center">
                            <li>
                                <Link className="font-bold" to="/">Homebound</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                        </div>
                        <div>
                            <li className="border bg-neutral-300 rounded hover:bg-neutral-100 py-1 px-4 text-neutral-800">
                                <Link to="/login">Login</Link>
                            </li>
                        </div>
                    </>

                    :
                    <>
                        <div className="flex gap-4 items-center">
                            <li>
                                <Link className="font-bold" to="/">Homebound</Link>
                            </li>
                            <li>
                                <Link to="/trip-calculator">Plan Your Trip</Link>
                            </li>
                        </div>
                        <div>
                            <li className='justify-self-end'>
                                <div className='flex gap-2 items-center'>
                                    {/* <button className='flex gap-2 items-center bg-neutral-100 rounded-full hover:bg-neutral-300 py-1 pl-2 pr-4 text-neutral-800'> */}
                                    <Link
                                        className='flex gap-2 items-center bg-neutral-100 rounded-full hover:bg-neutral-300 py-1 pl-2 pr-4 text-neutral-800'
                                        to="/update-user"
                                    >
                                        <img src={Userfront.user.image} className='rounded-full w-7' alt="profile" />
                                        <p>{Userfront.user.username}</p>
                                    </Link>
                                    {/* </button> */}
                                    <button onClick={Userfront.logout}>
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