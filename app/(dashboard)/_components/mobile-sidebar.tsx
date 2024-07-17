import { icons, Menu } from "lucide-react";

import { 
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";
  
import { Sidebar } from "./Sidebar";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";



export const MobileSidebar = () => {
  return (
    <div>
      <div className="block md:hidden">
        <Sheet> 
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="h-4 w-4"/>
            </Button>
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