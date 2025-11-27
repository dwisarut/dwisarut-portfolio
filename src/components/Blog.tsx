import { easeInOut, useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

const Blog = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.set({ opacity: 0, y: -20 });
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: easeInOut, delay: 0.2 },
    });

    const handleExit = () => {
      controls.start({
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
        className="flex container flex-col bg-background min-h-screen w-full p-8 lg:p-4"
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
      >
        <h1 className="flex header-text justify-center md:justify-start font-bold pt-6">
          Blogs
        </h1>
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

export default Blog;
