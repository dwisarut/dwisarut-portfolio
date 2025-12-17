import { Link, useNavigate } from "react-router-dom";
import { easeInOut, motion, useAnimation } from "framer-motion";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

const LandingPage = () => {
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeInOut },
    });
  }, [controls]);

  const handleNavigation = async (path: string) => {
    await controls.start({
      x: "-100vh",
      opacity: 0,
      transition: { duration: 0.4, ease: easeInOut },
    });
    window.sessionStorage.setItem("Landing", "true");
    navigate(path);
  };

  return (
    <>
      <motion.div
        className="flex bg-background justify-center flex-col min-h-screen w-full p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
      >
        <h1 className="flex justify-center header-text font-bold mt-12">
          Wisarut Donsri
        </h1>

        <h2 className="flex justify-center desc-text m-3">
          an aspiring front-end developer
        </h2>

        <div className="flex justify-center self-center flex-col gap-10 mt-8">
          <div className="flex flex-col gap-10 self-center lg:flex-row lg:gap-20">
            <button
              onClick={() => handleNavigation("/aboutme")}
              className="flex button contain-content text-xl ul-animation"
            >
              About Me
            </button>
            <Link
              to="/Wisarut_Donsri_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex button contain-content text-xl ul-animation"
            >
              Resume
            </Link>
          </div>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
            <button
              onClick={() => handleNavigation("/work")}
              className="flex button contain-content text-xl ul-animation"
            >
              Work
            </button>
            <button
              onClick={() => handleNavigation("/project")}
              className="flex button contain-content text-xl ul-animation"
            >
              Project
            </button>
          </div>
        </div>
        <div className="flex mt-12 justify-center gap-5">
          <Link
            to="https://www.linkedin.com/in/wisarut-donsri"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit h-fit"
          >
            <LinkedInLogoIcon className="icons" />
          </Link>
          <Link
            to="https://github.com/dwisarut"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit h-fit"
          >
            <GitHubLogoIcon className="icons" />
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default LandingPage;
