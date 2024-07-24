"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
} from "framer-motion";

const AnimatedText = ({ children }: { children: string }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.01 } },
      }}
      style={{ wordWrap: "break-word", whiteSpace: "normal" }}
    >
      {children.split("").map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const AnimatedSection = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition duration-500 hover:shadow-2xl relative overflow-hidden group min-h-[200px]"
    >
      <div className="relative z-10 overflow-hidden">
        <div
          className="text-gray-800"
          style={{ whiteSpace: "normal", wordBreak: "break-word" }}
        >
          {children}
        </div>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        initial={false}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </motion.section>
  );
};

const ParallaxText = ({
  children,
  baseVelocity = 100,
}: {
  children: string;
  baseVelocity?: number;
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useEffect(() => {
    let requestId: number;
    const animate = () => {
      let moveBy = directionFactor.current * baseVelocity * (1 / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
      requestId = requestAnimationFrame(animate);
    };
    requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [baseVelocity, baseX, velocityFactor]);

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
};

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function About() {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-center mb-16 text-customRed"
        >
          About PrefCart
        </motion.h1>

        <div className="space-y-12 relative max-w-4xl mx-auto">
          <AnimatedSection delay={0.3}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Our Story
            </h2>
            <AnimatedText>
              Once upon a time, while shopping at a supermarket with a lactose
              intolerant friend, the struggle to find suitable products became
              evident. Despite seeking assistance from staff, the lack of
              detailed product information and personalized guidance left us
              unsatisfied.
            </AnimatedText>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              The Problem
            </h2>
            <AnimatedText>
              This common scenario highlights the prevailing issue of
              supermarkets failing to offer tailored experiences based on
              individual preferences and dietary needs. We knew technology could
              create a smart shopping assistant to make the experience more
              efficient and enjoyable.
            </AnimatedText>
          </AnimatedSection>

          <AnimatedSection delay={0.7}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              The Solution
            </h2>
            <AnimatedText>
              After extensive research and development, PrefCart was born: an AI
              powered smart shopping assistant providing personalized product
              recommendations based on individual preferences, including dietary
              needs, budget, daily caloric consumption, food intolerances, and
              much more.
            </AnimatedText>
          </AnimatedSection>

          <AnimatedSection delay={0.9}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Our Vision
            </h2>
            <AnimatedText>
              By partnering with PrefCart, supermarkets can offer customers a
              unique, futuristic shopping experience with real time personalized
              and smart product suggestions. We aim to revolutionize the way
              people shop for groceries, making it more efficient, personalized,
              and enjoyable for everyone.
            </AnimatedText>
          </AnimatedSection>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <a
            href="http://localhost:3000/contact"
            className="inline-block px-8 py-3 bg-customRed text-white font-semibold rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Join the Revolution
          </a>
        </motion.div>
      </main>

      <ParallaxText baseVelocity={-5}>
        PrefCart • Personalized Shopping • AI-Powered •
      </ParallaxText>

      <style jsx global>{`
        .parallax {
          overflow: hidden;
          letter-spacing: -2px;
          line-height: 0.8;
          margin: 0;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
        }

        .parallax .scroller {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 64px;
          display: flex;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
        }

        .parallax span {
          display: block;
          margin-right: 30px;
        }
      `}</style>
    </div>
  );
}
