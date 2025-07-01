import { NavLink, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-container">
      <div className="error-card">
        <h1>🚨 Oops! Something went wrong.</h1>
        <p className="error-message">
          {error?.data || "Unknown Error" }
        </p>
        <NavLink to="/" className="home-button">
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};
