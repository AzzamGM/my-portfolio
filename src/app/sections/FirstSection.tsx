"use client";
import { motion } from "framer-motion";

interface FirstSectionProps {
  isExiting?: boolean;
  scrollDirection?: "up" | "down";
}

export default function FirstSection({ isExiting = false, scrollDirection = "down" }: FirstSectionProps) {
    return (
        <>
            <motion.h1
                className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={isExiting ? { opacity: 0, y: scrollDirection === "down" ? -50 : 50, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: isExiting ? 0.5 : 1, ease: "easeOut", delay: isExiting ? 0 : 0.2 }}
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
                    Education
                </motion.span>
            </motion.h1>

            <motion.p
                className="text-2xl sm:text-4xl text-gray-300 text-center sm:text-left mt-4"
                initial={{ opacity: 0, x: -50 }}
                animate={isExiting ? { opacity: 0, x: scrollDirection === "down" ? -100 : 100 } : { opacity: 1, x: 0 }}
                transition={{ duration: isExiting ? 0.4 : 0.8, delay: isExiting ? 0.1 : 1.0, ease: "easeOut" }}
            >
                <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500"
                    initial={{ scale: 0 }}
                    animate={isExiting ? { scale: 0 } : { scale: 1 }}
                    transition={{ duration: isExiting ? 0.3 : 0.6, delay: isExiting ? 0 : 1.0, ease: "backOut" }}
                >
                    <motion.span
                        animate={isExiting ? { scale: 0.8 } : { scale: [1, 1.1, 1] }}
                        transition={{ duration: isExiting ? 0.3 : 2, repeat: isExiting ? 0 : Infinity, delay: isExiting ? 0 : 1.0 }}
                    >
                        University of Business and Technology (UBT)
                    </motion.span>
                </motion.span>
                <br />
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: isExiting ? 0.3 : 0.5, delay: isExiting ? 0 : 1.2 }}
                >
                    Bachelor Degree in Software Engineering: 2019-2024 &nbsp; | &nbsp; GPA: 4.27
                </motion.span>
            </motion.p>

        </>
    );
}
