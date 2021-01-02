import { Role } from './types';

const getAwsSwitchRoleUrl = (role: Role): string => {
  const { roleName, account, displayName, color } = role;
  const qs = new URLSearchParams({ roleName, account, displayName, color });
  return `https://signin.aws.amazon.com/switchrole?${qs}`;
};

export { getAwsSwitchRoleUrl };
