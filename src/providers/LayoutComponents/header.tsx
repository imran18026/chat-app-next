"use client";
import { UserType } from "@/interfaces";
import { SetCurrentUser, UserState } from "@/redux/userSlice";
import { GetCurrentUserFromDB } from "@/serverActions/user.server";
import { Avatar, message } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentUserInfo from "./currentUserInfo";

export const Header = () => {
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const [showCurrentUserInfo, setShowCurrentUserInfo] = useState(false);

  const pathName = usePathname();

  const isPublicRoute =
    pathName?.includes("/sign-in") || pathName?.includes("/sign-up");

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUserFromDB();
      if (response.error) {
        message.error(response.error);
      }
      dispatch(SetCurrentUser(response as UserType));
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  if (isPublicRoute) return null;

  return (
    <div className="bg-gray-200 w-full py-1 flex justify-between items-center px-5 mr-20 mt-16 max-w-screen-xl min-h-full border-b border-gray-600">
      <div>
        <h1 className="text-3xl font-semibold uppercase text-primary ">
          Chat App
        </h1>
      </div>

      <div className="gap-5 flex items-center">
        <span className="text-sm"> {currentUserData?.name}</span>
        <Avatar
          alt="profilePicture"
          className="cursor-pointer"
          onClick={() => setShowCurrentUserInfo(true)}
          src={currentUserData?.profilePicture}
        />
      </div>
      {showCurrentUserInfo && (
        <CurrentUserInfo
          setShowCurrentUserInfo={setShowCurrentUserInfo}
          showCurrentUserInfo={showCurrentUserInfo}
        />
      )}
    </div>
  );
};
