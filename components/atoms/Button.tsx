// "use client";

// import Link from "next/link";
// import clsx from "clsx";

// interface ButtonProps {
//     href: string;
//     label: string;
//     size?: "sm" | "default" | "lg";
//     style?: "primary" | "outline" | "accent";
//     className?: string;
// }

// const Button = ({ 
//     href, 
//     label, 
//     size = "default", 
//     style = "primary",
//     className = ""
// }: ButtonProps) => {
//     // Check if href is a hash link (starts with #)
//     const isHashLink = href?.startsWith('#');

//     // Handle hash link click with smooth scrolling
//     const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//         if (isHashLink) {
//             e.preventDefault();
//             const targetId = href.substring(1); // Remove the # symbol
//             const element = document.getElementById(targetId);
//             if (element) {
//                 element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//             }
//         }
//     };

//     // Button styles
//     const buttonBaseStyles = "inline-flex items-center justify-center font-medium transition-colors rounded-[3px]";
//     const buttonSizeStyles = {
//         sm: "px-4 py-2 text-sm",
//         default: "px-6 py-3 text-sm",
//         lg: "px-8 py-4 text-lg",
//     };
//     const buttonStyleStyles = {
//         primary: "bg-white text-black hover:bg-white/90",
//         outline: "border-2 border-black/10 text-off-black font-medium hover:bg-accent-orange hover:text-black",
//         accent: "bg-accent-orange text-off-black hover:bg-accent-orange/90 font-mono uppercase",
//     };

//     // Use anchor tag for hash links, Link component for regular links
//     if (isHashLink) {
//         return (
//             <a
//                 href={href}
//                 onClick={handleHashClick}
//                 className={`${buttonBaseStyles} ${buttonSizeStyles[size]} ${buttonStyleStyles[style]} ${className}`}
//             >
//                 {label}
//             </a>
//         );
//     }

//     return (
//         <Link
//             href={href}
//             className={`${buttonBaseStyles} ${buttonSizeStyles[size]} ${buttonStyleStyles[style]} ${className}`}
//         >
//             {label}
//         </Link>
//     );
// };

// export default Button;


"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import clsx from "clsx";

interface ButtonProps {
  href: string;
  label: string;
  size?: "sm" | "default" | "lg";
  style?: "primary" | "outline" | "accent";
  className?: string;
}

const Button = ({
  href,
  label,
  size = "default",
  style = "primary",
  className = "",
}: ButtonProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  const isHashLink = href.startsWith("#");

  // Character stagger animation (React version)
  useEffect(() => {
    const el = textRef.current;
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
  }, [label]);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHashLink) return;
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const baseClasses =
    "btn-animate-chars inline-flex items-center justify-center relative overflow-hidden rounded-[3px]";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-lg",
  };

  const styleClasses = {
    primary: "bg-white text-black",
    outline: "border-2 border-black/10 text-off-black",
    accent: "bg-accent-orange text-off-black font-mono uppercase hover:opacity-80 duration-300 transition-all ease",
  };

  const content = (
    <>
      <div className="btn-animate-chars__bg" />
      <span
        ref={textRef}
        data-button-animate-chars
        className="btn-animate-chars__text relative z-10"
        aria-hidden
      >
        {label}
      </span>
      <span className="sr-only">{label}</span>
    </>
  );

  if (isHashLink) {
    return (
      <a
        href={href}
        onClick={handleHashClick}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          styleClasses[style],
          className
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        styleClasses[style],
        className
      )}
    >
      {content}
    </Link>
  );
};

export default Button;