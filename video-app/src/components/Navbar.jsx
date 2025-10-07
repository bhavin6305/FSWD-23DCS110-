import React, { use, useState } from 'react'
// import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { FaPowerOff, FaSearch } from "react-icons/fa";
import clsx from "clsx";
import { onAuthStateChanged } from "firebase/auth";


const Navbar = ({ isScrolled , forceBlack = false}) => {

    const navigate = useNavigate();
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/TvShows" },
        { name: "Movies", link: "/movies" },
    ];

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login")
    })

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);


    return (

        <nav
            className={clsx(
                "flex justify-between items-center fixed top-0 w-full z-10 transition duration-300 px-16 h-24",
                (isScrolled || forceBlack) ? "bg-black" : "bg-transparent"
            )}
        >


            <div className='flex items-center gap-8 '>

                <div>
                    <img src={logo} alt="logo" className='h-16' />
                </div>

                <ul className='flex gap-8 list-none'>
                    {
                        links.map(({ name, link }) => {
                            return (
                                <li key={name}>
                                    <Link to={link} className='text-white no-underline hover:underline'>{name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className=' flex items-center gap-4'>

                <div className={`flex items-center gap-2 transition-all duration-300
                        ${showSearch ? "border border-white bg-black/60" : ""}`}
                >

                    <button
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => {
                            if (!inputHover) setShowSearch(false);
                        }} className='p-2'>
                        <FaSearch className='text-white text-lg' />
                    </button>

                    <input type="text"
                        placeholder='Search'
                        onMouseEnter={() => setInputHover(true)}
                        onMouseLeave={() => setInputHover(false)}
                        onBlur={() => {
                            setShowSearch(false);
                            setInputHover(false);
                        }}
                        className={`bg-transparent border-none tetx-white transition-all duration-300 focus:outline-none
                        ${showSearch ? "w-48 opacity-100 visible p-1"
                                : "w-0 opacity-0 invisible"
                            }`} />

                </div>



            </div>
        </nav>


    )
}

export default Navbar