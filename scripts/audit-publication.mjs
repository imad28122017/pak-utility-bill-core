// Targeted credential screening of tracked files and reachable Git patch history.
// This is NOT a replacement for human review or a specialist secret scanner.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const run = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
const rules = [
  ['private key PEM', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['GitHub personal access token', /\b(?:ghp_[a-zA-Z0-9]{30,}|github_pat_[a-zA-Z0-9_]{30,})\b/],
  ['OpenAI-style secret token', /\bsk-[a-zA-Z0-9_-]{26,}\b/],
  ['AWS access key', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/],
  ['Slack token', /\bxox[baprs]-[a-zA-Z0-9-]{20,}\b/],
  ['Stripe live secret', /\bsk_live_[a-zA-Z0-9]{20,}\b/],
  ['Common secret assignment', /\b(?:API_KEY|ACCESS_TOKEN|CLIENT_SECRET|PASSWORD|PRIVATE_KEY)\s*[:=]\s*["'](?!CHANGEME|EXAMPLE|PLACEHOLDER)[a-z0-9\/+_=-]{25,}["']/i],
];
const problems = [];
function scan(where, data) {
  for (const [kind, pattern] of rules) if (pattern.test(data)) problems.push(where + ': possible ' + kind + ' (value suppressed)');
}
const files = run('ls-files', '-z').split('\0').filter(Boolean);
for (const path of files) scan(path, readFileSync(path, 'utf8'));
scan('Git history', run('log', '--all', '--format=', '--patch', '--no-ext-diff'));
console.log('Scanned ' + files.length + ' tracked files and Git patch history using ' + rules.length + ' targeted patterns');
if (problems.length) {
  for (const problem of problems) console.error(problem);
  process.exitCode = 1;
} else console.log('No targeted credential patterns found. Manual review remains mandatory.');
