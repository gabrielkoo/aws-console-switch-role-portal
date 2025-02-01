# aws-console-switch-role-portal

[![Netlify Status](https://api.netlify.com/api/v1/badges/7be8ecdf-a365-4326-ae39-9ba820718c4c/deploy-status)](https://app.netlify.com/sites/aws-switchrole/deploys)

*[Update 2025-01]* AWS Revamped the switch portal page so that the colors in this repo are no longer correct, as well as the `redirectUri` is no longer supported. I recommend you switch to usinf AWS Identity Center with my other project instead:  <https://iamidentitycenterroles.us-east-1.com/>

## Live Site

Visit https://aws-switchrole.netlify.app

## Notion of this project

Q: [An existing Chrome plugin](https://chrome.google.com/webstore/detail/aws-extend-switch-roles/jpmkfafbacpgapdghgdpembnojdlgkdl/overview) is available, why I need your project?

A: It is of course is great, but there are scenarios when security-aware individuals would like to avoid applying a browser plugin by all means especially when accessing AWS resources through the AWS Console, which could contain sensitive information.

Q: What do you need for the app?

A: Basically I need to have these features, which are not available within AWS Console's "Switch Role" current functionality:

- To create/edit/delete records easily
- To supply a redirect URL upon successful switching of role

That's how this web app was initially created (for myself).

## Run locally

Requirements:

- `nodejs`
- `yarn`

```shell
# install dependencies
yarn
# start local web server
yarn start
# make a build
yarn build
```

The role list is stored inside localstorage and updated upon save.

## Known issues

- Actually the default color, namely `#000000`, won't work because AWS's script doesn't include the color inside it's form's radio field.
- Duplication of the tuple `(account, roleName)` is NOT avoided (yet).

## TODOs

- [ ] Show warning when the color `#000000` is chosen
- [ ] Show validation error when there is existing record with the same `(account, roleName)`
- [x] Account ID/Alias and role name validation (Reference: [account alias](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateAccountAlias.html#API_CreateAccountAlias_RequestParameters) and [role name](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html#API_CreateRole_ResponseElements))
- [ ] Allow import/export from/to your local `~/.aws/config`
- [x] Allow setting the `redirectURI` querystring parameter
- [ ] Mobile responsiveness

## Disclaimer

I am not an expert in TypeScript so please bear my poor TypesScript... Instead, I am more a DevSecOps engineer...
