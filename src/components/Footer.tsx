import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons';
import Link from './Link';

const socialProfiles = [
  { icon: GitHub, href: 'https://github.com/gabrielkoo' },
  { icon: LinkedIn, href: 'https://linkedin.com/in/gabriel-koo' },
  { icon: Twitter, href: 'https://twitter.com/gabrielkoo_' },
];

const Footer: React.FC = () => (
  <Box display="flex" pt={2} alignItems="center" flexDirection="column">
    <Box maxWidth={480}>
      <Typography align="center" component="p" variant="caption">
        An existing browser plugin is of course is great, but there are
        scenarios when security-aware individuals would like to avoid applying a
        browser plugin by all means especially when accessing AWS resources
        through the AWS Console, which could contain sensitive information.
        <br />
        <br />
        That's how this web app was initially created.
      </Typography>
    </Box>

    <Box mt={2}>
      <Typography component="p">
        Report a problem / Contribute
        <Link
          href="https://github.com/gabrielkoo/aws-console-switch-role-portal"
          children=" here"
        />
      </Typography>
    </Box>

    <Box mt={2}>
      <Typography component="p">
        Created by <Link href="https://gabrielkoo.com" children="Gabriel Koo" />
        , hosted on <Link href="https://www.netlify.com/" children="Netlify" />.
      </Typography>
    </Box>

    <Box>
      <Typography component="p">
        {[
          socialProfiles.map(({ icon: Icon, href }, ix) => (
            <IconButton
              key={ix}
              href={href}
              target="_blank"
              rel="noopener noreferer"
              children={<Icon fontSize="small" />}
            />
          )),
        ]}
      </Typography>
    </Box>
  </Box>
);

export default Footer;
