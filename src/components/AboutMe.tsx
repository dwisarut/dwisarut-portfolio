import { easeInOut, useAnimation, motion } from "framer-motion";
import HeroImage from "/heropic.png";
import { useEffect } from "react";

const AboutMe = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: easeInOut, delay: 0.2 },
    });

    const handleExit = async () => {
      await controls.start({
        x: "100vh",
        opacity: 0,
        transition: { duration: 0.4, ease: easeInOut },
      });
    };

    window.addEventListener("to-home", handleExit);
    return () => window.removeEventListener("to-home", handleExit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.div
        className="flex container flex-col bg-background min-h-screen w-full p-4"
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
      >
        <h1 className="flex header-text justify-center md:justify-start font-bold pt-6">
          Wisarut Donsri
        </h1>
        <div className="flex flex-col lg:flex-row mt-12 gap-10">
          <img
            src={HeroImage}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md md:self-center h-auto object-contain mx-auto md:mx-0"
          />
          <div className="flex flex-col gap-6 w-full md:pl-5">
            <blockquote className="quote pl-4 border-l-8 wrap-break-word">
              “Programming to create a solution is very cool and all, I just
              want to create beautiful interfaces.”
            </blockquote>

            <p className="content-text wrap-break-word">
              I graduated from King Mongkut’s University of Technology Thonburi
              with a bachelor's degree in production engineering. However, I’m
              interested in programming after I’ve done my senior project,
              resulting in my departure from the industrial career path and
              continuing as an aspiring developer.
            </p>

            <p className="content-text wrap-break-word">
              I undergone two internship programs, albeit doesn't related to the
              tech industry. This made me experiences, and adapts to the
              different work culture and understand how to cooperate with
              others.
            </p>

            <p className="content-text wrap-break-word">
              Let's disregard our professionalism for now, as you can find those
              details in other sections like Resume and Work. For this
              portfolio, I want to introduce myself casually.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <h2 className="desc-text font-bold mb-8">Interests</h2>
          <h3 className="sub-desc-text font-bold mb-4">Coffee</h3>
          <p className="content-text mb-4">
            First, I’m not caffeine addict. I just knew a good barista that let
            me taste and smell their coffee which opened me to the whole new
            world. Their shop are branded as a specialty coffee shop, which when
            I think back, somewhat tailored my taste in coffee a bit. But I’m
            not claimed to know lots of coffee, just know what I know.
          </p>
          <p className="content-text m-0 pr-20">
            Here are some notable menus that I like:
          </p>
          <ul className="list-disc space-y-2 pl-10 mt-4 mb-4">
            <li className="content-text m-0 pr-20 mb-4">
              <span className="font-bold">Red Eye/Shot in the dark: </span>This
              one made me doubt about my caffeine addict statement, as it is
              very hard hitting coffee (1 shot of expresso added in the drip
              brew coffee), and also not a common menu either.
            </li>
            <li className="content-text m-0 pr-20 mb-4">
              <span className="font-bold">Blue Bottle Coffee: </span>This one is
              a specialty coffee chain from California, the barista let me taste
              this one, and my god, this one have a really lasting impression on
              me. Sadly, I can’t get it in Thailand.
            </li>
          </ul>
          <h3 className="sub-desc-text font-bold mb-4">Music</h3>
          <p className="content-text mb-4">
            You see, I'm not usually listen to Thai music because it doesn't
            interest me. However, I do like listening to Japanese and western
            music artists due to the varieties they brought to the table.
          </p>
          <p className="content-text m-0 pr-20">
            Here are some lists of artist or bands that I like:
          </p>
          <ul className="list-disc space-y-2 pl-10 mt-4 mb-4">
            <li className="content-text m-0 pr-20 mb-4">
              <span className="font-bold">Natori: </span>The young artist with a
              versatility in styles, the pop that you can comfortably listened
              on{" "}
              <a
                href="https://www.youtube.com/watch?v=4Pls29qqg6Y"
                className="underline"
                target="_blank"
              >
                friday night
              </a>
              , or the rock that is so fast you have to catch your breath, or
              outright experimental.
            </li>
            <li className="content-text m-0 pr-20 mb-4">
              <span className="font-bold">Yorushika: </span>The band that have a
              very distinct vocal complimented with the instruments, but one can
              say that this band's discography is quite simple. But the things
              that made Yorushika unique is the multi-layered lyrics, word play,
              themes, and guitar rift. I would say that this band made
              literature on sound.
            </li>
            <li className="content-text m-0 pr-20 mb-4">
              <span className="font-bold">Minami: </span>If I were to describe
              her, it would be "a woman with a guitar" with very powerful voice
              that reminding me of Adele, mainly because an insane vocal control
              technique, and coupled with some of the most heartbreaking lyrics,
              creating some of the most beautiful song I have ever listened.
            </li>
          </ul>
        </div>
      </motion.div>
      <footer className="footer sm:footer-horizontal bg-[hsl(0_0%_10%)] text-[hsl(0_0%_90%)] items-center justify-around mt-6 p-12">
        <aside className="flex flex-col items-start">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
            dwisarut-port.dev
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

export default AboutMe;
