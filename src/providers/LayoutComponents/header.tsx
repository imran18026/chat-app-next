"use client";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromDB } from "@/serverActions/user.server";
import { Avatar, message } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CurrentUserInfo from "./currentUserInfo";

export const Header = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] = useState(false);

  const pathName = usePathname();

  const isPublicRoute =
    pathName?.includes("/sign-in") || pathName?.includes("/sign-up");

  if (isPublicRoute) return null;

  const getCurrentUser = async () => {
    try {
      const res = await GetCurrentUserFromDB();
      if (res.error) {
        message.error(res.error);
      }
      setCurrentUser(res);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    currentUser && (
      <div className="bg-gray-200 w-full py-1 flex justify-between items-center px-5 mr-20 mt-16 max-w-screen-xl min-h-full border-b border-gray-600">
        <div>
          <h1 className="text-3xl font-semibold uppercase text-primary ">
            Chat App
          </h1>
        </div>

        <div className="gap-5 flex items-center">
          <span className="text-sm"> {currentUser?.name}</span>
          <Avatar
            alt="profilePicture"
            className="cursor-pointer"
            onClick={() => setShowCurrentUserInfo(true)}
            src={currentUser?.profilePicture}
          />
        </div>
        {showCurrentUserInfo && (
          <CurrentUserInfo
            currentUser={currentUser}
            setShowCurrentUserInfo={setShowCurrentUserInfo}
            showCurrentUserInfo={showCurrentUserInfo}
          />
        )}
      </div>
    )
  );
};
