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
    const buttonTextRef = useRef<HTMLSpanElement>(null);

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

    // Character stagger animation for "Get in Touch" button
    useEffect(() => {
        const el = buttonTextRef.current;
        if (!el) return;

        const offsetIncrement = 0.01;
        const text = el.textContent || "";
        el.innerHTML = "";

        [...text].forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.transitionDelay = `${index * offsetIncrement}s`;

            if (char === " ") {
                span.style.whiteSpace = "pre";
            }

            el.appendChild(span);
        });
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
                    "fixed py-4 top-0 left-0 h-fit w-full transition-all duration-300",
                    isMobileMenuOpen ? "z-[102]" : "z-[100]",
                    isScrolled 
                        ? "bg-white/95 backdrop-blur-sm text-black border-b border-black/10" 
                        : "text-white border-b border-transparent"
                )}
                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                }}
            >
                <div className="w-full mx-auto">
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
                                        <Link className="link-group nav-link" href="/">
                                            <span data-underline-link>Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link-group nav-link" href="/about">
                                            <span data-underline-link>About</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link-group nav-link" href="/services">
                                            <span data-underline-link>Services</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="link-group nav-link" href="/our-work">
                                            <span data-underline-link>Work</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <ul className="hidden lg:flex items-center gap-x-12">
                                <li className="">
                                    <Link
                                        href="/contact"
                                        className={clsx(
                                            "btn-animate-chars inline-flex items-center justify-center font-mono font-medium rounded-[3px] text-sm uppercase px-6 py-3 relative overflow-hidden",
                                            !isScrolled ? "border border-white/25 hover:text-off-black hover:border-accent-orange/100" : "",
                                            isScrolled ? "border border-black/25 hover:text-off-black hover:border-accent-orange/100" : "",
                                            "transition-all duration-200 ease"
                                        )}
                                    >
                                        <div className="btn-animate-chars__bg" />
                                        <span
                                            ref={buttonTextRef}
                                            data-button-animate-chars
                                            className="btn-animate-chars__text relative z-10"
                                            aria-hidden
                                        >
                                            Get in touch
                                        </span>
                                        <span className="sr-only">Get in touch</span>
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
                                    {isMobileMenuOpen ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                                    ) : (
                                        <>
                                            <div 
                                                className={clsx(
                                                    "h-[1.5px] w-full transition-all duration-300 origin-center",
                                                    isScrolled || isMobileMenuOpen ? "bg-off-black" : "bg-white",
                                                )} 
                                            />
                                            <div 
                                                className={clsx(
                                                    "h-[1.5px] w-full transition-all duration-300",
                                                    isScrolled || isMobileMenuOpen ? "bg-off-black" : "bg-white",
                                                )} 
                                            />
                                            <div 
                                                className={clsx(
                                                    "h-[1.5px] w-full transition-all duration-300 origin-center",
                                                    isScrolled || isMobileMenuOpen ? "bg-off-black" : "bg-white",
                                                )} 
                                            />
                                        </>
                                    )}
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
