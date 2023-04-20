export type User = {
  id: string;
  fullName: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  date_of_birth?: number[];
  gender?: string;
  profilePhotoUrl: string;
};

export type userProfile = {
  id: number;
  aboutSection: string;
  profilePhotoId: number;
  bannerPhotoId: number;
};
