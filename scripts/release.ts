import prompts from 'prompts';
import simpleGit, { SimpleGit } from 'simple-git';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';

interface Package {
  name: string;
  path: string;
  version: string;
}

const versionTypes = [
  { title: 'patch (补丁版本)', value: 'patch' as const },
  { title: 'minor (次版本)', value: 'minor' as const },
  { title: 'major (主版本)', value: 'major' as const }
];

async function detectPackages(): Promise<Package[]> {
  const packagesDir = join(process.cwd(), 'packages');
  const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

  const packages: Package[] = [];

  for (const pkgName of packageDirs) {
    const pkgPath = join(packagesDir, pkgName);
    const pkgJsonPath = join(pkgPath, 'package.json');

    try {
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
      packages.push({
        name: pkgJson.name || pkgName,
        path: pkgPath,
        version: pkgJson.version || '0.0.0'
      });
    } catch {
      console.warn(`⚠️ 跳过 ${pkgName}: 无法读取 package.json`);
    }
  }

  return packages;
}

function bumpVersion(version: string, type: 'patch' | 'minor' | 'major'): string {
  const parts = version.split('.').map(Number);
  if (parts.length !== 3) {
    throw new Error(`无效的版本号: ${version}`);
  }

  const [major, minor, patch] = parts;

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`未知的版本类型: ${type}`);
  }
}

async function getCommitsSinceLastTag(pkgPath: string, git: SimpleGit): Promise<string[]> {
  try {
    const pkgName = basename(pkgPath);
    const tags = await git.tags();
    const pkgTags = tags.all.filter(tag => tag.startsWith(`${pkgName}@`));

    if (pkgTags.length === 0) {
      const allCommits = await git.log({ file: pkgPath, '--all': null });
      return allCommits.all.map(c => c.message);
    }

    const latestTag = pkgTags.sort((a, b) => {
      const verA = a.split('@')[1];
      const verB = b.split('@')[1];
      return verB.localeCompare(verA);
    })[0];

    const commits = await git.log({
      from: latestTag,
      to: 'HEAD',
      file: pkgPath
    });

    return commits.all.map(c => c.message);
  } catch {
    return [];
  }
}

