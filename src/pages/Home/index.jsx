import { Link } from "react-router-dom";
import { Images } from "../../themes/Images";
import desktopIcon from "../../assets/data/icons/desktop.gif";
import mobileIcon from "../../assets/data/icons/phone.gif";
import cloudComputingIcon from "../../assets/data/icons/cloud-computing.gif";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
};

const projects = [
  {
    title: "Battleship",
    image: "src/assets/project/cta.png",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    description:
      "Used components of Javascript to implement basic data structures through the game of Battleship. Used a terminal to display ships and tracked where ships are hit or missed.",
    github: "#",
    live: "#",
  },
  {
    title: "Movie Titles API",
    image: "src/assets/project/coddence.png",
    tags: ["HTML", "CSS", "JavaScript", "API", "Version control"],
    description:
      "Uses a public movie API to build a collection movie list that sorts from A to Z or vice versa. It also counts how many movies in each container and adds user's favorite movies into another container.",
    github: "#",
    live: "#",
  },
  {
    title: "Javascript Calculator",
    image: "src/assets/project/amelegal.png",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    description:
      "Uses simple algorithm concepts in Javascript to produce an arithmetic result in a terminal.",
    github: "#",
    live: "#",
  },
];

const ProjectCard = ({ project, delay }) => (
  <motion.div
    className="rounded-xl overflow-hidden flex flex-col md:flex-row"
    variants={fadeIn("up", delay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <img src={project.image} alt={project.title} className="md:w-1/4 object-cover" />
    <div className="p-6 flex flex-col justify-between md:w-1/2">
      <div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4 text-sm text-white/70">
          {project.tags.map((tag, i) => (
            <span key={i} className="bg-[#334155] px-3 py-1 rounded">{tag}</span>
          ))}
        </div>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
      </div>
      <div className="flex gap-3">
        <a href={project.github} className="bg-red-500 px-4 py-2 text-sm hover:bg-red-600 rounded-full">View Github</a>
        <a href={project.live} className="border border-red-500 px-4 py-2 rounded-full text-sm hover:bg-red-500">View project ↗</a>
      </div>
    </div>
  </motion.div>
);

const Index = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-[#0F172A] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-xl font-bold tracking-wide text-white">
            <span className="text-red-500">Awlenou</span> Alain
          </h1>

          {/* Navigation + WhatsApp */}
          <div className="hidden sm:flex items-center space-x-6 text-md font-medium text-white">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <Link to="#about" className="hover:text-red-500 transition">About</Link>
            <Link to="/projects" className="hover:text-red-500 transition">Projects</Link>

            {/* WhatsApp Button */}
            <Link
              to="https://wa.me/22897463339"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded-full overflow-hidden transition-all duration-300 group w-12 hover:w-56"
            >
              <BsWhatsapp className="w-6 h-6 shrink-0" />
              <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                Discutons sur WhatsApp
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-10 py-20 gap-10">
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          animate="visible"
        >
          <p className="text-4xl font-light">
            <span className="font-semibold">Hello</span>
            <span className="text-red-500 font-bold ml-1">.</span>
          </p>
          <h2 className="text-xl md:text-2xl font-light flex items-center gap-3 justify-center md:justify-start">
            <div className="border-b-4 border-red-500 w-16" /> I'm Awlenou
          </h2>
          <h3 className="text-3xl md:text-7xl font-bold leading-tight">
            Software Developer
          </h3>
          <p className="text-gray-400 max-w-md mx-auto md:mx-0">
            I build clean, scalable and efficient digital experiences using modern technologies. Let's build your next big idea together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition font-medium">
              Got a project?
            </button>
            <button className="border border-red-500 text-white px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition font-medium">
              My resume
            </button>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center"
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full z-10 flex items-end justify-center">
            <div className="absolute inset-0 rounded-full bg-red-500/20 blur-[60px] z-0" />
            <div className="absolute inset-0 rounded-full border-[14px] sm:border-[16px] border-red-500 animate-pulse z-10" />
            <img
              src={Images.pp}
              alt="Awlenou Alain"
              className="z-20 w-full h-[480px] object-cover rounded-b-full -translate-y-4"
            />
          </div>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-10 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-6"
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {[{
                icon: desktopIcon,
                label: "Website development"
              }, {
                icon: mobileIcon,
                label: "App development"
              }, {
                icon: cloudComputingIcon,
                label: "Website hosting"
              }].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  variants={fadeIn("up", 0.1 + i * 0.1)}
                >
                  <img src={item.icon} alt={item.label} className="w-14 h-14" />
                  <span className="text-lg">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">About me <span className="text-red-500 font-bold ml-1">.</span></h2>
              <p className="text-gray-400 mb-10">
                I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then, this has led me to software development as it fulfills my love for learning and building things.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-start">
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">120+</div>
                <div className="text-sm text-gray-400">Completed projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">95%</div>
                <div className="text-sm text-gray-400">Client satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">10+</div>
                <div className="text-sm text-gray-400">Years of experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-[#0F172A] text-white max-w-7xl mx-auto px-10 py-20">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-3xl font-bold mb-16 text-center">Recents projects <span className="text-red-500 font-bold ml-1">.</span></h2>
          <Link to="/projects" className="border border-red-500 px-4 py-2 rounded-full text-sm hover:bg-red-500">View all projects</Link>
        </div>
        <div className="space-y-12">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={index} project={project} delay={0.1 + index * 0.1} />
          ))}
        </div>
      </section>


      {/* Contact Section */}
      <motion.section
        id="contact"
        className="max-w-5xl mx-auto px-10 py-20 text-center"
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Contact <span className="text-red-500 font-bold ml-1">.</span></h2>
        <p className="text-gray-400 mb-6">
          Have a project or want to collaborate? Feel free to reach out.
        </p>
        <button className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition font-medium">
          Send a message
        </button>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-white/10 text-sm text-gray-500">
        © {new Date().getFullYear()} Awlenou Alain. All rights reserved.
      </footer>

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Index;
