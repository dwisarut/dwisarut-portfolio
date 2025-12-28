import { easeInOut, useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Project {
  title: string;
  slug: string;
  type: "project" | "blog";
  synopsis: string;
  date: string;
  tag: string[];
  cover: string;
  component: React.FC;
}
interface MDXModule {
  default: React.FC;
  frontmatter?: {
    title?: string;
    slug?: string;
    type?: "project" | "blog";
    date: string;
    synopsis?: string;
    tag?: string[];
    cover?: string;
  };
}

const modules = import.meta.glob("../projects/*.mdx");

const Project = () => {
  const controls = useAnimation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    window.scrollTo(0, 0);
    return () => window.removeEventListener("to-home", handleExit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const entries = await Promise.all(
          Object.entries(modules).map(async ([, importer]) => {
            const mod = (await importer()) as MDXModule;
            return {
              title: mod.frontmatter?.title || "Untitled Project",
              synopsis: mod.frontmatter?.synopsis || "No description available",
              slug: mod.frontmatter?.slug || "untitled",
              type: mod.frontmatter?.type || "project",
              date: mod.frontmatter?.date || "undefined",
              tag: mod.frontmatter?.tag || [],
              cover: mod.frontmatter?.cover || "",
              component: mod.default,
            } satisfies Project;
          })
        );
        setProjects(entries);
      } catch (error) {
        console.error("failed to load bruh: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <motion.div
        className="flex container justify-center bg-background min-h-screen w-full p-8"
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
      >
        <div className="flex flex-col lg:ml-46 lg:mr-46 xl:ml-20 xl:mr-20">
          <Breadcrumbs />
          <h1 className="flex header-text justify-center xl:justify-start font-bold pt-6 mb-12">
            Project
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center mt-6">
              <p className="text-black/50">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex justify-center items-center mt-6">
              <p className="text-black/50">No projects found</p>
            </div>
          ) : (
            <div className="flex flex-col justify-center self-center xl:flex-row xl:flex-wrap xl:justify-start xl:w-full gap-6 mt-6">
              {projects.map((proj) => (
                <motion.div
                  key={proj.title}
                  className="card bg-white flex-none"
                >
                  <Card
                    className="flex flex-col w-110 sm:w-120 h-70 sm:h-110 hover:cursor-pointer hover:bg-zinc-50"
                    onClick={() => navigate(`/project/${proj.slug}`)}
                  >
                    <CardHeader className="flex-1">
                      <div className="flex flex-col gap-4">
                        <CardTitle className="inter text-2xl">
                          {proj.title}
                        </CardTitle>
                        <CardDescription className="font-semibold">
                          Posted: {proj.date}
                        </CardDescription>
                        <CardDescription className="inter">
                          {proj.synopsis}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {proj.tag.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 whitespace-nowrap text-xs inter rounded-full text-white bg-black/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={proj.cover}
                        alt={proj.title}
                        className="w-full h-40 object-cover rounded-md hidden sm:block"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
      <footer className="footer sm:footer-horizontal bg-[hsl(0_0%_10%)] text-[hsl(0_0%_90%)] items-center justify-around mt-6 p-12">
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

export default Project;