async function generateChangelog(
  pkgName: string,
  newVersion: string,
  commits: string[]
): Promise<string> {
  try {
    execSync(
      `npx conventional-changelog -p conventionalcommits -k ${pkgName} --same-file`,
      {
        cwd: process.cwd(),
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      }
    ).toString();

    const date = new Date().toISOString().split('T')[0];
    let content = `## ${newVersion} (${date})\n\n`;

    if (commits.length === 0) {
      content += '* 初始化版本\n';
    } else {
      const features: string[] = [];
      const fixes: string[] = [];
      const docs: string[] = [];
      const others: string[] = [];

      commits.forEach(commit => {
        const msg = commit.trim();
        if (msg.match(/^feat[(:]/)) {
          features.push(`* ${msg}`);
        } else if (msg.match(/^fix[(:]/)) {
          fixes.push(`* ${msg}`);
        } else if (msg.match(/^docs[(:]/)) {
          docs.push(`* ${msg}`);
        } else {
          others.push(`* ${msg}`);
        }
      });

      if (features.length > 0) {
        content += '### Features\n\n' + features.join('\n') + '\n\n';
      }
      if (fixes.length > 0) {
        content += '### Bug Fixes\n\n' + fixes.join('\n') + '\n\n';
      }
      if (docs.length > 0) {
        content += '### Documentation\n\n' + docs.join('\n') + '\n\n';
      }
      if (others.length > 0) {
        content += '### Other Changes\n\n' + others.join('\n') + '\n\n';
      }
    }

    return content;
  } catch {
    let content = `## ${newVersion} (${new Date().toISOString().split('T')[0]})\n\n`;

    if (commits.length === 0) {
      content += '* 初始化版本\n';
    } else {
      commits.forEach(commit => {
        content += `* ${commit.trim()}\n`;
      });
    }

    return content;
  }
}

async function updatePackageJson(pkgPath: string, newVersion: string): Promise<void> {
  const pkgJsonPath = join(pkgPath, 'package.json');
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
  pkgJson.version = newVersion;
  writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
}

async function updateChangelog(pkgPath: string, newChangelog: string): Promise<void> {
  const changelogPath = join(pkgPath, 'CHANGELOG.md');
  let existingChangelog = '';

  try {
    existingChangelog = readFileSync(changelogPath, 'utf-8');
  } catch {
    existingChangelog = '# Changelog\n\n';
  }

  const headerMatch = existingChangelog.match(/^# Changelog\n+/);
  const header = headerMatch ? headerMatch[0] : '# Changelog\n\n';
  const existingContent = existingChangelog.replace(/^# Changelog\n+/, '');

  const combinedChangelog = header + newChangelog + '\n' + existingContent;
  writeFileSync(changelogPath, combinedChangelog);
}

async function main() {
  console.log('\n🚀 Monorepo 交互式发布工具\n');

  const packages = await detectPackages();

  if (packages.length === 0) {
    console.error('❌ 未找到任何包');
    process.exit(1);
  }

  console.log(`📦 找到 ${packages.length} 个包\n`);

  const selectedPackages = await prompts({
    type: 'multiselect',
    name: 'packages',
    message: '选择要发布的包 (空格选择，回车确认):',
    hint: '- Space 选择, Enter 确认, A 全选',
    instructions: '\n  (使用 空格键 选择，回车确认全选)',
    choices: packages.map(pkg => ({
      title: `${pkg.name} (${pkg.version})`,
      value: pkg.name,
      description: pkg.path
    })),
    min: 1
  });

  if (!selectedPackages.packages || selectedPackages.packages.length === 0) {
    console.log('❌ 未选择任何包，退出');
    process.exit(0);
  }

  const git: SimpleGit = simpleGit();
  const results: Array<{ name: string; from: string; to: string }> = [];

  console.log('\n');

  for (const pkgName of selectedPackages.packages) {
    const pkg = packages.find(p => p.name === pkgName);

    if (!pkg) {
      console.warn(`⚠️ 找不到包: ${pkgName}`);
      continue;
    }

    console.log(`📦 ${pkg.name} (当前版本: ${pkg.version})`);

    const versionTypeResponse = await prompts({
      type: 'select',
      name: 'type',
      message: `  选择版本类型:`,
      choices: versionTypes,
      initial: 0
    });

    const newVersion = bumpVersion(pkg.version, versionTypeResponse.type);
    console.log(`  ➜ 新版本: ${newVersion}`);

    const commits = await getCommitsSinceLastTag(pkg.path, git);
    const changelog = await generateChangelog(pkg.name, newVersion, commits);

    await updatePackageJson(pkg.path, newVersion);
    await updateChangelog(pkg.path, changelog);

    results.push({ name: pkg.name, from: pkg.version, to: newVersion });
    console.log(`  ✅ 文件已更新\n`);
  }

  console.log('📝 Git 操作:\n');

  try {
    execSync('git add -A', { encoding: 'utf-8' });
    console.log('  ✅ git add -A');

    const changes = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
    if (!changes.trim()) {
      console.log('  ⚠️  没有文件变更');
      return;
    }

    const releasePackages = results.map(r => `${r.name}@${r.to}`).join(', ');
    execSync(`git commit -m "chore(release): ${releasePackages}"`, { encoding: 'utf-8' });
    console.log(`  ✅ git commit -m "chore(release): ${releasePackages}"`);

    for (const result of results) {
      const tag = `${result.name}@${result.to}`;
      try {
        execSync(`git tag -a ${tag} -m "${tag}"`, { encoding: 'utf-8' });
        console.log(`  ✅ git tag ${tag}`);
      } catch {
        console.warn(`  ⚠️  Tag 已存在: ${tag}`);
      }
    }

    const autoPush = process.env.AUTO_PUSH === 'true';
    if (autoPush) {
      try {
        execSync('git push --tags', { encoding: 'utf-8' });
        console.log('  ✅ git push --tags');

        execSync('git push', { encoding: 'utf-8' });
        console.log('  ✅ git push');
      } catch {
        console.warn('  ⚠️  Push 失败，请手动 push');
      }
    }
  } catch (error) {
    console.error('  ❌ Git 操作失败:', error);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ 发布完成!\n');
  console.log('发布的包:');
  results.forEach(r => {
    console.log(`  • ${r.name}: ${r.from} → ${r.to}`);
  });

  if (process.env.AUTO_PUSH === 'true') {
    console.log('\n🔄 已自动 push 到远程仓库');
  } else {
    console.log('\n请手动验证后执行:');
    console.log('  git push --tags');
    console.log('  git push');
  }
  console.log('='.repeat(60) + '\n');
}

main().catch(error => {
  console.error('❌ 发生错误:', error);
  process.exit(1);
});
