"use client";
import { motion } from "framer-motion";

interface SecondSectionProps {
  isExiting?: boolean;
  scrollDirection?: "up" | "down";
}

export default function SecondSection({ isExiting = false, scrollDirection = "down" }: SecondSectionProps) {
  return (
    <>
      <motion.h1
        className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={isExiting ? { opacity: 0, y: scrollDirection === "down" ? -50 : 50, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: isExiting ? 0.5 : 0.8, ease: "easeOut", delay: isExiting ? 0 : 0.2 }}
      >
        <motion.span
          animate={isExiting ? { textShadow: "0 0 0px rgba(255, 255, 255, 0)" } : {
            textShadow: [
              "0 0 20px rgba(255, 255, 255, 0.5)",
              "0 0 40px rgba(255, 255, 255, 0.8)",
              "0 0 20px rgba(210, 223, 221, 0.5)",
            ],
          }}
          transition={{ duration: isExiting ? 0.3 : 2, repeat: isExiting ? 0 : Infinity, delay: isExiting ? 0 : 1 }}
        >
          Experience
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-200 text-center sm:text-left mt-6"
        initial={{ opacity: 0, x: -50 }}
        animate={isExiting ? { opacity: 0, x: scrollDirection === "down" ? -100 : 100 } : { opacity: 1, x: 0 }}
        transition={{ duration: isExiting ? 0.4 : 0.8, delay: isExiting ? 0.1 : 1.5, ease: "easeOut" }}
      >
        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-violet-800 font-semibold text-xl sm:text-2xl"
          initial={{ scale: 0 }}
          animate={isExiting ? { scale: 0 } : { scale: 1 }}
          transition={{ duration: isExiting ? 0.3 : 0.6, delay: isExiting ? 0 : 1.5, ease: "backOut" }}
        >
          STC (Channels Platform) - MySTC Portal Developer
        </motion.span>{" "}
        <motion.span
          className="text-blue-300 font-medium"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: isExiting ? 0.3 : 0.5, delay: isExiting ? 0 : 1.5 }}
        >
          (December 2024 to PRESENT)
        </motion.span>
        <br />
        <motion.span
          className="text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: isExiting ? 0.3 : 0.5, delay: isExiting ? 0 : 1.5 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isExiting ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            transition={{ duration: isExiting ? 0.3 : 0.4, delay: isExiting ? 0 : 1.6 }}
          >
            <span className="text-white-300">•</span> Handled the training of new employees in STC (Channels Platform).
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isExiting ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            transition={{ duration: isExiting ? 0.3 : 0.4, delay: isExiting ? 0 : 1.7 }}
          >
            <span className="text-white-300">•</span> Collaborated with teams in an Agile/Scrum environment to deliver features on tight deadlines.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isExiting ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            transition={{ duration: isExiting ? 0.3 : 0.4, delay: isExiting ? 0 : 1.8 }}
          >
            <span className="text-white-300">•</span> Played a key role in the development of MySTC 4 and the upcoming MySTC 5 customer portals.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isExiting ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            transition={{ duration: isExiting ? 0.3 : 0.4, delay: isExiting ? 0 : 1.9 }}
          >
            <span className="text-white-300">•</span> Utilized technologies such as React, TypeScript, Next.js, TypeScript, Tailwind CSS, and RESTful APIs.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isExiting ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            transition={{ duration: isExiting ? 0.3 : 0.4, delay: isExiting ? 0 : 2.0 }}
          >
            <span className="text-white-300">•</span> Handled the training and onboarding of new employees in MySTC Portal team.
          </motion.span>
        </motion.span>
      </motion.p>

      <motion.p
        className="text-lg sm:text-xl text-gray-200 text-center sm:text-left mt-6"
        initial={{ opacity: 0, x: -50 }}
        animate={isExiting ? { opacity: 0, x: scrollDirection === "down" ? -100 : 100 } : { opacity: 1, x: 0 }}
        transition={{ duration: isExiting ? 0.4 : 0.8, delay: isExiting ? 0.2 : 2.2, ease: "easeOut" }}
      >
        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-400 font-semibold text-xl sm:text-2xl"
          initial={{ scale: 0 }}
          animate={isExiting ? { scale: 0 } : { scale: 1 }}
          transition={{ duration: isExiting ? 0.3 : 0.6, delay: isExiting ? 0.2 : 2.2, ease: "backOut" }}
        >
          SAMI Advanced Technologies Summer Training Program
        </motion.span>{" "}
        <br />
        <motion.span
          className="text-blue-300 font-medium"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: isExiting ? 0.3 : 0.6, delay: isExiting ? 0.2 : 2.2, ease: "backOut" }}
        >
           June 2024 to August 2024 (2 months)
        </motion.span>
      </motion.p>

      <motion.p
        className="text-lg sm:text-xl text-gray-200 text-center sm:text-left mt-6"
        initial={{ opacity: 0, x: -50 }}
        animate={isExiting ? { opacity: 0, x: scrollDirection === "down" ? -100 : 100 } : { opacity: 1, x: 0 }}
        transition={{ duration: isExiting ? 0.4 : 0.8, delay: isExiting ? 0.3 : 2.8, ease: "easeOut" }}
      >
        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 font-semibold text-xl sm:text-2xl"
          initial={{ scale: 0 }}
          animate={isExiting ? { scale: 0 } : { scale: 1 }}
          transition={{ duration: isExiting ? 0.3 : 0.6, delay: isExiting ? 0.3 : 2.8, ease: "backOut" }}
        >
          Arabian Cement Company Training Program
        </motion.span>{" "}
        <br />
        <motion.span
          className="text-blue-300 font-medium"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: isExiting ? 0.3 : 0.6, delay: isExiting ? 0.3 : 2.8, ease: "backOut" }}
        >
           June 2024 to August 2024 (2 months)
        </motion.span>
      </motion.p>
    </>
  );
}