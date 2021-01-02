const fs = require('fs');
const _ = require('lodash');


const htmlBody = fs.readFileSync('./build/index.html', 'utf8');
const scriptUrls = _.map(Array.from(htmlBody.matchAll(/<script src="([^>]+)">/g)), '1');

const headersFile = 
`
/
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: same-origin
  Content-Security-Policy: ${[
    "upgrade-insecure-requests",
    "frame-ancestors 'self'",
    "default-src 'none'",
    "connect-src 'self' https://www.google-analytics.com",
    "font-src data:",
    "style-src https: 'unsafe-inline'",
    "script-src 'sha256-uPF3fUiqECOhlHS013mA9mB9INeohyov2Rc34Bgvppk=' https:",
    "img-src 'self' https:",
  ].join('; ')}
  ${scriptUrls.map(u => 'Link: <' + u + '; as=script; rel=preload>').join('\n  ')}
`

console.log(headersFile);

fs.writeFileSync('./build/_headers', headersFile);
