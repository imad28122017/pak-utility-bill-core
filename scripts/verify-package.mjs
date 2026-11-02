// Verify the actual npm tarball from a fresh, offline consumer, without publishing.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const work = mkdtempSync(join(tmpdir(), 'bill-core-consumer-'));
const options = { cwd: work, stdio: 'pipe', encoding: 'utf8', timeout: 60000 };
try {
  const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.notEqual(manifest.private, true, 'This early-access package must be publishable only after owner approval');
  assert.equal(manifest.version, '0.2.2-beta.0', 'Unexpected prerelease version');
  assert.equal(manifest.publishConfig?.tag, 'next', 'Do not publish prerelease to latest');
  assert.equal(Object.keys(manifest.dependencies || {}).length, 0, 'No runtime dependencies expected');
  const packed = JSON.parse(execFileSync('npm', ['pack', '--json', '--pack-destination', work], {
    ...options, cwd: root, env: { ...process.env, npm_config_audit: 'false', npm_config_fund: 'false' }
  }));
  assert.equal(packed.length, 1);
  const names = packed[0].files.map(f => f.path);
  for (const required of ['package.json', 'README.md', 'LICENSE', 'SECURITY.md', 'src/index.mjs', 'src/index.d.mts']) {
    assert.ok(names.includes(required), 'Missing distributable file: ' + required);
  }
  for (const name of names) {
    assert.ok(/^(?:src\/|README\.md$|LICENSE$|SECURITY\.md$|package\.json$)/.test(name), 'Unexpected distributable file: ' + name);
  }
  assert.equal(readdirSync(work).filter(f => f.endsWith('.tgz')).length, 1);
  writeFileSync(join(work, 'package.json'), JSON.stringify({ name: 'consumer-verification', private: true, type: 'module' }));
  execFileSync('npm', ['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', join(work, packed[0].filename)], options);
  const script = [
    "import assert from 'node:assert/strict';",
    "import { parseBillText, mergeVerifiedBill, validISODate } from 'pak-utility-bill-core';",
    "assert.equal(validISODate('2026-11-02'), true);",
    "const parsed = parseBillText('IESCO\\nBilling Month: October 2026\\nReference No: 99998888777766\\nAmount Due: PKR 1,234.50\\nDue Date: 05 Nov 2026');",
    "assert.equal(parsed.amountMinor, 123450);",
    "const stored = {provider:'iesco',reference:'99998888777766',billingPeriod:'2026-09',amountMinor:2000,dueDate:'2026-10-01',paid:false};",
    "const result = mergeVerifiedBill(stored, parsed, '2026-11-02');",
    "assert.equal(result.status, 'updated');",
  ].join('\n');
  execFileSync(process.execPath, ['--input-type=module', '-e', script], options);
  console.log('OK: packaged ' + names.length + ' files, installed offline, imports verified');
} finally {
  rmSync(work, { recursive: true, force: true });
}
