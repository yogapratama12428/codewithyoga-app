"use client";

// import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn} from "lucide-react";
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
  const isTeacher = false;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage || user ? (
          <UserNav imgUrl={user.picture}/>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : (
          <div className="flex">
           
            <Button>
              <LogIn className="h-4 w-4 mr-2" />
              <LoginLink>
                Login
              </LoginLink>
            </Button>
          </div>
        )}

       {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </>
  );
};