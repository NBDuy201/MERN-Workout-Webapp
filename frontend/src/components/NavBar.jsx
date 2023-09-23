import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="sticky top-0 bg-white w-full px-8 py-10 z-10">
      <h1 className="page-container">
        <Link to="/">Workout Home</Link>
      </h1>
    </header>
  );
};

export default NavBar;
