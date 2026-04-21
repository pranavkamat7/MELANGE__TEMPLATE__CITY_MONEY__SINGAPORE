import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";
import melangeLogoImage from "@/assets/logo.png";

// FlagImg: renders a proper flag image from flagcdn.com — works on all OS including Windows
const FlagImg = ({ code, size = 20 }: { code: string; size?: number }) => (
  <img
    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
    srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
    width={size}
    height={Math.round(size * 0.75)}
    alt=""
    style={{
      borderRadius: "3px",
      objectFit: "cover",
      flexShrink: 0,
      display: "inline-block",
      verticalAlign: "middle",
    }}
  />
);

const globalRegions = [
  {
    continent: "Asia",
    countries: [
      {
        label: "India",
        code: "in",
        href: "https://melangedigital.co/india",
        cities: [
          { label: "Goa", href: "https://melangedigital.co/india/digital-marketing-agency-goa/" },
          { label: "Mumbai", href: "https://melangedigital.co/india/digital-marketing-agency-mumbai/" },
          { label: "Delhi", href: "https://melangedigital.co/india/digital-marketing-agency-delhi/" },
        ],
      },
      {
        label: "UAE",
        code: "ae",
        href: "https://melangedigital.co/uae",
        cities: [
          { label: "Dubai", href: "https://melangedigital.co/uae/digital-marketing-agency-dubai/" },
        ],
      },
      {
        label: "Zambia",
        code: "zm",
        href: "https://melangedigital.co/zambia",
        cities: [
          { label: "Lusaka", href: "https://melangedigital.co/zambia/digital-marketing-agency-lusaka/" },
        ],
      },
      {
        label: "Singapore",
        code: "sg",
        href: "https://melangedigital.co/singapore",
        cities: [
          { label: "Singapore", href: "https://melangedigital.co/singapore/digital-marketing-agency-singapore/" },
        ],
      },
      {
        label: "United Kingdom",
        code: "gb",
        href: "https://melangedigital.co/uk",
        cities: [
          { label: "London", href: "https://melangedigital.co/uk/digital-marketing-agency-london/" },
        ],
      },
    ],
  },
];

