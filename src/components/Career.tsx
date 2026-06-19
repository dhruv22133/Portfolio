import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>GL Bajaj Group of Institutions</h5>
              </div>
              <h3>2020-2024</h3>
            </div>
            <p>
              Completed Bachelor of Technology in Computer Science, building a
              strong foundation in data structures, algorithms, databases, and
              software engineering principles.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern (Full Stack Developer)</h4>
                <h5>ID Tech Solutions Pvt. Ltd.</h5>
              </div>
              <h3>Jul-Dec 2024</h3>
            </div>
            <p>
              Assisted in the development and migration of dynamic,
              database-backed web applications. Troubleshot, debugged, and
              resolved application defects across the stack. Maintained code
              repositories using Git version control workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Junior Software Developer</h4>
                <h5>ID Tech Solutions Pvt. Ltd.</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designing, developing, and maintaining responsive web applications
              and RESTful APIs using PHP and MySQL. Optimizing system performance
              with complex relational database queries. Utilizing Docker Compose
              to orchestrate multi-container development environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
