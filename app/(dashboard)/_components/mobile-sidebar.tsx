import { Menu } from "lucide-react";

import { 
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";
  
import { Sidebar } from "./Sidebar";
import { Logo } from "./logo";



export const MobileSidebar = () => {
  return (
    <div>
      <div className="block sm:hidden">
        <Sheet>
          <SheetTrigger className="pr-4 hover:opacity-75 transition">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-white">
            <Sidebar/>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block">
        <Logo />
      </div> 
    </div>
   
    
  )
   
}