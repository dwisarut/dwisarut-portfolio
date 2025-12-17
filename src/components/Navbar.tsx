import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { easeInOut, useAnimation, motion } from "framer-motion";
import {
  User,
  House,
  FileUser,
  BriefcaseBusiness,
  FolderGit2,
  type LucideIcon,
} from "lucide-react";

interface NavItems {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItems[] = [
  { name: "Home", href: "/", icon: House },
  { name: "About Me", href: "/aboutme", icon: User },
  { name: "Resume", href: "/Wisarut_Donsri_CV.pdf", icon: FileUser },
  { name: "Work", href: "/work", icon: BriefcaseBusiness },
  { name: "Project", href: "/project", icon: FolderGit2 },
];

const Navbar = () => {
  const location = useLocation();
  const controls = useAnimation();
  const navigate = useNavigate();

  const fromLanding = window.sessionStorage.getItem("Landing") === "true";

  useEffect(() => {
    if (fromLanding) {
      controls.set({ opacity: 0, y: -20 });
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: easeInOut },
      });
      window.sessionStorage.removeItem("Landing");
    }
  }, [location.pathname, controls, fromLanding]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        return;
      }

      const currScrollY = window.scrollY;

      if (currScrollY > lastScrollY && currScrollY > 50) {
        controls.start({
          y: 80,
          transition: { duration: 0.25, ease: easeInOut },
        });
      } else {
        controls.start({
          y: 0,
          transition: { duration: 0.25, ease: easeInOut },
        });
      }
      lastScrollY = currScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  if (location.pathname === "/") {
    return null;
  }

  const homeNavigation = async () => {
    window.dispatchEvent(new Event("to-home"));

    await controls.start({
      x: "100vh",
      opacity: 0,
      transition: { duration: 0.4, ease: easeInOut },
    });

    navigate("/");
    controls.set({ x: 0, opacity: 1 });
  };

  return (
    <>
      <motion.nav
        initial={fromLanding ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={controls}
        className="w-full bg-background fixed bottom-0 md:sticky md:top-0 z-50"
      >
        <div className="flex w-full container navbar justify-evenly md:justify-start items-center py-2 md:py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            if (item.name === "Home") {
              return (
                <button
                  key={item.name}
                  onClick={homeNavigation}
                  className="flex flex-row gap-3 items-center navbar-text hover:cursor-pointer hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{item.name}</span>
                </button>
              );
            }

            if (item.name === "Resume") {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  target="_blank"
                  rel="noopener noreferer"
                  className="flex flex-row gap-3 items-center navbar-text hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-row gap-3 items-center navbar-text ${
                  isActive ? "navbar-active" : "hover:-translate-y-0.5"
                } transition-all`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
