import React from 'react'

import { Logo } from './logo';
import { MobileSidebar } from './mobile-sidebar';
import { NavbarRoutes } from '@/components/navbar-routes';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const Navbar = async () => {

  const { getUser } = getKindeServerSession()
  const user = await getUser(); 

  console.log(user);

  return (
    <div className="p-4 border-b h-full  justify-between flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm">
      <MobileSidebar /> 
    
      <NavbarRoutes user={user}/>
    </div>
  )
}
