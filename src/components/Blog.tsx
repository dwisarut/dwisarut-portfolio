const Blog = () => {
  return (
    <>
      <div className="flex bg-background min-h-screen w-full p-4"></div>
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
