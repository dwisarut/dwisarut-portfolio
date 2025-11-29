import { easeInOut, useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { useNavigate } from "react-router-dom";

interface Blog {
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

const modules = import.meta.glob("../blogs/*.mdx");

const Blog = () => {
  const controls = useAnimation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
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
              title: mod.frontmatter?.title || "Untitled Blog",
              synopsis: mod.frontmatter?.synopsis || "No description available",
              slug: mod.frontmatter?.slug || "untitled",
              type: mod.frontmatter?.type || "blog",
              tag: mod.frontmatter?.tag || [],
              cover: mod.frontmatter?.cover || "",
              component: mod.default,
            } satisfies Blog;
          })
        );
        setBlogs(entries);
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
          Blogs
        </h1>
        <Breadcrumbs allBlogs={blogs} />
        {isLoading ? (
          <div className="flex justify-center items-center mt-6">
            <p className="text-black/50">Loading projects...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex justify-center items-center mt-6">
            <p className="text-black/50">No projects found</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center self-center md:flex-row md:flex-wrap md:justify-start gap-6 mt-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog.title}
                whileHover={{ scale: 1.02 }}
                className="card bg-white lg:card-side flex-none w-full lg:h-60 hover:shadow-sm cursor-pointer"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <figure>
                  {blog.cover && (
                    <img
                      src={blog.cover}
                      alt={blog.title}
                      className="w-full lg:w-sm object-cover rounded-md"
                    />
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-black text-xl md:text-2xl self-start">
                    {blog.title}
                  </h2>
                  <p className="text-black/70 mt-2">{blog.synopsis}</p>
                  <div className="flex gap-2 mt-3 flex-wrap text-base-100">
                    {blog.tag.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs rounded-full text-white bg-black/80"
                      >
                        {t}
                      </span>
                    ))}
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

export default Blog;
