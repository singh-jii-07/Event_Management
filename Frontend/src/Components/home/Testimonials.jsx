import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Enthusiast",
    avatar: "https://i.pravatar.cc/80?img=1",
    rating: 5,
    text: "EventHub completely changed how I discover events in my city. The booking process is seamless and I love getting notifications about events I'd actually enjoy!",
    event: "Tech Summit 2025",
  },
  {
    name: "Marcus Chen",
    role: "Music Producer",
    avatar: "https://i.pravatar.cc/80?img=2",
    rating: 5,
    text: "As an event organizer, EventHub has been a game-changer. My events consistently sell out faster than before. The platform just works beautifully.",
    event: "Music Festival",
  },
  {
    name: "Priya Sharma",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/80?img=3",
    rating: 5,
    text: "I attended three networking events through EventHub last month. Met amazing people and landed two partnerships. The quality of events listed here is unmatched.",
    event: "Startup Mixer",
  },
  {
    name: "David Williams",
    role: "Fitness Coach",
    avatar: "https://i.pravatar.cc/80?img=4",
    rating: 5,
    text: "The user interface is gorgeous. I can find sports and fitness events in seconds. EventHub has made staying active and social so much easier.",
    event: "Marathon Prep Camp",
  },
  {
    name: "Elena Rodriguez",
    role: "Art Director",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    text: "Every art exhibition and creative workshop I've attended has been booked through EventHub. The platform feels as premium as the events it hosts.",
    event: "Modern Art Expo",
  },
  {
    name: "James Park",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/80?img=6",
    rating: 5,
    text: "The tech event curation on EventHub is incredible. From hackathons to keynote talks, this platform is my go-to for professional development.",
    event: "DevCon 2025",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array(count).fill(0).map((_, i) => (
        <FiStar key={i} className="text-amber-400 fill-amber-400 text-sm" />
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: "#080E1A" }}>
      <div className="section-container">
        <SectionTitle
          tag="What People Say"
          title="Loved by"
          highlight="Thousands"
          subtitle="Join our growing community of event-goers and organizers who trust EventHub."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, rating, text, event }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 cursor-default"
              style={{
                background: "#111827",
                border: "1px solid rgba(30,41,59,0.8)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(124,58,237,0.1)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-5 text-5xl font-black leading-none opacity-10"
                style={{ color: "#7C3AED" }}
              >
                "
              </div>

              <StarRating count={rating} />

              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{text}"</p>

              <div
                className="pt-4 flex items-center gap-3"
                style={{ borderTop: "1px solid rgba(30,41,59,0.8)" }}
              >
                <img
                  src={avatar}
                  alt={name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: "2px solid rgba(124,58,237,0.4)" }}
                />
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-slate-500 text-xs">{role}</p>
                </div>
                <div className="ml-auto">
                  <span className="badge badge-primary text-xs">{event}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
