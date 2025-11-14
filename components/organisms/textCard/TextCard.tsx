import React from "react";
import { TextCard as TextCardType } from "@/sanity/types";

interface TextCardProps {
  data: TextCardType;
}

export function TextCard({ data }: TextCardProps) {
  return (
    <div className="text-card">
      {data.subheading && (
        <p className="text-card__subheading">{data.subheading}</p>
      )}
      {data.heading && (
        <h2 className="text-card__heading">{data.heading}</h2>
      )}
      {data.content && (
        <p className="text-card__content">{data.content}</p>
      )}
    </div>
  );
}

