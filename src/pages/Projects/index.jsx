import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

const fadeIn = (direction = "up", delay = 0) => ({
    hidden: {
        opacity: 0,
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { delay, duration: 0.6, ease: "easeOut" },
    },
});

const projects = [
    {
        title: "Battleship",
        image: "src/assets/project/cta.png",
        tags: ["HTML", "CSS", "JavaScript", "Node.js"],
        description:
            "Used components of Javascript to implement basic data structures through the game of Battleship...",
        github: "#",
        live: "#",
    },
    {
        title: "Movie Titles API",
        image: "src/assets/project/coddence.png",
        tags: ["HTML", "CSS", "JavaScript", "API", "Version control"],
        description:
            "Uses a public movie API to build a collection movie list...",
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

const getAllTags = (projects) =>
    ["All", ...new Set(projects.flatMap((p) => p.tags))];

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
    const [selectedTag, setSelectedTag] = useState("All");

    useEffect(() => {
        const handleScroll = () => setShowTopBtn(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const filteredProjects =
        selectedTag === "All"
            ? projects
            : projects.filter((project) => project.tags.includes(selectedTag));

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

            {/* Projects Section */}
            <section className="max-w-7xl mx-auto px-10 py-20">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-center mb-10">All projects <span className="text-red-500 font-bold ml-1">.</span></h2>
                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {getAllTags(projects).map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-2 rounded-full border text-sm transition ${selectedTag === tag
                                    ? "bg-red-500 text-white border-red-500"
                                    : "border-white/20 text-white hover:bg-red-500 hover:border-red-500"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-12">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} delay={0.1 * index} />
                    ))}
                </div>
            </section>

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
