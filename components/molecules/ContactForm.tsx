"use client";

import { useState, FormEvent } from "react";

interface ContactFormProps {
    submitButtonText?: string;
}

export default function ContactForm({ submitButtonText = "Send Message" }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // TODO: Replace with your form submission endpoint
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="name" className="text-sm uppercase opacity-60">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent-orange transition-colors"
                    placeholder="Your name"
                />
            </div>

            <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="text-sm uppercase opacity-60">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent-orange transition-colors"
                    placeholder="your.email@example.com"
                />
            </div>

            <div className="flex flex-col gap-y-2">
                <label htmlFor="message" className="text-sm uppercase opacity-60">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent-orange transition-colors resize-none"
                    placeholder="Your message..."
                />
            </div>

            {submitStatus === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-500">
                    Thank you! Your message has been sent successfully.
                </div>
            )}

            {submitStatus === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-500">
                    Sorry, there was an error sending your message. Please try again.
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent-orange text-off-black rounded-[3px] px-6 py-3 font-mono uppercase hover:bg-accent-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Sending..." : submitButtonText}
            </button>
        </form>
    );
}

