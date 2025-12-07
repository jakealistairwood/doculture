"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    // Prevent body scroll when mobile menu is open and handle escape key
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setIsMobileMenuOpen(false);
                }
            };

            window.addEventListener('keydown', handleEscape);
            
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleEscape);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header 
                className={clsx(
                    "fixed py-5 top-0 left-0 h-fit w-full transition-all duration-300",
                    isMobileMenuOpen ? "z-[102]" : "z-[100]",
                    isScrolled 
                        ? "bg-white/95 backdrop-blur-sm text-black border-b border-black/10" 
                        : "text-white border-b border-transparent"
                )}
                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                }}
            >
                <div className="px-4 w-full mx-auto">
                    <div className="container">
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
                                        href="/contact"
                                        className={clsx(
                                            "inline-flex items-center justify-center font-mono font-medium rounded-[3px] text-sm uppercase px-6 py-3",
                                            !isScrolled ? "border border-white/25 hover:bg-accent-orange hover:text-off-black hover:border-accent-orange/100" : "",
                                            isScrolled ? "border border-black/25 hover:bg-accent-orange hover:text-off-black hover:border-accent-orange/100" : "",
                                            "transition-all duration-200 ease"
                                        )}
                                    >
                                        Get in touch
                                    </Link>
                                </li>
                            </ul>
                            <button
                                type="button"
                                onClick={toggleMobileMenu}
                                className="flex lg:hidden items-center justify-center gap-x-3 relative"
                                aria-label={isMobileMenuOpen ? "Close mobile navigation" : "Open mobile navigation"}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span 
                                    className={clsx(
                                        "font-medium transition-opacity duration-300",
                                        isScrolled || isMobileMenuOpen ? "text-off-black" : "text-white"
                                    )}
                                    aria-hidden
                                >
                                    {isMobileMenuOpen ? "Close" : "Menu"}
                                </span>
                                <div className="flex flex-col gap-y-1.5 w-[20px] justify-center" aria-hidden>
                                    <div 
                                        className={clsx(
                                            "h-[1.5px] w-full transition-all duration-300 origin-center",
                                            isScrolled || isMobileMenuOpen ? "bg-off-black" : "bg-white",
                                            isMobileMenuOpen && "rotate-45 translate-y-[3px]"
                                        )} 
                                    />
                                    <div 
                                        className={clsx(
                                            "h-[1.5px] w-full transition-all duration-300",
                                            isScrolled || isMobileMenuOpen ? "bg-off-black" : "bg-white",
                                            isMobileMenuOpen && "opacity-0"
                                        )} 
                                    />
                                    <div 
                                        className={clsx(
                                            "h-[1.5px] w-full transition-all duration-300 origin-center",
                                            isScrolled || isMobileMenuOpen ? "bg-off-black" : "bg-white",
                                            isMobileMenuOpen && "-rotate-45 -translate-y-[3px]"
                                        )} 
                                    />
                                </div>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={clsx(
                    "fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white z-[101] lg:hidden transition-transform duration-300 ease-in-out",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
                aria-hidden={!isMobileMenuOpen}
            >
                {/* Close button inside menu */}
                <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="absolute top-5 right-4 flex items-center justify-center gap-x-3 z-[102]"
                    aria-label="Close mobile navigation"
                >
                    <span className="font-medium text-off-black" aria-hidden>
                        Close
                    </span>
                    <div className="flex flex-col gap-y-1.5 w-[20px] justify-center" aria-hidden>
                        <div className="h-[1.5px] w-full bg-off-black rotate-45 translate-y-[3px] transition-all duration-300 origin-center" />
                        <div className="h-[1.5px] w-full bg-off-black opacity-0 transition-all duration-300" />
                        <div className="h-[1.5px] w-full bg-off-black -rotate-45 -translate-y-[3px] transition-all duration-300 origin-center" />
                    </div>
                </button>
                <nav className="h-full flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center px-4">
                        <ul className="flex flex-col items-center gap-y-8 text-center">
                            <li>
                                <Link
                                    href="/"
                                    onClick={closeMobileMenu}
                                    className="text-80px font-heading uppercase text-off-black hover:text-accent-orange transition-colors duration-200"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    onClick={closeMobileMenu}
                                    className="text-80px font-heading uppercase text-off-black hover:text-accent-orange transition-colors duration-200"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    onClick={closeMobileMenu}
                                    className="text-80px font-heading uppercase text-off-black hover:text-accent-orange transition-colors duration-200"
                                >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/our-work"
                                    onClick={closeMobileMenu}
                                    className="text-80px font-heading uppercase text-off-black hover:text-accent-orange transition-colors duration-200"
                                >
                                    Works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    onClick={closeMobileMenu}
                                    className="text-80px font-heading uppercase text-off-black hover:text-accent-orange transition-colors duration-200"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
