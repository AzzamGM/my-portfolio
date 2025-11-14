"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import IntroSection from "./sections/IntroSection";
import FirstSection from "./sections/FirstSection";
import SecondSection from "./sections/SecondSection";
import ThirdSection from "./sections/ThirdSection";

type Section = "intro" | "about" | "experience" | "contact";

const sections: Section[] = ["intro", "about", "experience", "contact"];

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [animatingToIndex, setAnimatingToIndex] = useState<number | null>(null);
  const [particlePositions, setParticlePositions] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      left: (i * 3.33) % 100,
      top: (i * 5.67) % 100,
    }))
  );
  const [progressivelyLitIndices, setProgressivelyLitIndices] = useState<
    number[]
  >([0]);

  const goToPreviousSection = useCallback(() => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setIsExiting(true);
      setScrollDirection("up");
      setTimeout(() => {
        setCurrentSection(sections[currentIndex - 1]);
        setIsExiting(false);
      }, 500);
    }
  }, [currentSection]);

  const goToNextSection = useCallback(() => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setIsExiting(true);
      setScrollDirection("down");
      setTimeout(() => {
        setCurrentSection(sections[currentIndex + 1]);
        setIsExiting(false);
      }, 500);
    }
  }, [currentSection]);

  const renderCurrentSection = () => {
    const sectionProps = { isExiting, scrollDirection };

    switch (currentSection) {
      case "intro":
        return <IntroSection {...sectionProps} />;
      case "about":
        return <FirstSection {...sectionProps} />;
      case "experience":
        return <SecondSection {...sectionProps} />;
      case "contact":
        return <ThirdSection {...sectionProps} />;
      default:
        return <IntroSection {...sectionProps} />;
    }
  };

  useEffect(() => {
    setParticlePositions(
      Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  const updateParticlePosition = (index: number) => {
    setParticlePositions((prev) =>
      prev.map((pos, i) =>
        i === index
          ? { left: Math.random() * 100, top: Math.random() * 100 }
          : pos
      )
    );
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling || isExiting) return;

      setIsScrolling(true);

      const currentIndex = sections.indexOf(currentSection);

      if (e.deltaY > 0) {
        // Scroll down
        if (currentIndex < sections.length - 1) {
          setIsExiting(true);
          setScrollDirection("down");
          setTimeout(() => {
            setCurrentSection(sections[currentIndex + 1]);
            setIsExiting(false);
          }, 500);
        } else {
          setIsScrolling(false);
          return;
        }
      } else {
        // Scroll up
        if (currentIndex > 0) {
          setIsExiting(true);
          setScrollDirection("up");
          setTimeout(() => {
            setCurrentSection(sections[currentIndex - 1]);
            setIsExiting(false);
          }, 500);
        } else {
          setIsScrolling(false);
          return;
        }
      }

      setTimeout(() => setIsScrolling(false), 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, isScrolling, isExiting]);

  const currentSectionIndex = sections.indexOf(currentSection);
  const progressPercentage =
    (currentSectionIndex / (sections.length - 1)) * 100;

  // Handle progressive lighting animation
  useEffect(() => {
    if (animatingToIndex !== null && animatingToIndex !== currentSectionIndex) {
      const startIndex = currentSectionIndex;
      const endIndex = animatingToIndex;
      const isMovingForward = endIndex > startIndex;
      const totalSteps = Math.abs(endIndex - startIndex);
      const stepDuration = 800 / totalSteps; // Total animation time divided by steps

      // Reset to current position
      setProgressivelyLitIndices(
        Array.from({ length: startIndex + 1 }, (_, i) => i)
      );

      // Animate through each step
      for (let step = 1; step <= totalSteps; step++) {
        setTimeout(() => {
          const targetIndex = isMovingForward
            ? startIndex + step
            : startIndex - step;
          if (isMovingForward) {
            setProgressivelyLitIndices((prev) => [...prev, targetIndex]);
          } else {
            setProgressivelyLitIndices(
              Array.from({ length: targetIndex + 1 }, (_, i) => i)
            );
          }
        }, step * stepDuration);
      }

      // Clear animation state after completion
      setTimeout(() => {
        setAnimatingToIndex(null);
      }, 800);
    }
  }, [animatingToIndex, currentSectionIndex]);

  // Update progressively lit indices when section changes normally
  useEffect(() => {
    if (animatingToIndex === null) {
      setProgressivelyLitIndices(
        Array.from({ length: currentSectionIndex + 1 }, (_, i) => i)
      );
    }
  }, [currentSectionIndex, animatingToIndex]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden bg-gradient-to-br from-black via-blue-900 to-purple-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden sm:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="relative">
          {/* Background track - centered */}
          <div className="w-0.5 h-30 bg-white/20 rounded-full backdrop-blur-sm absolute left-1/2 transform -translate-x-1/2">
            {/* Progress fill */}
            <motion.div
              className="w-full bg-gradient-to-b from-purple-400 via-blue-400 to-purple-600 rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                boxShadow:
                  "0 0 8px rgba(168, 85, 247, 0.6), 0 0 16px rgba(168, 85, 247, 0.3)",
              }}
            />
          </div>

          {/* Section indicators and labels */}
          <div className="h-32 flex flex-col justify-between relative">
            {sections.map((section, index) => (
              <div key={section} className="relative flex items-center">
                {/* Section label */}
                <motion.div
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm whitespace-nowrap border border-white/20 cursor-pointer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: index === currentSectionIndex ? 1 : 1,
                    x: 0,
                    scale: index === currentSectionIndex ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => {
                    if (
                      !isScrolling &&
                      !isExiting &&
                      index !== currentSectionIndex
                    ) {
                      setAnimatingToIndex(index);
                      setIsExiting(true);
                      setScrollDirection(
                        index > currentSectionIndex ? "down" : "up"
                      );
                      setTimeout(() => {
                        setCurrentSection(sections[index]);
                        setIsExiting(false);
                      }, 500);
                    }
                  }}
                  whileHover={{
                    scale: index === currentSectionIndex ? 1.05 : 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow:
                      index === currentSectionIndex
                        ? "0 0 15px rgba(168, 85, 247, 0.4)"
                        : "0 2px 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.div>

                {/* Section indicator dot - centered on the progress bar */}
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-300 relative z-10 ${
                    progressivelyLitIndices.includes(index)
                      ? "bg-gradient-to-br from-blue-400 to-blue-400 border-purple-300"
                      : "bg-gray-700 border-blue-400 hover:border-white"
                  }`}
                  onClick={() => {
                    if (
                      !isScrolling &&
                      !isExiting &&
                      index !== currentSectionIndex
                    ) {
                      setAnimatingToIndex(index);
                      setIsExiting(true);
                      setScrollDirection(
                        index > currentSectionIndex ? "down" : "up"
                      );
                      setTimeout(() => {
                        setCurrentSection(sections[index]);
                        setIsExiting(false);
                      }, 500);
                    }
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    boxShadow: progressivelyLitIndices.includes(index)
                      ? "0 0 12px rgba(168, 85, 247, 0.8)"
                      : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile progress bar */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 sm:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="relative">
          {/* Section labels for mobile */}
          <div className="absolute -top-12 left-0 w-40 flex justify-between">
            {sections.map((section, index) => (
              <motion.div
                key={section}
                className={`text-xs text-white px-2 py-1 rounded bg-black backdrop-blur-sm border border-white transition-all duration-300 cursor-pointer ${
                  index === currentSectionIndex ? "scale-105" : ""
                }`}
                onClick={() => {
                  if (
                    !isScrolling &&
                    !isExiting &&
                    index !== currentSectionIndex
                  ) {
                    setAnimatingToIndex(index);
                    setIsExiting(true);
                    setScrollDirection(
                      index > currentSectionIndex ? "down" : "up"
                    );
                    setTimeout(() => {
                      setCurrentSection(sections[index]);
                      setIsExiting(false);
                    }, 500);
                  }
                }}
                whileHover={{
                  scale: index === currentSectionIndex ? 1.05 : 1.02,
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow:
                    index === currentSectionIndex
                      ? "0 0 10px rgba(168, 85, 247, 0.4)"
                      : "none",
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.div>
            ))}
          </div>

          {/* Background track - centered */}
          <div className="h-0.5 w-40 bg-white/40 rounded-full backdrop-blur-sm absolute top-1/2 transform -translate-y-1/2">
            {/* Progress fill */}
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                boxShadow:
                  "0 0 16px rgba(255,255,255,0.9), 0 0 32px rgba(255,255,255,0.7)",
              }}
            />
          </div>

          {/* Section indicators - centered on the progress bar */}
          <div className="w-40 flex justify-between relative z-10">
            {sections.map((section, index) => (
              <motion.div
                key={section}
                className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                  progressivelyLitIndices.includes(index)
                    ? "bg-gradient-to-br from-purple-900 to-blue-900 border-purple-300"
                    : "bg-gray-700 border-gray-500 hover:border-white"
                }`}
                onClick={() => {
                  if (
                    !isScrolling &&
                    !isExiting &&
                    index !== currentSectionIndex
                  ) {
                    setAnimatingToIndex(index);
                    setIsExiting(true);
                    setScrollDirection(
                      index > currentSectionIndex ? "down" : "up"
                    );
                    setTimeout(() => {
                      setCurrentSection(sections[index]);
                      setIsExiting(false);
                    }, 500);
                  }
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  boxShadow: progressivelyLitIndices.includes(index)
                    ? "0 0 8px rgba(168, 85, 247, 0.6)"
                    : "none",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {sections.indexOf(currentSection) > 0 && (
        <motion.header
          className="row-start-1 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="cursor-pointer select-none"
            onClick={goToPreviousSection}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              <ChevronUpIcon className="w-12 h-12 text-white group-hover:text-purple-400 transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </motion.header>
      )}

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            animate={{
              y: [-20, -120],
              x: [0, Math.sin(i) * 50],
              opacity: [0, 0.8, 0],
              boxShadow: [
                "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
                "0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)",
                "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
              ],
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: i * 0.2,
            }}
            onAnimationComplete={() => updateParticlePosition(i)}
            style={{
              left: `${particlePositions[i]?.left || 0}%`,
              top: `${particlePositions[i]?.top || 0}%`,
            }}
          />
        ))}
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start z-10">
        <div className="w-full justify-center">{renderCurrentSection()}</div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center z-10">
        {sections.indexOf(currentSection) < sections.length - 1 && (
          <motion.div
            className="cursor-pointer select-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onClick={goToNextSection}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              <ChevronDownIcon className="w-12 h-12 text-white group-hover:text-purple-400 transition-colors duration-300" />
            </motion.div>
          </motion.div>
        )}
      </footer>
    </div>
  );
}
