import { motion } from "motion/react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { Mail, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#0B0B12] py-32 lg:py-10 overflow-hidden"
    >
      {/* Ambient Gradient Orbs */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-[#D540FF]/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-[700px] h-[700px] bg-[#3858FF]/20 blur-[150px] rounded-full" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">Let’s Build</span>
            <br />
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              Something Serious
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 mt-6 max-w-2xl mx-auto">
            Tell us where you are, where you want to go, and we’ll design the
            system that gets you there.
          </p>
        </motion.div>

        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: Zoho Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Gradient Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-[#D540FF] via-[#7F4EFF] to-[#3858FF] rounded-3xl opacity-60 blur-sm" />

            <div className="relative bg-[#0B0B12] rounded-3xl p-4 md:p-6 border border-white/10">
              <iframe
                aria-label="Contact Us"
                src="https://forms.zohopublic.in/melangedigital1/form/ContactUs/formperma/CFr6Vz2sCXYmO43F37rMgBIO95D3unguz-rJXVE-b20"
                frameBorder="0"
                style={{
                  height: "500px",
                  width: "100%",
                  border: "none",
                  background: "transparent",
                }}
                className="rounded-2xl"
              />
            </div>
          </motion.div>

          {/* RIGHT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/20 transition-all duration-300 group">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Direct Line
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:hello@melangedigital.co"
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300"
                >
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/15 transition">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg">hello@melangedigital.co</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+65 85815811"
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300"
                >
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/15 transition">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg">+65 8581 5811</span>
                </a>
              </div>
            </div>

            

            <p className="text-white/40 text-sm max-w-md">
              We work with brands ready to dominate their category — not just
              participate in it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
