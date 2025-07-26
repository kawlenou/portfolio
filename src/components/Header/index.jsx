import React, { useEffect, useState } from "react";
import { Images } from "../../themes/Images";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { HashLink } from "react-router-hash-link";

const index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("hidden");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    { name: "Mes compétences", id: "mes-competences" },
    { name: "Réalisations", id: "realisations" },
    { name: "Témoignage", id: "temoignage" },
    { name: "Contact", id: "contact" },
  ];

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setMenuClass("flex");
      setTimeout(() => setMenuClass("flex animate-slide-down"), 10);
    } else {
      setMenuClass("flex animate-slide-up");
      setTimeout(() => setMenuClass("hidden"), 300);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className={`fixed top-0 left-0 w-full z-40 lg:px-40 py-5 px-5 transition-shadow ${isScrolled || isMenuOpen ? "shadow-md bg-white" : ""} bg-transparent`}>
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex flex-row justify-center items-center space-x-4">
            {/* <img src={Images.logo} alt="logo" className="w-20 md:w-50"/> */}
            <h1 className="md:text-4xl font-bold font-PolySans text-2xl text-black">aa</h1>
          </Link>

          {/* Navigation visible pour les tablettes et grands écrans */}
          <nav className="hidden sm:hidden md:hidden lg:flex flex-row justify-between items-center">
            <ul className="flex flex-row md:space-x-5 lg:space-x-7 text-sm sm:text-base lg:text-md">
              {menuItems.map((item) => (
                <li key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveItem(item.id)}>
                  <HashLink to={`#${item.id}`} className={`${activeItem === item.id
                      ? "text-white transition-all"
                      : "text-black hover:text-black hover:font-bold font-Poppins transition-all"
                    }`}>
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <Link to="/" className="hidden sm:hidden lg:flex border border-black py-2 px-4 lg:py-3 lg:px-6 rounded-md justify-end">
              <p className="text-black uppercase text-xs lg:text-base font-Poppins">CV</p>
            </Link>
          </div> 

          {/* Hamburger Menu pour mobile uniquement */}
          <div className="lg:hidden">
            <button
              className="md:flex w-10 h-10 bg-black text-white rounded-md flex justify-center items-center top-4 right-4 z-50"
              onClick={toggleMenu}>
              {isMenuOpen ? <FiX/> : <FiMenu/>}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen dropdown menu pour mobile */}
      <div
        className={`fixed inset-0 flex-col mt-20 p-6 z-30 bg-white ${menuClass}`}>
        <ul className="flex flex-col justify-center items-start space-y-1 text-xl">
          {menuItems.map((item) => (
                <li key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveItem(item.id)}
                  className="flex flex-row justify-between items-center border-b-2 border-gray-200 w-full py-3"
                  >
                  <Link to={item.id} className={`${activeItem === item.id
                      ? "text-primary font-bold transition-all"
                      : "text-gray-400 hover:text-primary font-Poppins transition-all"
                    }`} onClick={toggleMenu}>
                    {item.name}
                  </Link>
                </li>
              ))}
        </ul>
        {/* <button className="flex rounded-md bg-black py-3 my-8 justify-center">
          <Link to="/contact">
            <p className="text-white font-semibold uppercase font-Poppins">Nous contacter</p>
          </Link>
        </button> */}

      </div>
    </div>
  );
};

export default index;
