"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface FormErrors {
  firstName?: string;
  emailAddress?: string;
  message?: string;
}

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          return 'First name is required';
        }
        return '';
      case 'emailAddress':
        if (!value.trim()) {
          return 'Email address is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Clear error when user starts typing
    if (touched[name] && errors[name as keyof FormErrors]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    
    const firstName = formData.get('firstName') as string;
    const emailAddress = formData.get('emailAddress') as string;
    const message = formData.get('message') as string;

    const firstNameError = validateField('firstName', firstName || '');
    if (firstNameError) newErrors.firstName = firstNameError;

    const emailError = validateField('emailAddress', emailAddress || '');
    if (emailError) newErrors.emailAddress = emailError;

    const messageError = validateField('message', message || '');
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    
    // Mark all fields as touched
    setTouched({
      firstName: true,
      emailAddress: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Validate form before submission
    if (!validateForm(formData)) {
      return;
    }

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
                            <label className="font-medium" htmlFor="firstName">First name*</label>
                            <input 
                                className={`p-4 min-h-[55px] bg-[#FAFAFA] border rounded-[3px] ${
                                    touched.firstName && errors.firstName 
                                        ? 'border-red-500' 
                                        : 'border-[#DEDEDE]'
                                }`}
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.firstName && errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
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
                            <input 
                                className={`p-4 min-h-[55px] bg-[#FAFAFA] border rounded-[3px] ${
                                    touched.emailAddress && errors.emailAddress 
                                        ? 'border-red-500' 
                                        : 'border-[#DEDEDE]'
                                }`}
                                type="email" 
                                name="emailAddress" 
                                id="emailAddress" 
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.emailAddress && errors.emailAddress && (
                                <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>
                            )}
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
                            <textarea 
                                className={`p-4 bg-[#FAFAFA] border rounded-[3px] min-h-[120px] ${
                                    touched.message && errors.message 
                                        ? 'border-red-500' 
                                        : 'border-[#DEDEDE]'
                                }`}
                                name="message" 
                                id="message" 
                                onBlur={handleBlur}
                                onChange={handleChange}
                            ></textarea>
                            {touched.message && errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                            )}
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full min-h-[55px] bg-off-black text-white rounded-[3px] px-6 py-3 hover:bg-accent-orange hover:text-off-black transition-colors duration-200 font-mono uppercase flex items-center justify-between gap-x-3">
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