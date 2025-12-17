import { useLocation, useNavigate, useParams } from "react-router-dom";

interface metaData {
  title: string;
  synopsis: string;
  type: "project" | "blog";
  slug: string;
  tag: string[];
  cover: string;
  component: React.FC;
}

interface breadcrumbProp {
  allProjects?: metaData[];
  allBlogs?: metaData[];
}

const Breadcrumbs = ({ allProjects = [], allBlogs = [] }: breadcrumbProp) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { slug } = useParams();
  const crumbs: { page: string; href: string }[] = [];

  const path = location.pathname;
  if (!path.startsWith("/project") && !path.startsWith("/blog")) {
    return null;
  }

  if (path.startsWith("/project")) {
    crumbs.push({ page: "Project", href: "/project" });

    if (slug) {
      const project = allProjects.find((p) => p.slug === slug);
      if (project) {
        crumbs.push({ page: project.title, href: `/project/${slug}` });
      }
    }
  }

  if (path.startsWith("/blog")) {
    crumbs.push({ page: "Blog", href: "/blog" });

    if (slug) {
      const blog = allBlogs.find((p) => p.slug === slug);
      if (blog) {
        crumbs.push({ page: blog.title, href: `/blog/${slug}` });
      }
    }
  }

  return (
    <>
      <div className="w-full breadcrumbs text-sm md:text-base text-[hsl(0_0%_90%)]">
        <ul>
          {crumbs.map((item) => {
            const currPage = path.startsWith(item.href);

            return (
              <li key={item.href} className={currPage ? "font-bold" : ""}>
                <a onClick={() => navigate(item.href)}>{item.page}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Breadcrumbs;
