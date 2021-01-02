import React from 'react';
import MuiLink, { LinkProps } from '@material-ui/core/Link';

const Link = (props: LinkProps) => (
  <MuiLink
    target="_blank"
    rel="noreferrer noopener"
    {...props}
  />
);

export default Link;
