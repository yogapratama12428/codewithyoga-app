// import auth session from Kinde
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {

  const { getUser } = getKindeServerSession();
  const user = await getUser()

  return (
    <div className="p-6 space-y-4">
      hello
    </div>
  )
}