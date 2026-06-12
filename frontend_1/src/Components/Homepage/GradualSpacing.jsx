// components/GradualSpacing.jsx
"use client";
import React from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

export function GradualSpacing({ text = "", className = "", as = "h1" }) {
  const gradual = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  };

  const Wrapper = as;

  return (
    <Wrapper
      aria-label={text}
      className={clsx("inline-flex flex-row flex-wrap items-center", className)}
    >
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.36, delay: i * 0.06 }}
            className="inline-block select-none text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold drop-shadow-sm tracking-[-0.02em] md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]"
            aria-hidden={true}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
}
