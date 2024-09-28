import Link from "next/link";
import { useAuth } from "../contexts/authProvider";

export default function AppBar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href={"/"}
                    className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center pr-2 ">
              <div className="ml-3">
                <div
                  className=""
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {isAuthenticated ? (
                    <button
                      className="block px-4 py-2 text-sm text-white"
                      role="menuitem"
                      id="user-menu-item-2"
                      onClick={logout}
                    >
                      Sign out
                    </button>
                  ) : (
                    <div className="flex flex-row gap-5">
                      <Link href={"/login"}>Log in</Link>
                      <Link href={"/signup"}>Sign up</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
