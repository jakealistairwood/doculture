import React from "react";
import { HomeMasthead as HomeMastheadType } from "@/sanity/types";

interface HomeMastheadProps {
  data: HomeMastheadType;
}

export function HomeMasthead({ data }: HomeMastheadProps) {
  return (
    <section className="home-masthead">
      <div className="container">
        {data.heading && <h1>{data.heading}</h1>}
        {data.content && <p>{data.content}</p>}
        {data.image && (
          <div className="home-masthead__image">
            {/* Image will be rendered here */}
          </div>
        )}
      </div>
    </section>
  );
}