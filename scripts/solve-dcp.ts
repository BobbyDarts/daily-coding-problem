#!/usr/bin/env ts-node

import { execSync } from "child_process";

// npm passes all args after the script name, but we need to handle -- separator
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run") || args.includes("-d");

// Filter out flags to get positional arguments
const positionalArgs = args.filter((arg) => !arg.startsWith("-"));
const [problemNumber, ...problemNameParts] = positionalArgs;
const problemName = problemNameParts.join(" "); // Handle multi-word names without quotes

if (!problemNumber || !problemName) {
  console.error('Usage: npm run solve:dcp <problem-number> "<problem-name>"');
  console.error(
    '       npm run solve:dcp -- <problem-number> "<problem-name>" --dry-run'
  );
  console.error('Example: npm run solve:dcp 1818 "Closest Points"');
  console.error(
    '         npm run solve:dcp -- 1818 "Closest Points" --dry-run'
  );
  process.exit(1);
}

const branchName = `dcp/problem/${problemNumber}`;

if (dryRun) {
  console.log("🔍 DRY RUN MODE - No commands will be executed\n");
}

const runCommand = (command: string, description: string): void => {
  console.log(`${description}...`);

  if (dryRun) {
    console.log(`  Would run: ${command}`);
    return;
  }

  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`❌ Error: ${description} failed`);
    process.exit(1);
  }
};

runCommand("git add .", "📝 Adding changes");
runCommand(
  `git commit -m "Solve DCP problem ${problemNumber}: ${problemName}"`,
  "💾 Committing"
);
runCommand("git checkout main", "🔄 Switching to main");
runCommand(`git merge ${branchName}`, "🔀 Merging");
runCommand("git push origin main", "⬆️  Pushing to remote");
runCommand(`git branch -d ${branchName}`, "🗑️  Cleaning up branch");

console.log(dryRun ? "\n✅ Dry run complete!" : "✅ Done!");
