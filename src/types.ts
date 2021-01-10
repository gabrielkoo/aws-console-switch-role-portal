export type Role = {
  id: string;
  account: string;
  displayName: string;
  roleName: string;
  color: string;
  redirectURI: string;
  // For role[key] usages.
  [key: string]: string | undefined;
};
