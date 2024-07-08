import React from 'react'

import { Logo } from './logo';
import { MobileSidebar } from './mobile-sidebar';
import { NavbarRoutes } from '@/components/navbar-routes';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const Navbar = async () => {

  const { getUser } = getKindeServerSession()
  const user = await getUser(); 

  console.log(user);

  const userId = false;

  return (
    <div className="p-4 border-b h-full flex justify-between items-center bg-white shadow-sm">
      {
        userId ? ( <MobileSidebar /> ) : (<Logo/> ) 
      }

      <NavbarRoutes user={user}/>
    </div>
  )
}
