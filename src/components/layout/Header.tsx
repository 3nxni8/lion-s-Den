"use client"
import React from 'react';
import Link from 'next/link';
import Menu from './menu';

const Header =() => {
    return (
        <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64  relative">
            <div className=" h-full flex items-center justify-between">


                {/* MOBILE & TABLET */}
                <Link href="/">
                    <div className="text-2xl font-bold text-white michroma">
                        LION&apos;S DEN
                    </div>

                </Link>
                <Menu />


            </div>



        </div>
    )
}

export default Header;