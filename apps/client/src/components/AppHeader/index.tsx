import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { BicepsFlexed, LogOut, UserPen } from "lucide-react";

import useAuth from "@/hooks/useAuth";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { TDropdownMenuConfig } from "./types";

const AppHeader = () => {
  const { signOut, isAuthenticated } = useAuth();

  const dropdownMenuConfig: TDropdownMenuConfig[] = [
    {
      label: "Mój profil",
      icon: UserPen,
      path: "/profile",
    },
    {
      label: "Moje rezerwacje",
      icon: BicepsFlexed,
      path: "/user-reservations",
    },
  ];

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
        {isAuthenticated && (
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="relative ">
                  Moje konto
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {dropdownMenuConfig.map(({ icon: Icon, label, path }) => (
                  <Link to={path} key={path} className="flex items-center">
                    <DropdownMenuItem className="cursor-pointer">
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Wyloguj się</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
