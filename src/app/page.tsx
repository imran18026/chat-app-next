import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const loggedInUserData = await currentUser();
  return (
    <div className="p-10">
      <div className="flex flex-col gap-3 text-3xl">
        <UserButton afterSwitchSessionUrl="/sign-in" />
        <span>First name:{loggedInUserData?.firstName} </span>
        <span>Last name: {loggedInUserData?.lastName}</span>
        <span>User name: {loggedInUserData?.username} </span>
        <span>Email: {loggedInUserData?.emailAddresses[0]?.emailAddress}</span>
      </div>
    </div>
  );
}
