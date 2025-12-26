const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="black"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

const workHistory = [
  {
    date: "Aug 2025",
    role: "Freelance Developer",
    company: null,
    position: "start",
    desc: "A joint-cooperation with my friend to learn about technologies and experiences through multiple projects, which doesn't limited to frontend, but expand beyond. The prime example is the Image Fetcher and Lesion Detection project, which is also within the project page.",
  },
  {
    date: "Jul 2024 - Aug 2024",
    role: "Quality Assurance Intern",
    company: "Ryobi Die Casting (Thailand) Co., Ltd.",
    position: "end",
    desc: "As a Quality Assurance Intern, they trained me under Quality Control division, such as patrolling to find a defective product, factory cleaning inspection for ensuring industry standard, following up with the customer for reporting work progress, and documentation to ensure Customer Relationship Management (CRM).",
  },
  {
    date: "Jun 2024 - Jul 2024",
    role: "Student Intern",
    company: "Store Mate Co., Ltd.",
    position: "start",
    desc: "Student Intern doesn't have a fix schedule, as they are assigned to do multiple assignments during the contract. My assignments are updating stock data within Google Sheets, designing the 3D drawing for customer communication, and conduct the die research for company.",
  },
];

const Work = () => {
  return (
    <>
      <div className="flex flex-col bg-background w-full">
        <ul
          className="timeline timeline-snap-icon max-xl:timeline-compact timeline-vertical"
          role="list"
        >
          {workHistory.map((item, index) => (
            <li key={index}>
              {index !== 0 && <hr />}
              <div className="timeline-middle">
                <CheckIcon />
              </div>
              <div
                className={`timeline-${
                  item.position
                } mb-10 pl-2 pr-2 pt-[0.3rem] ${
                  item.position === "start" ? "xl:text-end" : "xl:text-start"
                }`}
              >
                <time className="font-mono italic">{item.date}</time>
                <div className="text-base font-bold">{item.role}</div>
                <div className="text-base">{item.company}</div>
                <div className="text-base mt-2 md:mt-3 w-100 sm:w-125 md:w-132">
                  {item.desc}
                </div>
              </div>
              {index !== workHistory.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Work;
