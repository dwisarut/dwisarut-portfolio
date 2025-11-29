import { easeInOut, useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { useNavigate } from "react-router-dom";

interface Project {
  title: string;
  slug: string;
  type: "project" | "blog";
  synopsis: string;
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
        className="flex container flex-col bg-background min-h-screen w-full p-8 lg:p-4"
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
      >
        <h1 className="flex header-text justify-center md:justify-start font-bold pt-6 mb-12">
          Project
        </h1>

        <Breadcrumbs allProjects={projects} />

        {isLoading ? (
          <div className="flex justify-center items-center mt-6">
            <p className="text-black/50">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex justify-center items-center mt-6">
            <p className="text-black/50">No projects found</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center self-center md:flex-row md:flex-wrap md:justify-start md:w-full gap-6 mt-6">
            {projects.map((proj) => (
              <motion.div
                key={proj.title}
                whileHover={{ scale: 1.02 }}
                className="card bg-white flex-none w-sm md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shadow-sm"
              >
                <figure>
                  {proj.cover && (
                    <img
                      src={proj.cover}
                      alt={proj.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-black text-2xl self-start">
                    {proj.title}
                  </h2>
                  <p className="text-black/70 mt-2">{proj.synopsis}</p>
                  <div className="flex gap-2 mt-3 flex-wrap text-base-100">
                    {proj.tag.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs rounded-full text-white bg-black/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions self-end">
                    <button
                      className="btn btn-neutral btn-outline mt-4"
                      onClick={() => navigate(`/project/${proj.slug}`)}
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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

export default Project;
