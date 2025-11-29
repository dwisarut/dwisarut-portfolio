import { motion, useAnimation, easeInOut } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

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

const ProjectDetail = () => {
  const controls = useAnimation();
  const { slug } = useParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [componentReady, setComponentReady] = useState(false);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: easeInOut, delay: 0.2 },
    });
  });

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
        console.error("failed to load blogs: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setComponentReady(false);
    if (blogs.length > 0 && slug) {
      const found = blogs.find((p) => p.slug === slug);
      setBlog(found || null);
      setTimeout(() => {
        setComponentReady(true);
      }, 10);
    }
  }, [blogs, slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-black/50">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-black/50">Blog not found. Slug: {slug}</p>
        <p className="text-black/50">
          Available: {blogs.map((p) => p.slug).join(", ")}
        </p>
      </div>
    );
  }

  const ProjectComponent = blog.component;

  return (
    <>
      <motion.div
        className="flex container flex-col bg-background min-h-screen w-full p-8 lg:p-4"
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
      >
        <Breadcrumbs allBlogs={blogs} />
        <h1 className="flex header-text justify-center md:justify-start font-bold pt-6 mb-12">
          {blog.title}
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {componentReady && <ProjectComponent key={blog.slug} />}
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
export default ProjectDetail;
