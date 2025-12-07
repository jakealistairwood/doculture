"use client"

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { BlockContent } from "@/sanity/types";

interface FooterProps {
    globalOptions?: {
        contactEmail?: string;
        contactMobile?: string;
        companyAddress?: BlockContent;
        instagramUrl?: string;
        linkedinUrl?: string;
    } | null;
}

const Footer = ({ globalOptions }: FooterProps) => {
    const contactEmail = globalOptions?.contactEmail;
    const contactMobile = globalOptions?.contactMobile;
    const companyAddress = globalOptions?.companyAddress;
    const instagramUrl = globalOptions?.instagramUrl;
    const linkedinUrl = globalOptions?.linkedinUrl;

    return (
        <footer className="bg-off-black text-white py-20">
            <div className="max-w-[1440px] w-full mx-auto px-4">
                <div className="flex flex-col flex-wrap sm:flex-row sm:justify-between gap-20">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-y-10">
                            <Link
                                href="/"
                                className="relative block aspect-[117/23] w-[163px]"
                                aria-label="Go to homepage"
                            >
                                <Image 
                                    src="/images/logo.svg" 
                                    alt="Logo" 
                                    fill 
                                    className="object-contain w-full"
                                    priority 
                                />
                            </Link>
                            {companyAddress && (
                                <address className="flex flex-col opacity-70 not-italic">
                                    <PortableText 
                                        value={companyAddress}
                                        components={{
                                            block: {
                                                normal: ({ children }) => (
                                                    <span className="block">{children}</span>
                                                ),
                                            },
                                            marks: {
                                                strong: ({ children }) => <strong>{children}</strong>,
                                                em: ({ children }) => <em>{children}</em>,
                                            },
                                        }}
                                    />
                                </address>
                            )}
                        </div>
                        {(instagramUrl || linkedinUrl) && (
                            <div className="flex items-center gap-x-2 mt-auto pt-16">
                                {instagramUrl && (
                                    <SocialIcon type="instagram" url={instagramUrl} />
                                )}
                                {linkedinUrl && (
                                    <SocialIcon type="linkedin" url={linkedinUrl} />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-y-10 gap-x-20 xl:gap-x-40 pr-10 xl:pr-20">
                        <nav className="flex flex-col gap-y-8">
                            <p className="font-semibold">Site</p>
                            <ul className="flex flex-col gap-y-6">
                                <li className="opacity-75 hover:opacity-100 duration-200 transition-colors ease">
                                    <Link href="/">Home</Link>
                                </li>
                                <li className="opacity-75 hover:opacity-100 duration-200 transition-colors ease">
                                    <Link href="/about">About</Link>
                                </li>
                                <li className="opacity-75 hover:opacity-100 duration-200 transition-colors ease">
                                    <Link href="/services">Services</Link>
                                </li>
                                <li className="opacity-75 hover:opacity-100 duration-200 transition-colors ease">
                                    <Link href="/our-work">Our Work</Link>
                                </li>
                                <li className="opacity-75 hover:opacity-100 duration-200 transition-colors ease">
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                        {(contactEmail || contactMobile) && (
                            <nav className="flex flex-col gap-y-8">
                                <p className="font-semibold">Contact</p>
                                <ul className="flex flex-col gap-y-6">
                                    {contactEmail && (
                                        <li className="">
                                            <Link href={`mailto:${contactEmail}`} className="flex items-center gap-x-4 group">
                                                <div className="w-[16px] h-[16px] relative aspect-square flex-non text-accent-orange">
                                                    <svg className="w-full" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM8 8.32187L3.28562 4H12.7144L8 8.32187ZM6.16937 8L2.5 11.3631V4.63688L6.16937 8ZM6.90938 8.67813L7.65938 9.36875C7.75162 9.45343 7.87228 9.50041 7.9975 9.50041C8.12272 9.50041 8.24338 9.45343 8.33562 9.36875L9.08562 8.67813L12.7106 12H3.28562L6.90938 8.67813ZM9.83062 8L13.5 4.63625V11.3638L9.83062 8Z" fill="currentColor"/>
                                                    </svg>
                                                </div>
                                                <span className="opacity-75 group-hover:opacity-100 duration-200 transition-colors ease">{contactEmail}</span>
                                            </Link>
                                        </li>
                                    )}
                                    {contactMobile && (
                                        <li className="">
                                            <Link href={`tel:${contactMobile.replace(/\s/g, '')}`} className="flex items-center gap-x-4 group">
                                                <div className="w-[16px] h-[16px] relative aspect-square flex-non text-accent-orange">
                                                    <svg className="w-full" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.8981 9.90387L10.9538 8.58449L10.9456 8.58074C10.7928 8.51537 10.626 8.48913 10.4605 8.50441C10.2949 8.51968 10.1358 8.57599 9.99751 8.66824C9.98122 8.679 9.96557 8.69068 9.95063 8.70324L8.42938 10.0001C7.46563 9.53199 6.47063 8.54449 6.00251 7.59324L7.30126 6.04887C7.31376 6.03324 7.32563 6.01762 7.33688 6.00074C7.42715 5.86281 7.48192 5.70469 7.49631 5.54048C7.5107 5.37626 7.48428 5.21103 7.41938 5.05949V5.05199L6.09626 2.10262C6.01047 1.90466 5.86296 1.73975 5.67575 1.63252C5.48854 1.52528 5.27166 1.48147 5.05751 1.50762C4.21061 1.61906 3.43324 2.03497 2.87059 2.67768C2.30794 3.32038 1.99847 4.14592 2.00001 5.00012C2.00001 9.96262 6.03751 14.0001 11 14.0001C11.8542 14.0016 12.6797 13.6922 13.3224 13.1295C13.9651 12.5669 14.3811 11.7895 14.4925 10.9426C14.5187 10.7285 14.475 10.5117 14.3679 10.3245C14.2607 10.1373 14.096 9.98976 13.8981 9.90387ZM11 13.0001C8.87898 12.9978 6.8455 12.1542 5.34571 10.6544C3.84592 9.15462 3.00232 7.12114 3.00001 5.00012C2.99765 4.3898 3.21754 3.79949 3.61859 3.33943C4.01964 2.87938 4.57444 2.58103 5.17938 2.50012C5.17913 2.50261 5.17913 2.50512 5.17938 2.50762L6.49188 5.44512L5.20001 6.99137C5.18689 7.00646 5.17498 7.02255 5.16438 7.03949C5.07033 7.18382 5.01515 7.34999 5.0042 7.52191C4.99325 7.69382 5.0269 7.86565 5.10188 8.02074C5.66813 9.17887 6.83501 10.337 8.00563 10.9026C8.16186 10.9769 8.33468 11.0094 8.50722 10.9969C8.67976 10.9844 8.8461 10.9274 8.99001 10.8314C9.00605 10.8206 9.02149 10.8089 9.03626 10.7964L10.5556 9.50012L13.4931 10.8157C13.4931 10.8157 13.4981 10.8157 13.5 10.8157C13.4201 11.4215 13.1222 11.9775 12.662 12.3795C12.2019 12.7815 11.611 13.0022 11 13.0001Z" fill="currentColor"/>
                                                    </svg>
                                                </div>
                                                <span className="opacity-75 group-hover:opacity-100 duration-200 transition-colors ease">{contactMobile}</span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

interface SocialIconRendererProps {
    type: string;
}

const SocialIconRenderer = ({ type }: SocialIconRendererProps) => {
    if (type === "instagram") {
        return (
            <svg className="w-full h-full" aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6.25C9.25832 6.25 8.5333 6.46993 7.91661 6.88199C7.29993 7.29404 6.81928 7.87971 6.53545 8.56494C6.25162 9.25016 6.17736 10.0042 6.32206 10.7316C6.46675 11.459 6.8239 12.1272 7.34835 12.6517C7.8728 13.1761 8.54098 13.5333 9.26841 13.6779C9.99584 13.8226 10.7498 13.7484 11.4351 13.4645C12.1203 13.1807 12.706 12.7001 13.118 12.0834C13.5301 11.4667 13.75 10.7417 13.75 10C13.749 9.00576 13.3535 8.05253 12.6505 7.34949C11.9475 6.64645 10.9942 6.25103 10 6.25ZM10 12.5C9.50555 12.5 9.0222 12.3534 8.61107 12.0787C8.19995 11.804 7.87952 11.4135 7.6903 10.9567C7.50108 10.4999 7.45157 9.99723 7.54804 9.51227C7.6445 9.02732 7.8826 8.58186 8.23223 8.23223C8.58186 7.8826 9.02732 7.6445 9.51227 7.54804C9.99723 7.45157 10.4999 7.50108 10.9567 7.6903C11.4135 7.87952 11.804 8.19995 12.0787 8.61107C12.3534 9.0222 12.5 9.50555 12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5ZM13.75 1.875H6.25C5.09006 1.87624 3.97798 2.33758 3.15778 3.15778C2.33758 3.97798 1.87624 5.09006 1.875 6.25V13.75C1.87624 14.9099 2.33758 16.022 3.15778 16.8422C3.97798 17.6624 5.09006 18.1238 6.25 18.125H13.75C14.9099 18.1238 16.022 17.6624 16.8422 16.8422C17.6624 16.022 18.1238 14.9099 18.125 13.75V6.25C18.1238 5.09006 17.6624 3.97798 16.8422 3.15778C16.022 2.33758 14.9099 1.87624 13.75 1.875ZM16.875 13.75C16.875 14.5788 16.5458 15.3737 15.9597 15.9597C15.3737 16.5458 14.5788 16.875 13.75 16.875H6.25C5.4212 16.875 4.62634 16.5458 4.04029 15.9597C3.45424 15.3737 3.125 14.5788 3.125 13.75V6.25C3.125 5.4212 3.45424 4.62634 4.04029 4.04029C4.62634 3.45424 5.4212 3.125 6.25 3.125H13.75C14.5788 3.125 15.3737 3.45424 15.9597 4.04029C16.5458 4.62634 16.875 5.4212 16.875 6.25V13.75ZM15 5.9375C15 6.12292 14.945 6.30418 14.842 6.45835C14.739 6.61252 14.5926 6.73268 14.4213 6.80364C14.25 6.87459 14.0615 6.89316 13.8796 6.85699C13.6977 6.82081 13.5307 6.73152 13.3996 6.60041C13.2685 6.4693 13.1792 6.30225 13.143 6.1204C13.1068 5.93854 13.1254 5.75004 13.1964 5.57873C13.2673 5.40743 13.3875 5.26101 13.5417 5.158C13.6958 5.05498 13.8771 5 14.0625 5C14.3111 5 14.5496 5.09877 14.7254 5.27459C14.9012 5.4504 15 5.68886 15 5.9375Z" fill="currentColor"/>
            </svg>
        )
    }

    if (type === "linkedin") {
        return (
            <svg className="w-full h-full" aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.78255 4.16677C5.78233 4.6088 5.60652 5.03263 5.29381 5.34504C4.98109 5.65744 4.55708 5.83282 4.11505 5.8326C3.67302 5.83238 3.24919 5.65657 2.93678 5.34386C2.62438 5.03114 2.449 4.60713 2.44922 4.1651C2.44944 3.72307 2.62525 3.29924 2.93796 2.98683C3.25068 2.67443 3.67469 2.49905 4.11672 2.49927C4.55875 2.49949 4.98258 2.6753 5.29499 2.98801C5.60739 3.30073 5.78277 3.72474 5.78255 4.16677ZM5.83255 7.06677H2.49922V17.5001H5.83255V7.06677ZM11.0992 7.06677H7.78255V17.5001H11.0659V12.0251C11.0659 8.9751 15.0409 8.69177 15.0409 12.0251V17.5001H18.3326V10.8918C18.3326 5.7501 12.4492 5.94177 11.0659 8.46677L11.0992 7.06677Z" fill="currentColor"/>
            </svg>
        )
    }

    return null;
}

interface SocialIconProps {
    type: string;
    url: string;
}

const SocialIcon = ({ type, url }: SocialIconProps) => {
    return (
        <Link
            href={url}
            aria-label={`Go to Doculture's ${type} social media page`}
            className="w-[45px] h-[45px] aspect-square relative flex items-center justify-center rounded-full bg-white/[10%] text-accent-orange"
        >
            <div className="w-1/2 flex-none">
                <SocialIconRenderer type={type} />
            </div>
        </Link>
    )
}
