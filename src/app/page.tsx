import { connectToDB } from "@/config/dbConfig";
import { GetCurrentUserFromDB } from "@/serverActions/user.server";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
connectToDB();
export default async function Home() {
  // const loggedInUserData: any = await currentUser();
  const loggedInUserData: any = await GetCurrentUserFromDB();

  return (
    <div className="p-10">
      <div className="flex flex-col gap-3 text-3xl">
        <UserButton afterSwitchSessionUrl="/sign-in" />
        <span>name: {loggedInUserData?.name} </span>
        <span>User name: {loggedInUserData?.username} </span>
        <span>Email: {loggedInUserData?.email}</span>
        {/* <span>Profile: {loggedInUserData?.profilePicture}</span> */}
      </div>
    </div>
  );
}
