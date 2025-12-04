"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100;
            const currentScrollY = window.scrollY;
            
            setIsScrolled(currentScrollY > scrollThreshold);

            // Determine scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
                // Scrolling down - hide header
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up - show header
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

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
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            }}
        >
            <div className="max-w-[1400px] w-full mx-auto">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-x-20">
                        <Link
                            href="/"
                            className="relative block aspect-[117/23] w-[117px] h-[23px]"
                            aria-label="Go to homepage"
                        >
                            <Image 
                                src="/images/logo.svg" 
                                alt="Logo" 
                                fill 
                                className={`object-contain ${isScrolled ? "invert" : ""}`}
                                priority 
                            />
                        </Link>
                        <ul className="hidden lg:flex items-center gap-x-8 font-medium opacity-80">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/services">Services</Link>
                            </li>
                            <li>
                                <Link href="/our-work">Work</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="hidden lg:flex items-center gap-x-12">
                        <li className="">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center font-medium rounded-[3px] text-sm uppercase border border-white/25 px-6 py-3"
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
                        <span aria-hidden>Menu</span>
                        <div className="flex flex-col gap-y-2" aria-hidden>
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
