"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100;
            setIsScrolled(window.scrollY > scrollThreshold);
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header 
            className={`fixed py-5 top-0 left-0 h-fit w-full z-[100] transition-all duration-300 ${
                isScrolled 
                    ? "bg-white/95 backdrop-blur-sm text-black border-b border-black/10" 
                    : "text-white border-b border-transparent"
            }`}
        >
            <div className="max-w-[1400px] w-full mx-auto">
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-3xl font-heading uppercase font-black"
                    >
                        Doculture
                    </Link>
                    <ul className="hidden lg:flex items-center gap-x-12 uppercase text-sm font-medium opacity-80">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/about">Services</Link>
                        </li>
                        <li>
                            <Link href="/portfolio">Portfolio</Link>
                        </li>
                    </ul>
                    <ul className="hidden lg:flex items-center gap-x-12">
                        <li className="">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center font-medium transition-colors rounded-[3px] text-sm uppercase border border-white/25 px-6 py-3"
                            >
                                Get in touch
                            </Link>
                        </li>
                    </ul>
                    <button
                        type="button"
                        className="flex lg:hidden flex-col items-center justify-center p-4 border border-white/10 rounded-[3px]"
                        aria-label="Mobile navigation toggle"
                    >
                        <div className="flex flex-col gap-y-2" aria-hidden>
                            <div className="h-[1px] w-[25px] bg-white" />
                            <div className="h-[1px] w-[25px] bg-white" />
                            <div className="h-[1px] w-[25px] bg-white" />
                        </div>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
