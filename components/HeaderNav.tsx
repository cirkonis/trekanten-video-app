'use client'

import Link from 'next/link'
import {SignInButton} from "@/app/login/SignInButton";
import {useState} from "react";

export function HeaderNav() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div onClick={toggleDropdown} tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                        </svg>
                    </div>
                    {dropdownOpen && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
                            onBlur={closeDropdown}
                        >
                            <li>
                                <Link href="/" onClick={closeDropdown}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/unprocessed-videos" onClick={closeDropdown}>
                                    New Videos
                                </Link>
                            </li>
                            <li>
                                <Link href="/fencers" onClick={closeDropdown}>
                                    Fencers
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Trekanten Video App</a>
            </div>
            <div className="navbar-end">
                <SignInButton />
            </div>
        </div>
    )
}