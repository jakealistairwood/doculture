import Link from "next/link"

const Header = () => {
    return (
        <header className="fixed py-5 text-white top-0 left-0 h-fit w-full z-[100]">
            <div className="container">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-3xl font-heading uppercase font-black">Doculture</Link>
                    <ul className="hidden lg:flex items-center gap-x-12 bg-white/5 backdrop-blur-md px-12 py-4 rounded-full border border-white/5">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/portfolio">Portfolio</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                    <ul className="hidden lg:flex items-center gap-x-12">
                        <li className="">
                            <Link href="/" className="inline-flex items-center justify-center font-medium transition-colors rounded-[3px] border border-white/25 px-6 py-3">Get in touch</Link>
                        </li>
                    </ul>
                    <button type="button" className="flex lg:hidden flex-col items-center justify-center p-4 border border-white/10 rounded-[3px]" aria-label="Mobile navigation toggle">
                        <div className="flex flex-col gap-y-2" aria-hidden>
                            <div className="h-[1px] w-[25px] bg-white" />
                            <div className="h-[1px] w-[25px] bg-white" />
                            <div className="h-[1px] w-[25px] bg-white" />
                        </div>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header