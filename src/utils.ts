import { Role } from './types';

const getAwsSwitchRoleUrl = (role: Role): string => {
  const { id, redirectURI, ...restRoleFields } = role;
  const cleanedFields = Object.assign(
    { redirect_uri: redirectURI || '' },
    ...Object.entries(restRoleFields)
      .filter(([key, value]) => !(value === undefined || value === null))
      .map(([key, value]) => ({ [key]: value })),
  );
  const qs = new URLSearchParams(cleanedFields);
  return `https://signin.aws.amazon.com/switchrole?${qs.toString()}`;
};

export { getAwsSwitchRoleUrl };
