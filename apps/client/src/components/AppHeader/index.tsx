import { Link } from "@tanstack/react-router";

const AppHeader = () => {
  return (
    <div
      className={`p-2 gap-2 bg-black text-white h-header flex items-center`}
    >
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link>
    </div>
  );
};

export default AppHeader;
