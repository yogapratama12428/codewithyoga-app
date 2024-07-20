import { icons, LayoutDashboard, Menu, Minimize2 } from "lucide-react";

import { 
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

  
import { Sidebar } from "./Sidebar";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";



export const MobileSidebar = () => {
  return (
    <div>
      <div className="block md:hidden">
        <Sheet> 
          <SheetTrigger asChild>
            <Button size="icon">
              <Menu className="h-6 w-6"/>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-white">
            <Sidebar/>
          </SheetContent>
        </Sheet>
      </div>
      {/* <div className="block md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
           <Button size="icon">
              <Menu className="h-6 w-6"/>
            </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full h-96">
            <div className="flex flex-wrap gap-2 mx-2 ">

              <Button asChild>
                <div className="border m-4 bg-sky-950 flex flex-col gap-2 w-20 h-20">
                  <LayoutDashboard className="w-7 h-7"/>
                    <p className=" text-xs text-white">
                        Dashboard
                    </p>
                </div>
              </Button>
                

            </div>


          </div>
        </DrawerContent>
      </Drawer>

      </div> */}
      <div className="hidden md:block">
        <Logo />
      </div> 
    </div>
   
    
  )
   
}