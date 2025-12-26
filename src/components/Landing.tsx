import { Link, useNavigate } from "react-router-dom";
import { easeInOut, motion, useAnimation } from "framer-motion";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { Mail, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import HeroImage from "/heropic.png";
import { Separator } from "@radix-ui/react-separator";
import Work from "./Work";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import MedCheck from "/medcheck.png";
import CTscan from "/CT-Scan.png";
import { Button } from "./ui/button";

const medchecktag = ["Python", "Pyside6", "Qt-QML", "Numpy", "Pandas", "Figma"];
const lesiontag = [
  "Python",
  "Pillow",
  "Scikit-learn",
  "SciPy",
  "Numpy",
  "matplotlib",
  "OpenCV",
];

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
        className="flex container bg-background justify-center flex-col min-h-screen w-full p-4 gap-8"
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
      >
        <div className="flex flex-col gap-12 mt-24">
          <div className="flex flex-col md:flex-row justify-center xl:justify-evenly">
            <img
              src={HeroImage}
              className="w-sm h-fit rounded-xs hidden xl:block"
            />
            <div className="flex flex-col ml-0 text-left lg:justify-between gap-3 xl:gap-0">
              <h1 className="flex inter font-semibold leading-none">
                Frontend Developer
              </h1>
              <h2 className="flex header-text font-bold leading-none">
                Wisarut Donsri
              </h2>

              <div className="flex flex-row justify-start gap-6 md:gap-12">
                <Link
                  to="/Wisarut_Donsri_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-3 w-fit h-fit"
                >
                  <FileTextIcon className="icons" />
                  <p className="underline lato hidden md:block">Resume</p>
                </Link>
                <Link
                  to="https://www.linkedin.com/in/wisarut-donsri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-3 w-fit h-fit"
                >
                  <LinkedInLogoIcon className="icons" />
                  <p className="underline lato hidden md:block">LinkedIn</p>
                </Link>
                <Link
                  to="https://github.com/dwisarut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-3 w-fit h-fit"
                >
                  <GitHubLogoIcon className="icons" />
                  <p className="underline lato hidden md:block">Github</p>
                </Link>
                <div className="flex flex-row gap-3">
                  <Mail />
                  <p>d.wisarut@hotmail.com</p>
                </div>
              </div>

              <Separator className="my-2 border border-zinc-200" />

              <div className="flex flex-col gap-4">
                <h3 className="flex desc-text font-semibold">Resume summary</h3>
                <ul className="list-disc space-y-2 pl-10 lato">
                  <li>Based in Bangkok, Thailand</li>
                  <li>Mainly React and TypeScript</li>
                  <li>Built an award-winning project</li>
                  <li>Lately contributed as a freelance developer</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:ml-15 md:mr-15 lg:ml-46 lg:mr-46 xl:ml-20 xl:mr-20">
            <h1 className="inter font-semibold text-xl sm:text-2xl">
              About Me
            </h1>
            <Separator className="my-2" />
            <p className="lato wrap-break-word">
              I graduated from King Mongkut’s University of Technology Thonburi
              with a bachelor's degree in production engineering. However, I’m
              interested in programming after I’ve done my senior project,
              resulting in my departure from the industrial career path and
              continuing as an aspiring developer.
            </p>
            <p className="lato wrap-break-word mt-4">
              I undergone two internship programs, albeit doesn't related to the
              tech industry. This made me experiences, and adapts to the
              different work culture and understand how to cooperate with
              others.
            </p>
          </div>

          <div className="flex flex-col md:ml-15 md:mr-15 lg:ml-46 lg:mr-46 xl:ml-20 xl:mr-20">
            <h1 className="inter font-semibold text-xl sm:text-2xl">
              Work Experience
            </h1>
            <Separator className="my-2" />
            <Work />
          </div>

          <div className="flex flex-col md:ml-15 md:mr-15 lg:ml-46 lg:mr-46 xl:ml-20 xl:mr-20">
            <div className="flex flex-row justify-between">
              <h1 className="inter font-semibold text-xl sm:text-2xl">
                Featured Projects
              </h1>
              <span
                className="flex flex-row inter font-semibold hover:cursor-pointer items-center"
                onClick={() => handleNavigation("/project")}
              >
                More <ChevronRight />
              </span>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-0">
              <Card className="flex flex-col w-120 h-120">
                <CardHeader>
                  <img
                    src={MedCheck}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-col gap-4">
                    <CardTitle className="inter text-2xl">MedCheck</CardTitle>
                    <CardDescription className="lato">
                      Desktop medicine checker that guaranteed to saved disposal
                      cost, reduce operation time, and timely restock.
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {medchecktag.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 whitespace-nowrap text-xs inter rounded-full text-white bg-black/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <CardAction>
                    <Button onClick={() => navigate("/project/medcheck")}>
                      Learn more
                    </Button>
                  </CardAction>
                </CardFooter>
              </Card>
              <Card className="flex flex-col w-120 h-120">
                <CardHeader>
                  <img
                    src={CTscan}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-col gap-4">
                    <CardTitle className="inter text-2xl">
                      Lesion Detection
                    </CardTitle>
                    <CardDescription className="lato">
                      Automation script that process the image and highlight the
                      tumor and anomaly.
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {lesiontag.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 whitespace-nowrap text-xs inter rounded-xl text-white bg-black/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <CardAction>
                    <Button
                      onClick={() => navigate("/project/lesion-detection")}
                    >
                      Learn more
                    </Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>

      <footer className="footer sm:footer-horizontal bg-[hsl(0_0%_10%)] text-[hsl(0_0%_90%)] items-center justify-around mt-24 p-12">
        <aside className="flex flex-col items-start">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
            dwisarut-portfolio
          </h1>
          <p>
            Copyright © {new Date().getFullYear()} Wisarut Donsri: All right
            reserved
          </p>
        </aside>
        <aside className="flex flex-col items-start">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold">Contact</h1>
          <a
            className="underline"
            href="https://www.linkedin.com/in/wisarut-donsri"
          >
            LinkedIn
          </a>
          <a className="underline" href="https://github.com/dwisarut">
            Github
          </a>
        </aside>
      </footer>
    </>
  );
};

export default LandingPage;
