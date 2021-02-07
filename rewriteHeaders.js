const { readFileSync, writeFileSync } = require('fs');

/* Default index.html output path */
const filePath = './build/index.html';
const headersPath = './build/_headers';
const rawHtml = readFileSync(filePath).toString();
let rawHeaders = readFileSync(headersPath).toString();

/* Extract the CSP from file */
const csp = /<meta http-equiv="Content-Security-Policy" content="([^>]*)">/.exec(rawHtml)[1]
/* Redact the CSP meta tag */
writeFileSync(filePath, rawHtml.replace(
  /<meta http-equiv="Content-Security-Policy" content="[^>]*">/g,
  '',
));

const scriptSourceMatches = rawHtml.matchAll(/<script src="([^"]*)" [^>]*><\/script>/g);
const preloadLinks = Array.from(scriptSourceMatches).map(([_, path]) => (
  `Link: <${path}; rel=preload; as=script>`
));
writeFileSync(headersPath, rawHeaders
  .replace(
    '%CSP_PLACEHOLDER%',
    csp,
  )
  .replace(
    'Link: <placeholder>',
    preloadLinks.join('\n  '),
  )
);
