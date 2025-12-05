import { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "8dbc213e-e741-4b2d-86cb-fe9ac33c8371");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setFormSubmitted(data.success ? true : false);

  };

  return (
    <div>
        {formSubmitted ? (
            <div className="flex flex-col items-center text-center gap-y-3">
                <h2 className="text-40px font-heading uppercase">Thank you!</h2>
                <p>We'll be in touch as soon as we</p>
                <Link href="/" className="w-full min-h-[55px] bg-off-black text-white rounded-[3px] px-6 py-3 hover:bg-accent-orange hover:text-off-black transition-colors duration-200 font-mono text-sm uppercase flex items-center justify-between gap-x-3 cursor-pointer mt-6">
                    <span>Back to home</span>
                    <ArrowIcon />
                </Link>
            </div>
        ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-y-2">
                            <label className="font-medium" htmlFor="firstName">First name</label>
                            <input className="p-4 min-h-[55px] bg-[#FAFAFA] border border-[#DEDEDE] rounded-[3px]" type="text" name="firstName" id="firstName" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="font-medium flex items-center gap-x-2 flex-wrap gap-y-1" htmlFor="lastName">
                                <span>Last name</span>
                                <span className="opacity-60 text-xs">{`(optional)`}</span>
                            </label>
                            <input className="p-4 min-h-[55px] bg-[#FAFAFA] border border-[#DEDEDE] rounded-[3px]" type="text" name="lastName" id="lastName" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-y-2">
                            <label className="font-medium" htmlFor="emailAddress">Email address*</label>
                            <input className="p-4 min-h-[55px] bg-[#FAFAFA] border border-[#DEDEDE] rounded-[3px]" type="email" name="emailAddress" id="emailAddress" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-y-2">
                            <label className="font-medium flex items-center gap-x-2 flex-wrap gap-y-1" htmlFor="mobileNumber">
                                <span>Mobile number</span>
                                <span className="opacity-60 text-xs">{`(optional)`}</span>
                            </label>
                            <input className="p-4 min-h-[55px] bg-[#FAFAFA] border border-[#DEDEDE] rounded-[3px]" type="tel" name="mobileNumber" id="mobileNumber" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col gap-y-2">
                            <label className="font-medium" htmlFor="message">Message*</label>
                            <textarea className="p-4 bg-[#FAFAFA] border border-[#DEDEDE] rounded-[3px] min-h-[120px]" name="message" id="message" required></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full min-h-[55px] bg-off-black text-white rounded-[3px] px-6 py-3 hover:bg-accent-orange hover:text-off-black transition-colors duration-200 font-mono text-sm uppercase flex items-center justify-between gap-x-3 cursor-pointer">
                    <span>Get in touch</span>
                    <ArrowIcon />
                </button>
            </form>
        )}
    </div>
  );
}

const ArrowIcon = () => {
    return (
        <svg
            aria-hidden
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.5781 15.7142L17.3676 9.92473L11.5781 4.13525"
                stroke="currentColor"
                strokeWidth="1.32331"
                strokeMiterlimit="10"
            />
            <path
                d="M17.3686 9.9248H1.6543"
                stroke="currentColor"
                strokeWidth="1.32331"
                strokeMiterlimit="10"
            />
        </svg>
    )
}