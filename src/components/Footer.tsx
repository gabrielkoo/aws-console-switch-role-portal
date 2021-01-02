import React from 'react';
import { Box, IconButton, Link, Typography } from '@material-ui/core';
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons';

const socialProfiles = [
  { icon: GitHub, color: '#24292e', href: 'https://github.com/gabrielkoo' },
  {
    icon: LinkedIn,
    color: '#0077b5',
    href: 'https://linkedin.com/in/gabriel-koo',
  },
  { icon: Twitter, color: '#1da1f2', href: 'https://twitter.com/gabrielkoo_' },
];

const Footer: React.FC = () => (
  <Box display="flex" pt={2} alignItems="center" flexDirection="column">
    <Typography component="p">
      Created by <Link href="https://gabrielkoo.com" children="Gabriel Koo" />,
      hosted on <Link href="https://www.netlify.com/" children="Netlify" />
    </Typography>
    <Typography component="p">
      {[
        socialProfiles.map(({ icon: Icon, color, href }, ix) => (
          <IconButton
            key={ix}
            href={href}
            target="_blank"
            rel="noopener noreferer"
            children={<Icon style={{ color }} fontSize="small" />}
          />
        )),
      ]}
    </Typography>
  </Box>
);

export default Footer;
