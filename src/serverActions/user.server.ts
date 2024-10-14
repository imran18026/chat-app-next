"use server";
import { connectToDB } from "@/config/dbConfig";
import { UserModel } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

connectToDB();

export const GetCurrentUserFromDB = async () => {
  try {
    const clerkUser = await currentUser();

    //check if the user is already in the database based on clerk User ID
    const mogoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });
    // if the user is not in the database, create a new user in the database
    if (mogoUser) {
      return JSON.parse(JSON.stringify(mogoUser));
    }
    const newUserPayload: {
      clerkUserId: string | undefined;
      name: string;
      username: string | null | undefined;
      email: string | undefined;
      profilePicture: string | undefined;
    } = {
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      username: clerkUser?.username,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePicture: clerkUser?.imageUrl,
    };

    const newUser = await UserModel.create(newUserPayload);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
