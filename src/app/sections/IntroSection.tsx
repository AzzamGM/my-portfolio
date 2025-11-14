"use client";
import { motion } from "framer-motion";

interface IntroSectionProps {
  isExiting?: boolean;
  scrollDirection?: "up" | "down";
}

export default function IntroSection({
  isExiting = false,
  scrollDirection = "down",
}: IntroSectionProps) {
  const exitVariants = {
    initial: { opacity: 1, y: 0, scale: 1 },
    exit: {
      opacity: 0,
      y: scrollDirection === "down" ? -100 : 100,
      scale: 0.8,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.h1
        className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={
          isExiting
            ? { opacity: 0, y: scrollDirection === "down" ? -50 : 50, scale: 0.9 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: isExiting ? 0.5 : 1, ease: "easeOut" }}
      >
        <motion.span
          animate={
            isExiting
              ? { textShadow: "0 0 0px rgba(255, 255, 255, 0)" }
              : {
                  textShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                    "0 0 40px rgba(255, 255, 255, 0.8)",
                    "0 0 20px rgba(210, 223, 221, 0.5)",
                  ],
                }
          }
          transition={{
            duration: isExiting ? 0.3 : 2,
            repeat: isExiting ? 0 : Infinity,
          }}
        >
          Welcome
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-xl sm:text-2xl text-gray-300 text-center sm:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={
          isExiting
            ? { opacity: 0, x: scrollDirection === "down" ? -100 : 100 }
            : { opacity: 1, x: 0 }
        }
        transition={{ duration: isExiting ? 0.4 : 1, delay: isExiting ? 0 : 0.5 }}
      >
        to{" "}
        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500"
          animate={isExiting ? { scale: 0.8 } : { scale: [1, 1.1, 1] }}
          transition={{
            duration: isExiting ? 0.3 : 2,
            repeat: isExiting ? 0 : Infinity,
          }}
        >
          Azzam's
        </motion.span>{" "}
        Portfolio
      </motion.p>
    </>
  );
}
