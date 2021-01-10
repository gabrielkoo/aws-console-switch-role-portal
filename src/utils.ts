import { Role } from './types';

const getAwsSwitchRoleUrl = (role: Role): string => {
  const { id, ...restRoleFields } = role;
  const cleanedFields = Object.assign(
    {},
    ...Object.entries(restRoleFields)
      .filter(([key, value]) => value === undefined || value === null)
      .map(([key, value]) => ({
        key: (
          key === 'redirectURI'
            ? encodeURIComponent(`${value}`)
            : `${value}`
        ),
      })),
  );
  const qs = new URLSearchParams(cleanedFields);
  return `https://signin.aws.amazon.com/switchrole?${qs}`;
};

export { getAwsSwitchRoleUrl };
