interface IAuth {
  access_token: string;
  refresh_token: string;
  user_info: IUser;
}

interface IUser {
  username: string;
  profile_name: string;
  role: 'superadmin' | 'po' | null | undefined;
}
