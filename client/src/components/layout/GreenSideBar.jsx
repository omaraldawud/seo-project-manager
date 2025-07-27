import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons"; // SEO-relevant icon

export default function GreenSideBar() {
  return (
    <div className="d-flex flex-column h-100">
      {" "}
      {/* Full-height container */}
      {/* Top Section - 100px with SEO icon */}
      <div
        className="d-flex justify-content-center"
        style={{
          height: "100px",
          minHeight: "100px",
          flexShrink: 0,
          background: `
            linear-gradient(135deg, #0a192f 0%, #172a45 100%),
            url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none'/%3E%3Cpath d='M1 1h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 5h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 9h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 13h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 17h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2z' fill='%2300b4d8' fill-opacity='0.1'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: "overlay",
          borderBottom: "2px solid rgba(0, 180, 216, 0.3)",
        }}
      >
        <FontAwesomeIcon
          icon={faChartLine}
          className="text-dark"
          style={{ fontSize: "2.5rem" }}
        />
      </div>
      {/* Vertical Text Section */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="fw-bolder fs-3 text-dark"
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            letterSpacing: "1rem",
          }}
        >
          DASHBOARD
        </div>
      </div>
    </div>
  );
}
