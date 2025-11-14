"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaPhone, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";

interface ThirdSectionProps {
  isExiting?: boolean;
  scrollDirection?: "up" | "down";
}

export default function ThirdSection({ isExiting = false, scrollDirection = "down" }: ThirdSectionProps) {
  const [animationsComplete, setAnimationsComplete] = useState(false);

  useEffect(() => {
    // Enable hover animations after initial animations complete
    const timer = setTimeout(() => {
      setAnimationsComplete(true);
    }, 3000); // Adjust based on your longest animation delay

    return () => clearTimeout(timer);
  }, []);

  const contactItems = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "azzamgm1412h@gmail.com",
      href: "mailto:azzamgm1412h@gmail.com",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "Azzam Al-Maimani",
      href: "https://www.linkedin.com/in/azzam-al-maimani-2b0350212/",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "AzzamGM",
      href: "https://github.com/AzzamGM",
      color: "from-gray-700 to-gray-500"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+966539096444",
      href: "tel:+966539096444",
      color: "from-green-500 to-emerald-500"
    }
  ];

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
          Contact Me
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-200 text-center sm:text-left mt-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      >
        Let&apos;s connect and discuss opportunities to work together!
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          
          return (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : '_self'}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isExiting ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: isExiting ? 0 : 1.2 + (index * 0.2), 
                ease: "easeOut" 
              }}
              whileHover={animationsComplete && !isExiting ? { scale: 1.02, y: -5 } : {}}
              whileTap={animationsComplete && !isExiting ? { scale: 0.98 } : {}}
            >
              <motion.div
                className="flex items-center space-x-4"
                initial={{ x: -20 }}
                animate={isExiting ? { x: -20 } : { x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + (index * 0.2) }}
              >
                <motion.div
                  className={`p-3 rounded-full bg-gradient-to-r ${item.color} group-hover:shadow-lg transition-shadow duration-300`}
                  whileHover={animationsComplete && !isExiting ? { rotate: 5 } : {}}
                >
                  <IconComponent className="text-white text-xl" />
                </motion.div>
                
                <div className="flex-1">
                  <motion.h3
                    className="text-white font-semibold text-lg mb-1"
                    initial={{ opacity: 0 }}
                    animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.6 + (index * 0.2) }}
                  >
                    {item.label}
                  </motion.h3>
                  
                  <motion.p
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-medium group-hover:text-white transition-all duration-300`}
                    initial={{ opacity: 0 }}
                    animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 + (index * 0.2) }}
                  >
                    {item.value}
                  </motion.p>
                </div>
              </motion.div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
      >
        <motion.p
          className="text-gray-300 text-lg"
          animate={isExiting ? { opacity: 0 } : {
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: isExiting ? 0 : Infinity, delay: isExiting ? 0 : 3 }}
        >
          I'm always excited to discuss new projects and opportunities!
        </motion.p>
      </motion.div>
    </>
  );
}