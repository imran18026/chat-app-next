"use client";
import { UploadImageToFirebaeAndReturnUrl } from "@/helpers/imageUploades";
import { UserState } from "@/redux/userSlice";
import { useClerk } from "@clerk/nextjs";
import { Button, Drawer, message, Upload } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// comment

const CurrentUserInfo = ({
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const getProperty = (key: string, value: string | null) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{key}</span>
        <span className="text-gray-500">{value}</span>
      </div>
    );
  };
  const router = useRouter();

  const { signOut } = useClerk();
  const onLogOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowCurrentUserInfo(false);
      message.success("Logged out successfully");
      setLoading(true);
      router.push("/sign-in");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onUpdateProfilePicture = async () => {
    try {
      const response: string = await UploadImageToFirebaeAndReturnUrl(
        selectedFile!
      );
      message.success("Profile picture updated successfully");
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="Profile"
    >
      {currentUserData && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 justify-center items-center">
            {!selectedFile && (
              <Image
                src={currentUserData?.profilePicture}
                width={200}
                height={200}
                alt="profile"
              />
            )}

            <Upload
              beforeUpload={(file: any) => {
                setSelectedFile(file);
                return false;
              }}
              className="cursor-pointer"
              listType={selectedFile ? "picture-circle" : "text"}
              maxCount={1}
            >
              <span className="text-gray-950 font-bold">
                {selectedFile ? "Change Picture" : "Upload Profile Picture"}
              </span>
            </Upload>
          </div>
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUserData?.name)}
            {getProperty("Username", currentUserData?.username)}
            {getProperty("id", currentUserData?._id)}
            {getProperty(
              "joined on",
              dayjs(currentUserData?.createdAt).format("DD-MM-YYYY : hh:mm  A")
            )}
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <Button
              className="text-gray-500 w-full border-t border-gray-300 py-3"
              disabled={!selectedFile}
              loading={loading}
              block
              onClick={onUpdateProfilePicture}
            >
              Update Profile Picture
            </Button>
            <Button
              className="text-gray-500 w-full border-t border-gray-300 py-3"
              loading={loading}
              block
              onClick={onLogOut}
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default CurrentUserInfo;
