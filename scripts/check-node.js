#!/usr/bin/env node
/*
  Ensures supported Node.js version for this project.
  Supported: >=18.18.0 and <24 (Next.js 15)
*/

function parse(v) {
  const [major, minor, patch] = v.replace(/^v/, '').split('.').map(n => parseInt(n, 10));
  return { major, minor, patch };
}

function gte(a, b) {
  if (a.major !== b.major) return a.major > b.major;
  if (a.minor !== b.minor) return a.minor > b.minor;
  return a.patch >= b.patch;
}

const v = parse(process.version);
const min = { major: 18, minor: 18, patch: 0 };

const isTooOld = v.major < 18 || (v.major === 18 && !gte(v, min));
const isTooNew = v.major >= 24; // Next 15 does not yet support Node 24

if (isTooOld || isTooNew) {
  const msg = `\nUnsupported Node.js version: ${process.version}\n\n` +
`This project (Next.js 15) supports Node >=18.18 and <24.\n` +
`Please switch to Node 20 or 22 LTS.\n\n` +
`Quick fix (nvm):\n` +
`  nvm install 22 && nvm use 22\n\n` +
`Or install Node 22 via Homebrew (macOS):\n` +
`  brew install node@22\n  echo '\nexport PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc\n\n`;
  console.error(msg);
  process.exit(1);
}

