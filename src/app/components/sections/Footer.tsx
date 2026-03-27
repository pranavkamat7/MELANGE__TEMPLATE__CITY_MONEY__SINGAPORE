import React from "react";
import { motion } from "framer-motion";
import instagram from "@/assets/caseimages/instagram.svg";
import linkedin from "@/assets/caseimages/linkedin.svg";


const StarIcon = () => (
  <svg viewBox="0 0 40 40" width="36" height="36" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0 C20 0 21.5 14 26 20 C31 26 40 20 40 20 C40 20 26 21.5 20 26 C14 31 20 40 20 40 C20 40 18.5 26 14 20 C9 14 0 20 0 20 C0 20 14 18.5 20 14 C26 9 20 0 20 0Z" />
  </svg>
);

export function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const serviceLinks = [
    {
      href: "https://melangedigital.co/services/brand-strategy",
      text: "Brand Strategy & Planning",
    },
    {
      href: "https://melangedigital.co/services/influencer-marketing",
      text: "Influencer Marketing",
    },
    {
      href: "https://melangedigital.co/services/immersive-brand-storytelling",
      text: "Immersive brand storytelling",
    },
    {
      href: "https://melangedigital.co/services/design-and-development",
      text: "Design & Development",
    },
    {
      href: "https://melangedigital.co/services/content-strategy-and-production",
      text: "Content Strategy & Production",
    },
    {
      href: "https://melangedigital.co/services/pr-and-outreach",
      text: "PR, IPs & Outreach",
    },
  ];

  const companyLinks = [
    { href: "#About", text: "About Us" },
    { href: "#services", text: "Our Work" },
    { href: "https://melangedigital.co/blogs", text: "Blogs" },
    { href: "https://melangedigital.co/careers", text: "Careers" },
  ];

  const letsTalkText = "Let's Talk".split("");

  const activePresence: string = "";

  type PresenceItem = {
    label: string;
    href: string;
  };

  const globalPresence: PresenceItem[] = [
    { label: "India", href: "https://melangedigital.co/india" },
    { label: "United Kingdom", href: "https://melangedigital.co/uk" },
    { label: "United Arab Emirates", href: "https://melangedigital.co/uae" },
    { label: "Singapore", href: "https://melangedigital.co/singapore" },
    { label: "Zambia", href: "https://melangedigital.co/zambia" },
  ];

  return (
    <div className="bg-[#1a1a1a] text-white font-bricolage">
      <footer className="max-container">

        {/* LET'S TALK */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          className="relative"
        >
          <div className="lg:px-28 px-5 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Let's Talk text */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              className="flex flex-wrap overflow-hidden"
            >
              {letsTalkText.map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                  className="text-white text-[73px] md:text-[205px] font-normal leading-none"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Button — right of text on desktop, below on mobile */}
            <motion.div
              className="shrink-0 lg:w-[25%] lg:flex lg:justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href="https://cal.id/sanket-bolinjkar/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#8b2fc9] text-white font-medium text-[16px] px-8 py-4 rounded-full hover:bg-[#a035e0] transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* MAIN FOOTER CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={staggerChildren}
          className="max-w-[1440px] mx-auto lg:px-20 px-5 pt-0 w-full flex-grow bg-[#1a1a1a]"
        >
          <motion.div className="w-full lg:grid lg:grid-cols-[1fr_1.4fr_0.9fr_1.1fr] block gap-x-5">

            {/* COL 1: Brand + Social + Contact */}
            <motion.div className="mb-10 lg:mb-0">
              <h2 className="text-[20px] md:text-[24px] font-semibold mb-8">
                Mélange Digital
              </h2>

              {/* SOCIAL */}
              <div className="mb-7">
                <h3 className="text-lg md:text-[20px] mb-2">Follow us</h3>
                <div className="flex mt-1">
                  <a
                    href="https://www.linkedin.com/company/melangedigital/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedin} alt="linkedin" className="w-[28px]" />
                  </a>
                  <a
                    href="https://www.instagram.com/melangedigital.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3"
                  >
                    <img src={instagram} alt="instagram" className="w-[28px]" />
                  </a>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <h3 className="text-lg md:text-[20px] mb-2">Email Us</h3>
                <a
                  href="mailto:hello@melangedigital.co"
                  className="text-[#DDDDDD] block text-[14px] lg:text-[16px]"
                >
                  hello@melangedigital.co
                </a>
              </div>
            </motion.div>

            {/* COL 2: SERVICES */}
            <motion.div className="mb-10 lg:mb-0">
              <motion.h2 className="text-[18px] md:text-[20px] mb-4">
                Our Services
              </motion.h2>
              <motion.div
                variants={staggerChildren}
                className="flex flex-col text-[#DDDDDD]"
              >
                {serviceLinks.map((service, index) => (
                  <motion.div key={index} whileHover={{ x: 10 }}>
                    <a
                      href={service.href}
                      className="mb-1 lg:text-[16px] text-[12px] block"
                    >
                      {service.text}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* COL 3: COMPANY */}
            <motion.div className="mb-10 lg:mb-0">
              <h2 className="text-lg md:text-[20px] mb-4">Company</h2>
              <div className="flex flex-col text-[#DDDDDD]">
                {companyLinks.map((link, index) => (
                  <motion.div key={index} whileHover={{ x: 10 }}>
                    <a
                      href={link.href}
                      className="mb-1 lg:text-[16px] text-[12px] block"
                    >
                      {link.text}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* COL 4: GLOBAL PRESENCE */}
            <motion.div className="mb-10 lg:mb-0">
              <h2 className="text-lg md:text-[20px] mb-4">
                Our Global Presence
              </h2>
              <div className="flex flex-col space-y-3 text-[#DDDDDD]">
                {globalPresence.map((item: PresenceItem) => {
                  const isActive = item.label === activePresence;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`text-[12px] lg:text-[16px] transition-colors ${
                        isActive
                          ? "text-[#d940ff]"
                          : "text-[#DDDDDD] hover:text-[#d940ff]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* COPYRIGHT */}
        <div className="py-8 lg:px-20 px-5 bg-[#1a1a1a]">
          <div className="h-0.5 bg-[#564f4f]" />
          <div className="text-[#DDDDDD] pt-3 lg:flex justify-between items-center">
            <div className="flex lg:flex-row flex-col lg:space-x-10">
              <a href="/terms-of-service">Terms of Service</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/cancellation-and-refund-policy">
                Cancellation & Refund Policy
              </a>
              <a href="/cookie-policy">Cookie Policy</a>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <p>© {new Date().getFullYear()} Mélange Digital. All rights reserved.</p>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}

export default Footer;
