"use client";

import { useEffect, useState } from "react";

interface BitTextProps {
  text: string;
  active: boolean;
  delay?: number;
  className?: string;
  isHeading?: boolean;
}

const BIT_CHARS = "0101100101_#./%[]<>";

export default function BitText({
  text,
  active,
  delay = 0,
  className = "",
  isHeading = false,
}: BitTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isFormed, setIsFormed] = useState(false);

  useEffect(() => {
    if (!active) {
      setIsFormed(false);
      setDisplayText(
        text
          .split("")
          .map((c) => (c === " " ? " " : BIT_CHARS[Math.floor(Math.random() * BIT_CHARS.length)]))
          .join("")
      );
      return;
    }

    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    let iteration = 0;

    timer = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return BIT_CHARS[Math.floor(Math.random() * BIT_CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsFormed(true);
        }

        iteration += isHeading ? 1.5 : 2;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [active, text, delay, isHeading]);

  return (
    <span
      className={`transition-colors duration-300 ${
        isFormed
          ? className
          : `font-mono text-teal-400/90 tracking-wider ${isHeading ? "opacity-90" : ""}`
      }`}
    >
      {displayText}
    </span>
  );
}
