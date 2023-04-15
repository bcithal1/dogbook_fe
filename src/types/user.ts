export type User = {
  id?: number;
  fullName: string;
  displayName: string;
  email: string;
  address: string;
  phoneNumber: string;
  date_of_birth: Date;
  gender: string;
  profilePhotoUrl: string;
};

export type userProfile = {
  id: number;
  aboutSection: string;
  profilePhotoId: number;
  bannerPhotoId: number;
};
