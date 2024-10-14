export interface UserType {
  _id: string;
  clerkUserId: string;
  name: string;
  username: string | null;
  email: string;
  profilePicture: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}