const allCountries = globalRegions.flatMap((r) => r.countries);

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
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isMobileGlobalOpen, setMobileGlobalOpen] = useState(false);
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const globalWrapRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((v) => !v);

  const openGlobal = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setGlobalOpen(true);
  };

  const closeGlobal = () => {
    hoverTimeout.current = setTimeout(() => {
      setGlobalOpen(false);
      setHoveredCountry(null);
    }, 150);
  };

  const toggleCountry = (label: string) => {
    setOpenCountry((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
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
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    return () => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeCitiesIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
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

        .nav-link:hover { color: #b44cff; }

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

        .nav-link:hover::after { width: 100%; }

        /* ── Global trigger ── */
        .nb-global-outer {
          position: relative;
        }

        .nb-global-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 6px 0;
          font: inherit;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          color: #333333;
          cursor: pointer;
          transition: color 0.25s ease;
          white-space: nowrap;
          position: relative;
        }

        .nb-global-btn::after {
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

        .nb-global-btn:hover,
        .nb-global-btn.nb-active {
          color: #b44cff;
        }

        .nb-global-btn:hover::after,
        .nb-global-btn.nb-active::after {
          width: 100%;
        }

        .nb-chevron {
          width: 11px;
          height: 11px;
          opacity: 0.45;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .nb-global-btn.nb-active .nb-chevron {
          transform: rotate(180deg);
          opacity: 1;
        }

        /* Invisible bridge fills the gap between button and dropdown */
        .nb-hover-bridge {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: min(900px, calc(100vw - 40px));
          height: 20px;
          z-index: 299;
        }

        /* ── Dropdown ── */
        .nb-dropdown-wrap {
          position: absolute;
          top: calc(100% + 16px);
          left: 50%;
          transform: translateX(-50%);
          width: min(900px, calc(100vw - 40px));
          z-index: 300;
        }

        .nb-dropdown {
          width: 100%;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(24px) saturate(1.6);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.04);
          padding: 12px 10px;
          animation: fadeSlideIn 0.18s ease forwards;
        }

        .nb-country-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          align-items: center;
        }

        .nb-country-col {
          min-width: 0;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: background 0.18s ease, border-color 0.18s ease;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .nb-country-col:hover {
          background: rgba(180, 76, 255, 0.05);
          border-color: rgba(180, 76, 255, 0.12);
        }

        .nb-country-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          color: #1a1a1a;
          font-weight: 800;
          font-size: 14px;
          line-height: 1.2;
        }

        .nb-country-col:hover .nb-country-link { color: #b44cff; }

        .nb-country-name { white-space: nowrap; }

        /* City popover */
        .nb-city-popover {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          min-width: 160px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(180, 76, 255, 0.12);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          padding: 6px;
          z-index: 400;
          animation: fadeCitiesIn 0.14s ease forwards;
        }

        .nb-city-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          text-decoration: none;
          color: #333;
          font-size: 13px;
          font-weight: 600;
          padding: 7px 10px;
          border-radius: 8px;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .nb-city-link:hover {
          color: #b44cff;
          background: rgba(180, 76, 255, 0.07);
        }

        .nb-city-arrow {
          font-size: 9px;
          color: #ccc;
          transition: color 0.15s ease;
        }

        .nb-city-link:hover .nb-city-arrow { color: #b44cff; }

        /* ── Mobile ── */
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
          font-size: 22px;
          font-weight: 600;
          color: #333333;
          line-height: 1;
          padding: 6px 0;
          transition: color 0.2s ease;
        }

        .mobile-global-btn:hover .mobile-global-label,
        .mobile-global-btn.open .mobile-global-label {
          color: #b44cff;
        }

        .mb-g-chev {
          width: 13px;
          height: 13px;
          color: #1a1a1a;
          opacity: 0.35;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .mb-g-chev.open { transform: rotate(180deg); }

        .mb-country-list { padding-left: 14px; width: 100%; }

        .mb-country-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 9px 0;
        }

        .mb-country-link {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #1a1a1a;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          flex: 1;
        }

        .mb-country-link:hover { color: #b44cff; }

        .mb-c-chev {
          width: 11px;
          height: 11px;
          color: #1a1a1a;
          opacity: 0.25;
          transition: transform 0.2s ease;
          flex-shrink: 0;
          cursor: pointer;
          padding: 4px;
        }

        .mb-c-chev.open { transform: rotate(180deg); opacity: 0.5; }

        .mb-city-list {
          padding-left: 28px;
          padding-bottom: 4px;
          width: 100%;
        }

        .mb-city-link {
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

        .mb-city-link:last-child { border-bottom: none; }
        .mb-city-link:hover { color: #b44cff; }

        .mb-city-arr { font-size: 10px; color: #ccc; }
        .mb-city-link:hover .mb-city-arr { color: #b44cff; }

        @media (max-width: 1200px) {
          .nb-country-row { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 900px) {
          .nb-country-row { grid-template-columns: repeat(2, 1fr); }
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

              {/* Desktop nav */}
              <div className="hidden sm:flex items-center justify-end gap-6 lg:gap-8 min-w-0 flex-1">
                <nav className="flex items-center gap-5 md:gap-7 lg:gap-9 min-w-0">

                  {/* Global dropdown — hover with bridge to prevent flicker */}
                  <div
                    className="nb-global-outer"
                    ref={globalWrapRef}
                    onMouseEnter={openGlobal}
                    onMouseLeave={closeGlobal}
                  >
                    <button className={`nb-global-btn ${isGlobalOpen ? "nb-active" : ""}`}>
                      Global
                      <svg className="nb-chevron" viewBox="0 0 10 6" fill="none">
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
                      <>
                        {/* Invisible bridge covers the gap so hover doesn't break */}
                        <div className="nb-hover-bridge" />

                        <div className="nb-dropdown-wrap">
                          <div className="nb-dropdown">
                            <div className="nb-country-row">
                              {allCountries.map((country) => (
                                <div
                                  key={country.label}
                                  className="nb-country-col"
                                  onMouseEnter={() => setHoveredCountry(country.label)}
                                  onMouseLeave={() => setHoveredCountry(null)}
                                >
                                  <a href={country.href} className="nb-country-link">
                                    <FlagImg code={country.code} size={22} />
                                    <span className="nb-country-name">{country.label}</span>
                                  </a>

                                  {hoveredCountry === country.label && (
                                    <div className="nb-city-popover">
                                      {country.cities.map((city) => (
                                        <a key={city.label} href={city.href} className="nb-city-link">
                                          <span>{city.label}</span>
                                          <span className="nb-city-arrow">↗</span>
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
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

              {/* Mobile hamburger */}
              <div className="sm:hidden shrink-0">
                <button
                  onClick={toggleMenu}
                  className="text-[#0F172A] hover:text-[#B44CFF] transition-colors"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
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

              {/* Mobile Global */}
              <div className="w-full">
                <button
                  className={`mobile-global-btn ${isMobileGlobalOpen ? "open" : ""}`}
                  onClick={() => setMobileGlobalOpen((v) => !v)}
                >
                  <span className="mobile-global-label">Global</span>
                  <svg
                    className={`mb-g-chev ${isMobileGlobalOpen ? "open" : ""}`}
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
                  <div className="mb-country-list">
                    {allCountries.map((country) => (
                      <div key={country.label} className="w-full">
                        <div className="mb-country-row">
                          <a href={country.href} className="mb-country-link">
                            <FlagImg code={country.code} size={20} />
                            {country.label}
                          </a>
                          <svg
                            className={`mb-c-chev ${openCountry === country.label ? "open" : ""}`}
                            viewBox="0 0 10 6"
                            fill="none"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCountry(country.label);
                            }}
                            style={{ cursor: "pointer" }}
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
                          <div className="mb-city-list">
                            {country.cities.map((city) => (
                              <a key={city.label} href={city.href} className="mb-city-link">
                                {city.label}
                                <span className="mb-city-arr">↗</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
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