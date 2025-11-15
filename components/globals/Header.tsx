import Link from "next/link"

const Header = () => {
    return (
        <header className="fixed py-5 text-white top-0 left-0 h-fit w-full z-[100]">
            <div className="container">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-3xl font-heading uppercase font-black">Doculture</Link>
                    <ul className="flex items-center gap-x-12 bg-white/5 backdrop-blur-md px-12 py-4 rounded-full border border-white/5">
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
                    <ul className="flex items-center gap-x-12">
                        <li>
                            <Link href="/">Get in touch</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header