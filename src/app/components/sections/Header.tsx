import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";
import melangeLogoImage from "@/assets/logo.png";

const globalRegions = [
  {
    continent: "Asia",
    countries: [
      {
        label: "India",
        flag: "🇮🇳",
        href: "https://melangedigital.co/india",
        cities: [
          {
            label: "Goa",
            href: "https://melangedigital.co/india/digital-marketing-agency-goa/",
          },
          {
            label: "Mumbai",
            href: "https://melangedigital.co/india/digital-marketing-agency-mumbai/",
          },
          {
            label: "Delhi",
            href: "https://melangedigital.co/india/digital-marketing-agency-delhi/",
          },
        ],
      },
      {
        label: "Singapore",
        flag: "🇸🇬",
        href: "https://melangedigital.co/singapore",
        cities: [
          {
            label: "Singapore",
            href: "https://melangedigital.co/singapore/digital-marketing-agency-singapore/",
          },
        ],
      },
      {
        label: "UAE",
        flag: "🇦🇪",
        href: "https://melangedigital.co/uae",
        cities: [
          {
            label: "Dubai",
            href: "https://melangedigital.co/uae/digital-marketing-agency-dubai/",
          },
        ],
      },
    ],
  },
  {
    continent: "Europe",
    countries: [
      {
        label: "United Kingdom",
        flag: "🇬🇧",
        href: "https://melangedigital.co/uk",
        cities: [
          {
            label: "London",
            href: "https://melangedigital.co/uk/digital-marketing-agency-london/",
          },
        ],
      },
    ],
  },
  {
    continent: "Africa",
    countries: [
      {
        label: "Zambia",
        flag: "🇿🇲",
        href: "https://melangedigital.co/zambia",
        cities: [
          {
            label: "Lusaka",
            href: "https://melangedigital.co/zambia/digital-marketing-agency-lusaka/",
          },
        ],
      },
    ],
  },
];

