import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

import iconCloseNav from "../assets/icons/icon-close-humburger.svg"


const Navbar = () => {
    const locationPath = useLocation().pathname;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isChangeTeksColor, setIsChangeTeksColor] = useState("text-white");
    const [isBgChangeNav, setIsBgChangeNav] = useState("bg-white");
    const [isChangeMenuNav, setIsChangeMenuNav] = useState(
      "text-white border-white border-[1px] bg-[#ffffff2b]"
    );
    
    // handler to check if the path is active and uniques path
    const isPathActive = (path) => {
      return locationPath === path || ( (path === "/explore" && locationPath.startsWith("/explore") || (path === "/blog" && locationPath.startsWith("/blog")) || (path === "/explore-desination" && locationPath.startsWith("/explore-destination"))));
    };

    // handler to check if the path is explore destination and blog to change color text and background navbar
    const isExploreDestination = locationPath.startsWith("/explore-destination");
    const isBlogPath = locationPath.startsWith("/blog");
    
    // handler for change color text and background navbar when resize and scroll
    useEffect(() => { 
      if (isExploreDestination || locationPath === "/404" || isBlogPath) {
        setIsChangeTeksColor("text-primary");
        setIsChangeMenuNav("text-primary border-2 border-primary bg-[#FFFFFF7F]");
      } else {
        setIsChangeTeksColor("text-white");
        setIsChangeMenuNav("text-white border-white border-[1px] bg-[#ffffff2b]");
      }

      const handleResize = () => {
        if (window.innerWidth < 768) {
          setIsChangeTeksColor("text-primary");
        } else {
          if (window.scrollY > 500) {
            setIsChangeTeksColor("text-primary");
          } else {
            setIsChangeTeksColor(isExploreDestination || isBlogPath || locationPath === "/404" ? "text-primary" : "text-white");
          }
        }
      };

      const handleScroll = () => {
        if (isExploreDestination || isBlogPath || locationPath === "/404") {
          if (window.scrollY > 100) {
            setIsBgChangeNav("bg-white h-auto md:h-[90px]");
          } else {
            setIsBgChangeNav("bg-white md:bg-transparent h-auto md:h-[140px]");
          }
        } else {
          if (window.scrollY > 500) {
            setIsBgChangeNav("bg-white h-auto md:h-[90px]");
          } else {
            setIsBgChangeNav("bg-white md:bg-transparent h-auto md:h-[140px]");
          }
        }
        
        if (window.innerWidth >= 768) {
          if (window.scrollY > 500 && !isExploreDestination && !isBlogPath && locationPath !== "/404") {
            setIsChangeTeksColor("text-primary");
            setIsChangeMenuNav("text-primary border-[2px] border-primary bg-[#FFFFFF7F]");
          } else {
            setIsChangeTeksColor(isExploreDestination || isBlogPath || locationPath === "/404" ? "text-primary" : "text-white");
            setIsChangeMenuNav(
                isExploreDestination || isBlogPath || locationPath === "/404"
                ? "text-primary border-2 border-primary bg-[#FFFFFF7F]"
                : "text-white border-white border-[1px] bg-[#ffffff2b]"
            );
          }
        }
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);

      handleResize();
      handleScroll();

      // Always cleanup event listener to save memory leak
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      };
    }, [locationPath, isBlogPath, isExploreDestination]);

  return (
    <>
      <nav className={`fixed pb-4 md:pb-0 pt-4 md:pt-0 flex items-center inset-x-0 top-0 z-50 transition-all duration-300 ${isBgChangeNav}`}>
        <div className="container">
          {/* Menu default area */}
          <div className="flex items-center justify-between">
            <div className={`text-3xl font-bold ${isChangeTeksColor}`}>
              <Link to="/">Placeir</Link>
            </div>
            <div
              className={`w-[418px] h-[55px] justify hidden items-center justify-evenly md:flex font-semibold text-xl rounded-full ${isChangeMenuNav}`}
            >
              <Link
                preventScrollReset={false} 
                to="/"
                className={`transition-all ${isPathActive("/") ? "font-semibold" : "font-normal"}`}
              >
                Home
              </Link>
              <Link
                preventScrollReset={false} 
                to="/explore"
                className={`transition-all ${isPathActive("/explore") ? "font-semibold" : "font-normal"}`}
              >
                Explore
              </Link>
              <Link
                to="/about"
                className={`transition-all ${isPathActive("/about") ? "font-semibold" : "font-normal"}`}
              >
                About Us
              </Link>
              <Link
                to="/blog"
                className={`transition-all ${isPathActive("/blog") ? "font-semibold" : "font-normal"}`}
              >
                Blog
              </Link>
            </div>
            <div className="items-center hidden md:flex">
              <Link
                to="/contact"
                className="px-[24px] py-[12px] font-semibold text-white rounded-full text-lg bg-primary"
              >
                Contact Us
              </Link>
            </div>
            <div id="hamburger" className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${isChangeTeksColor} focus:outline-none bg-primary p-2 rounded-full flex items-center`}
              >
                <Icon
                  icon="charm:menu-hamburger"
                  width="26"
                  height="25"
                  style={{ color: "#ffffff" }}
                />
              </button>
            </div>
          </div>
          {/* Open menu with hamburger area */}
          <div
            className={`fixed inset-y-0 right-0 bg-white transition-transform duration-[250ms] transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } w-[65%] md:hidden`}
          >
            <div className="px-5 pt-3">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center p-2"
                >
                  <img
                    src={iconCloseNav}
                    width="40"
                    height="40"
                  />
                </button>
              </div>
              <div className="flex flex-col w-full h-auto pt-2 space-y-4 text-xl">
                <Link
                  to="/"
                  className={`transition-all ${isPathActive("/") ? "font-semibold" : "font-normal"}`}
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  className={`transition-all ${isPathActive("/explore") ? "font-semibold" : "font-normal"}`}
                >
                  Explore
                </Link>
                <Link
                  to="/about"
                  className={`transition-all ${isPathActive("/about") ? "font-semibold" : "font-normal"}`}
                >
                  About Us
                </Link>
                <Link
                  to="/blog"
                  className={`transition-all ${isPathActive("/blog") ? "font-semibold" : "font-normal"}`}
                >
                  Blog
                </Link>
                <div className="flex items-center">
                  <Link
                    to="/contact" preventScrollReset={false}
                    className="px-[12px] py-[10px] md:py-[6px] text-lg font-semibold text-white rounded-full w-full text-center bg-primary"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;