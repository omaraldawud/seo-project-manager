export default function Topbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand text-white px-4"
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
        <h1
          className="m-0 fw-bold text-white"
          style={{
            fontSize: "1.75rem",
            fontFamily: "'Segoe UI', 'Roboto', sans-serif",
            letterSpacing: "0.05em",
            textShadow: "0 0 8px rgba(0,180,216,0.7)",
            position: "relative",
            display: "inline-block",
            paddingBottom: "8px",
          }}
        >
          <span
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "3px",
              background: "linear-gradient(90deg, #00b4d8, #0077b6)",
              borderRadius: "3px",
            }}
          ></span>
          SEO DASHBOARD
        </h1>
        <div className="ms-auto">
          <span
            className="badge fs-6 px-4 py-2"
            style={{
              background: "rgba(0, 180, 216, 0.2)",
              color: "#00b4d8",
              border: "1px solid #00b4d8",
              borderRadius: "0",
              fontFamily: "'Courier New', monospace",
            }}
          >
            v1.0.0
          </span>
        </div>
      </nav>
    </>
  );
}
