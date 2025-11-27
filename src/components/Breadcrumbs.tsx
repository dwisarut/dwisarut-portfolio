import { useLocation, useNavigate } from "react-router-dom";

interface Items {
  page: string;
  href: string;
}

const breadcrumbItems: Items[] = [
  { page: "Project", href: "/project" },
  { page: "Blog", href: "/blog" },
];

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full breadcrumbs text-sm md:text-base text-[hsl(0_0%_40%)]">
        <ul>
          {breadcrumbItems.map((item) => {
            const currPage = location.pathname === item.href;

            return (
              <li className={currPage ? "font-bold" : ""}>
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
