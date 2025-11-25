"use client";

import { TextCard as TextCardType } from "@/sanity/types";
import { useRef, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import _SplitText from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(_SplitText, ScrollTrigger);
}

interface TextCardProps {
    data: TextCardType;
    bgColor?: string;
}

const headingFontSizeMap = {
  "16px": "text-16px",
  "40px": "text-40px"
};

const subheadingBgColorMap = {
  white: "bg-[#F1F1F1] text-black/[80%]",
  black: "bg-white/[10%] text-white",
  lightGrey: "bg-white text-black/[80%]"
}

const TextCard = ({ data, bgColor }: TextCardProps) => {
    const { subheading, heading, content, textCardOptions } = data || {};
    const {
        centerAlign = false,
        centerAlignOnMobile = false,
        contentFontSize = "16px",
        headingFontSize = "40px",
        subheadingTag = "h2",
        headingTag = "h3",
        headingMaxWidth,
    } = textCardOptions || {};

    const headingRef = useRef<HTMLHeadingElement>(null);

    const SubheadingTag = subheadingTag || "h2";
    const HeadingTag = headingTag || "h3";

    console.log(bgColor);
    const subheadingBgColor = subheadingBgColorMap[bgColor] || "bg-[#F1F1F1] text-black/[80%]";

    const alignmentClasses = clsx(
      centerAlign && !centerAlignOnMobile ? "items-center text-center" : "",
      centerAlign && centerAlignOnMobile ? "items-center text-center" : "",
      !centerAlign && centerAlignOnMobile ? "items-center text-center md:items-start md:text-left" : "",
    )

    useEffect(() => {
    if (!headingRef.current || !data.heading) return;

    const heading = headingRef.current;
    const type = 'lines'; // Only using lines method as requested
    
    // Split the text
    const split = new _SplitText(heading, {
      type: 'lines',
      linesClass: 'line'
    });

    // Wrap lines in overflow hidden divs for mask effect
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Animate the lines
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: heading,
        start: 'clamp(top 80%)',
        once: true
      }
    });

    // Cleanup function
    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heading) {
          trigger.kill();
        }
      });
    };
  }, [data.heading]);
  
    return (
        <div className={`flex flex-col ${alignmentClasses}`}>
          <div className="flex flex-col gap-y-6">
            {data.subheading && (
                <SubheadingTag className={`text-card__subheading w-fit mx-auto text-xs font-semibold uppercase py-2 px-[0.625rem] rounded-[3px] tracking-widest ${subheadingBgColor}`}>{data.subheading}</SubheadingTag>
            )}
            {data.heading && (
                <HeadingTag 
                  className="font-heading uppercase text-40px" 
                  dangerouslySetInnerHTML={{ __html: data.heading }}
                  style={{
                    maxWidth: `${headingMaxWidth}px`
                  }}
                  ref={headingRef as any}
                />
            )}
          </div>
            {data.content && (
                <p className="text-card__content">{data.content}</p>
            )}
        </div>
    );
}

export default TextCard