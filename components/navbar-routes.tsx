"use client";

// import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut} from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import UserNav from "./user-nav";
// import { SafeProfile } from "@/types";

interface NavbarRoutesProps  {
  user: any;
}

export const NavbarRoutes : React.FC<NavbarRoutesProps> = ({user}) => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapters");
  const isSearchPage = pathname === "/search";
  const isTeacher = true;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2">
        <div className="flex gap-x-2 ml-auto">
          { 
          user && (
            isTeacherPage || isPlayerPage ? (
              <Link href="/">
                <Button size="sm" variant="ghost">
                  <LogOut className="h-4 w-4 mr-2" />
                  Exit
                </Button>
              </Link>
            ) : isTeacher ? (
              <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">
                  Teacher Mode
                </Button>
              </Link>
            ) : null
          )
         }
        </div>

        <div className="flex gap-x-2 ml-auto">
          {user ? (
            <UserNav imgUrl={user.picture}/>
          ): (
            <div className="flex">
              <Button>
                <LogIn className="h-4 w-4 mr-2" />
                <LoginLink>
                  Login
                </LoginLink>
              </Button>
            </div>
          )}
        </div>
      </div>
     
    </>
  );
};