const allCountries = globalRegions.flatMap((region) =>
  region.countries.map((country) => ({
    ...country,
    continent: region.continent,
  }))
);

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#Work" },
  { label: "About Us", href: "https://melangedigital.co/about" },
  { label: "Blogs", href: "https://melangedigital.co/blogs" },
  { label: "Careers", href: "https://melangedigital.co/careers" },
];

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isGlobalOpen, setGlobalOpen] = useState(false);
  const [isMobileGlobalOpen, setMobileGlobalOpen] = useState(false);
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState(allCountries[0]);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => setMenuOpen((v) => !v);

  const openGlobal = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setGlobalOpen(true);
  };

  const closeGlobal = () => {
    hoverTimeout.current = setTimeout(() => setGlobalOpen(false), 120);
  };

  const toggleCountry = (label: string) => {
    setOpenCountry((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217,64,255,0.55); }
          65% { box-shadow: 0 0 0 7px rgba(217,64,255,0); }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .main-navbar {
          background: #ffffff;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
        }

        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-size: 16px;
          font-weight: 700;
          color: #333333;
          text-decoration: none;
          transition: color 0.25s ease;
          white-space: nowrap;
          line-height: 1;
          padding: 6px 0;
        }

        .nav-link:hover {
          color: #b44cff;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 0;
          height: 2px;
          border-radius: 999px;
          background: #b44cff;
          transition: width 0.28s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .global-trigger-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .global-trigger {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          color: #333333;
          cursor: pointer;
          transition: color 0.25s ease;
          white-space: nowrap;
        }

        .global-trigger:hover,
        .global-trigger.is-open {
          color: #b44cff;
        }

        .global-chevron {
          width: 11px;
          height: 11px;
          opacity: 0.45;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .global-trigger.is-open .global-chevron {
          transform: rotate(180deg);
          opacity: 1;
        }

        .global-dropdown {
          position: absolute;
          top: calc(100% + 24px);
          left: 0;
          width: 580px;
          background: #0e0e14;
          border: 1px solid rgba(217, 64, 255, 0.2);
          border-radius: 20px;
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.7);
          z-index: 300;
          overflow: hidden;
          animation: fadeSlideIn 0.18s ease forwards;
          display: flex;
          flex-direction: column;
        }

        .drop-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .drop-pulse {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #d940ff;
          animation: pulseGlow 2s infinite;
          flex-shrink: 0;
        }

        .drop-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(217, 64, 255, 0.8);
        }

        .drop-panels {
          display: flex;
          min-height: 0;
        }

        .drop-left {
          width: 210px;
          flex-shrink: 0;
          padding: 12px 10px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }

        .continent-label {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(217, 64, 255, 0.45);
          padding: 8px 8px 4px;
          margin-top: 2px;
        }

        .continent-label:first-child {
          margin-top: 0;
        }

        .country-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 10px;
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .country-row:hover {
          background: rgba(217, 64, 255, 0.08);
          border-color: rgba(217, 64, 255, 0.2);
        }

        .country-row.active {
          background: rgba(217, 64, 255, 0.12);
          border-color: rgba(217, 64, 255, 0.3);
        }

        .country-name {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
        }

        .country-arrow {
          font-size: 14px;
          color: rgba(217, 64, 255, 0.4);
        }

        .country-row.active .country-arrow {
          color: #d940ff;
        }

        .drop-right {
          flex: 1;
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }

        .selected-name {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .selected-continent {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(217, 64, 255, 0.55);
          margin-top: 2px;
        }

        .drop-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          border: none;
          margin: 0;
        }

        .cities-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
          margin-bottom: 8px;
        }

        .city-cards {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .city-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 13px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .city-card:hover {
          background: rgba(217, 64, 255, 0.1);
          border-color: rgba(217, 64, 255, 0.3);
        }

        .city-name {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }

        .city-arrow {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.25);
        }

        .city-card:hover .city-arrow {
          color: #d940ff;
        }

        .visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: rgba(217, 64, 255, 0.12);
          border: 1px solid rgba(217, 64, 255, 0.25);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(217, 64, 255, 0.9);
          text-decoration: none;
          transition: background 0.15s ease, border-color 0.15s ease;
          align-self: flex-start;
        }

        .visit-btn:hover {
          background: rgba(217, 64, 255, 0.2);
          border-color: rgba(217, 64, 255, 0.45);
          color: #d940ff;
        }

        .mobile-panel {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 18px 40px rgba(0,0,0,0.08);
        }

        .mobile-global-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          font: inherit;
          text-align: left;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          color: #333333;
          padding: 0;
        }

        .mobile-global-label {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-size: 22px;
          font-weight: 600;
          color: #333333;
          line-height: 1;
          padding: 6px 0;
        }

        .mobile-global-label::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 0;
          height: 2px;
          border-radius: 999px;
          background: #b44cff;
          transition: width 0.28s ease;
        }

        .mobile-global-btn:hover .mobile-global-label,
        .mobile-global-btn.open .mobile-global-label {
          color: #b44cff;
        }

        .mobile-global-btn:hover .mobile-global-label::after,
        .mobile-global-btn.open .mobile-global-label::after {
          width: 100%;
        }

        .mobile-chevron {
          width: 13px;
          height: 13px;
          color: #1a1a1a;
          opacity: 0.35;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .mobile-chevron.open {
          transform: rotate(180deg);
        }

        .mobile-country-list {
          padding-left: 14px;
          width: 100%;
        }

        .mobile-country-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 9px 0;
        }

        .mobile-country-link {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #1a1a1a;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          flex: 1;
        }

        .mobile-country-link:hover {
          color: #d940ff;
        }

        .mobile-flag {
          font-size: 17px;
          line-height: 1;
        }

        .mobile-country-chevron {
          width: 11px;
          height: 11px;
          color: #1a1a1a;
          opacity: 0.25;
          transition: transform 0.2s ease;
          flex-shrink: 0;
          cursor: pointer;
          padding: 4px;
        }

        .mobile-country-chevron.open {
          transform: rotate(180deg);
          opacity: 0.5;
        }

        .mobile-city-list {
          padding-left: 28px;
          padding-bottom: 4px;
          width: 100%;
        }

        .mobile-city-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 0;
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        .mobile-city-link:last-child {
          border-bottom: none;
        }

        .mobile-city-link:hover {
          color: #d940ff;
        }

        .mobile-city-arrow {
          font-size: 10px;
          color: #ccc;
        }

        .mobile-city-link:hover .mobile-city-arrow {
          color: #d940ff;
        }

        @media (max-width: 1270px) {
          .global-dropdown {
            width: 540px;
          }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="main-navbar">
          <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-10">
            <div className="flex h-14 sm:h-[86px] items-center justify-between gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="flex shrink-0 items-center overflow-hidden w-[140px] sm:w-[220px] lg:w-[250px] h-[46px] sm:h-[72px]"
              >
                <a href="/" className="block h-full w-full">
                  <img
                    src={melangeLogoImage}
                    alt="Mélange Digital"
                    className="h-full w-full object-contain"
                  />
                </a>
              </motion.div>

              <div className="hidden sm:flex items-center justify-end gap-6 lg:gap-8 min-w-0 flex-1">
                <nav className="flex items-center gap-5 md:gap-7 lg:gap-9 min-w-0">
                  <div
                    className="global-trigger-wrap"
                    onMouseEnter={openGlobal}
                    onMouseLeave={closeGlobal}
                  >
                    <button
                      className={`global-trigger ${isGlobalOpen ? "is-open" : ""}`}
                    >
                      Global
                      <svg
                        className="global-chevron"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {isGlobalOpen && (
                      <div className="global-dropdown">
                        <div className="drop-header">
                          <span className="drop-pulse" />
                          <span className="drop-title">We're Global</span>
                        </div>

                        <div className="drop-panels">
                          <div className="drop-left">
                            {globalRegions.map((region) => (
                              <div key={region.continent}>
                                <div className="continent-label">
                                  {region.continent}
                                </div>

                                {region.countries.map((country) => {
                                  const isActive =
                                    hoveredCountry.label === country.label;

                                  return (
                                    <div
                                      key={country.label}
                                      className={`country-row ${isActive ? "active" : ""}`}
                                      onMouseEnter={() =>
                                        setHoveredCountry({
                                          ...country,
                                          continent: region.continent,
                                        })
                                      }
                                    >
                                      <span className="country-name">
                                        {country.label}
                                      </span>
                                      <span className="country-arrow">›</span>
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>

                          <div className="drop-right">
                            <div>
                              <div className="selected-name">
                                {hoveredCountry.label}
                              </div>
                              <div className="selected-continent">
                                {hoveredCountry.continent}
                              </div>
                            </div>

                            <hr className="drop-divider" />

                            <div>
                              <div className="cities-label">Cities we serve</div>
                              <div className="city-cards">
                                {hoveredCountry.cities.map((city) => (
                                  <a
                                    key={city.label}
                                    href={city.href}
                                    className="city-card"
                                  >
                                    <span className="city-name">{city.label}</span>
                                    <span className="city-arrow">↗</span>
                                  </a>
                                ))}
                              </div>
                            </div>

                            <a
                              href={hoveredCountry.href}
                              className="visit-btn"
                            >
                              Visit {hoveredCountry.label} page ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {NAV_ITEMS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="nav-link"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {label}
                    </a>
                  ))}
                </nav>

                <a href="#contact" className="shrink-0">
                  <PrimaryButton variant="dark">Contact Us</PrimaryButton>
                </a>
              </div>

              <div className="sm:hidden shrink-0">
                <button
                  onClick={toggleMenu}
                  className="text-[#0F172A] hover:text-[#B44CFF] transition-colors"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? (
                    <X className="w-8 h-8" />
                  ) : (
                    <Menu className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-panel sm:hidden">
            <div className="flex flex-col items-start px-6 pt-6 pb-10 space-y-6">
              {[...NAV_ITEMS, { label: "Contact Us", href: "#contact" }].map(
                ({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[22px] font-semibold text-[#333333] hover:text-[#B44CFF] transition-colors"
                    onClick={() => setMenuOpen(false)}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </a>
                )
              )}

              <div className="w-full">
                <button
                  className={`mobile-global-btn ${isMobileGlobalOpen ? "open" : ""}`}
                  onClick={() => setMobileGlobalOpen((v) => !v)}
                >
                  <span className="mobile-global-label">Global</span>
                  <svg
                    className={`mobile-chevron ${isMobileGlobalOpen ? "open" : ""}`}
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isMobileGlobalOpen && (
                  <div className="mobile-country-list">
                    {globalRegions.flatMap((region) =>
                      region.countries.map((country) => (
                        <div key={country.label} className="w-full">
                          <div className="mobile-country-row">
                            <a
                              href={country.href}
                              className="mobile-country-link"
                            >
                              <span className="mobile-flag">{country.flag}</span>
                              {country.label}
                            </a>

                            <svg
                              className={`mobile-country-chevron ${
                                openCountry === country.label ? "open" : ""
                              }`}
                              viewBox="0 0 10 6"
                              fill="none"
                              onClick={() => toggleCountry(country.label)}
                            >
                              <path
                                d="M1 1L5 5L9 1"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {openCountry === country.label && (
                            <div className="mobile-city-list">
                              {country.cities.map((city) => (
                                <a
                                  key={city.label}
                                  href={city.href}
                                  className="mobile-city-link"
                                >
                                  {city.label}
                                  <span className="mobile-city-arrow">↗</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}