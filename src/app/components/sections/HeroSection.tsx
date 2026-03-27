import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { MicroLabel } from "@/app/components/ui/MicroLabel";
import desktopHeroImg from "@/assets/desktopHeroImg.png";
import mobileHeroImg from "@/assets/mobileHeroImg.png";

// Reusable hero components
function HeroContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Desktop Background Image */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src={desktopHeroImg}
          alt="Singapore skyline at dusk - Digital marketing agency Singapore serving Singapore businesses with SEO and Google Ads services"
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B12]/49 via-[#0B0B12]/35 to-[#0B0B12]/70" />
      </div>

      {/* Mobile Background Image */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={mobileHeroImg}
          alt="Singapore skyline - Premier digital marketing services in Singapore"
          className="w-full h-full object-cover"
          width="768"
          height="1024"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B12]/49 via-[#0B0B12]/35 to-[#0B0B12]/70" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center z-10 pt-[40px] md:pt-0">
        {children}
      </div>
    </section>
  );
}

function HeroHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[66px] md:text-[62px] lg:text-[70px] xl:text-[79px] font-bold mb-5 md:mb-8 tracking-tight leading-[0.95] text-white">
      {children}
    </h1>
  );
}

function HeroSubcopy({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-5 md:mb-12 leading-relaxed">
      <span className="block font-normal text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
        {children}
      </span>
    </div>
  );
}

function HeroActions({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center">{children}</div>;
}

function HeroMetaLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-[#9CA3AF] mt-6 tracking-wide">{children}</p>
  );
}

export function HeroSection() {
  return (
    <HeroContainer>
      <HeroHeadline>
        Digital Marketing Agency in{" "}
        <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
          Singapore
        </span>
      </HeroHeadline>

      <HeroSubcopy>
        We help businesses in Central Business District Singapore acquire qualified leads and increase revenue with SEO, Google Ads, and conversion strategies. Developing strategies that help buyers find, compare, and decide.      </HeroSubcopy>

      <HeroActions>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-3 md:mb-4">
          {/* Primary CTA with trust text */}
          <div
            className="flex flex-col items-center"
            style={{ cursor: "pointer" }}
          >
            <a
              href="https://cal.id/sanket-bolinjkar/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PrimaryButton className="w-auto min-w-[180px]">
                Get Audit
              </PrimaryButton>
            </a>
            <a
              href="https://cal.id/sanket-bolinjkar/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-xs text-white/60 mt-2 text-center">
                Free audit • No commitment
              </p>
            </a>
          </div>

          {/* Secondary CTA with trust text */}
          <div className="flex flex-col items-center">
            <a
              href="https://cal.id/sanket-bolinjkar/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PrimaryButton
                variant="outlined"
                className="w-auto min-w-[180px]"
              >
                Book Call
              </PrimaryButton>
            </a>
            <a
              href="https://cal.id/sanket-bolinjkar/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-xs text-white/60 mt-2 text-center">
                Speak with our Singapore team
              </p>
            </a>
          </div>
        </div>

        <MicroLabel className="mt-3 md:mt-6 mb-12 md:mb-0">
          <span className="block spectral-snake">
            STRUCTURED DIGITAL MARKETING FOR BUSINESSES 
          </span>
          <span className="block mt-1 spectral-snake">
            THAT MEASURE SUCCESS IN REVENUE AND REAL GROWTH.
          </span>
        </MicroLabel>
      </HeroActions>
    </HeroContainer>
  );
}
