#!/usr/bin/env node

/**
 * AssetBridge - Commit Hygiene & README Markdown Reporter
 * File: scripts/commit-log-report.js
 * 
 * Usage: node scripts/commit-log-report.js [N]
 * Default N = 20
 */

import { execSync } from 'child_process';

const MINIMUM_COMMITS_REQUIRED = 20;

function getCommitLogs(limit = 20) {
  try {
    const rawCount = execSync('git rev-list --count HEAD', { encoding: 'utf-8' }).trim();
    const totalCommits = parseInt(rawCount, 10) || 0;

    const logOutput = execSync(`git log -n ${limit} --pretty=format:"%h|%cd|%s" --date=short`, {
      encoding: 'utf-8',
    }).trim();

    return { totalCommits, logOutput };
  } catch (err) {
    console.error('Error fetching git commit log:', err.message);
    process.exit(1);
  }
}

function runReport() {
  const args = process.argv.slice(2);
  const limit = parseInt(args[0], 10) || 20;

  console.log('\n=============================================================');
  console.log('  🌕 ASSETBRIDGE COMMIT HYGIENE REPORT (Level 5 Requirements)');
  console.log('=============================================================\n');

  const { totalCommits, logOutput } = getCommitLogs(limit);

  console.log(`📊 Total Commit Count in Repository: ${totalCommits}`);

  if (totalCommits >= MINIMUM_COMMITS_REQUIRED) {
    console.log(`✅ PASSED: Commit count (${totalCommits}) meets or exceeds the Level 5 threshold of ${MINIMUM_COMMITS_REQUIRED}+ meaningful commits.\n`);
  } else {
    console.log(`⚠️ WARNING: Commit count (${totalCommits}) is below the required ${MINIMUM_COMMITS_REQUIRED} commits.`);
    console.log(`   Needed: ${MINIMUM_COMMITS_REQUIRED - totalCommits} more meaningful commits.\n`);
    console.log('💡 Suggested Legitimate Commit Categories (No filler commits!):');
    console.log('   - docs: update USAGE.md or README.md with detailed preprod instructions');
    console.log('   - test: add unit tests for bridge progress status step machine');
    console.log('   - fix: clean up UI micro-animations and mobile media queries');
    console.log('   - feat: add Google Form export script and user tracker CSV');
    console.log('   - refactor: optimize wallet debouncing logic in Header.jsx\n');
  }

  console.log('--- FORMATTED FOR README FEEDBACK IMPLEMENTATION TABLE ---\n');
  console.log('| Git Commit ID | Date | Commit Message | GitHub Link |');
  console.log('| :--- | :--- | :--- | :--- |');

  const lines = logOutput.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const [hash, date, msg] = line.split('|');
    const cleanMsg = (msg || '').replace(/\|/g, '-');
    console.log(`| [\`${hash}\`](https://github.com/thanchanb/AssetBridge/commit/${hash}) | ${date} | ${cleanMsg} | [View Commit](https://github.com/thanchanb/AssetBridge/commit/${hash}) |`);
  }

  console.log('\n=============================================================\n');
}

runReport();
