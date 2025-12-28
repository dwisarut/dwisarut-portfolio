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
}

const Breadcrumbs = ({ allProjects = [] }: breadcrumbProp) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { slug } = useParams();
  const crumbs: { page: string; href: string }[] = [
    { page: "Home", href: "/" },
  ];

  const path = location.pathname;
  if (!path.startsWith("/project")) {
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

  return (
    <>
      <div className="w-full breadcrumbs inter text-sm md:text-base text-zinc-500">
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
