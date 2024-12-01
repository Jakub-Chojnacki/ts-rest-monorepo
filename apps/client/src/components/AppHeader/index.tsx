import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import useAuth from "@/hooks/useAuth";

import { Button } from "../ui/button";

const AppHeader = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <div
      className={`px-4 gap-2 bg-black text-white h-header flex items-center`}
    >
      <Link to="/" className="[&.active]:font-bold">
        CodeFitness
      </Link>
      <div className="flex gap-4 items-center ml-auto">
        {!isAuthenticated && (
          <Fragment>
            <Link to="/login" className="[&.active]:font-bold">
              <Button variant="secondary"> Logowanie</Button>
            </Link>
            <Link to="/signup" className="[&.active]:font-bold">
              <Button variant="ghost"> Rejestracja</Button>
            </Link>
          </Fragment>
        )}
        {isAuthenticated && <Button onClick={signOut}>Wyloguj</Button>}
      </div>
    </div>
  );
};

export default AppHeader;
