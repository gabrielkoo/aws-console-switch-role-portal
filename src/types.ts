export type Role = {
  id: string;
  account: string;
  displayName: string;
  roleName: string;
  color: string;
  [key: string]: string | undefined;
};
