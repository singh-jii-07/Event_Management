import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/195px-Apple_logo_black.svg.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png" },
];

const DoubledSponsors = [...sponsors, ...sponsors];

function Sponsors() {
  return (
    <section className="py-16 overflow-hidden" style={{ background: "#080E1A", borderTop: "1px solid rgba(30,41,59,0.5)" }}>
      <div className="section-container mb-8 text-center">
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">Trusted by Leading Companies</p>
      </div>
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex items-center gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {DoubledSponsors.map(({ name, logo }, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-10 flex items-center justify-center opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
              style={{ minWidth: "120px" }}
            >
              <img src={logo} alt={name} className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" style={{ maxWidth: "120px" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Sponsors;
