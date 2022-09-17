import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isNodeProject = (projects = []) => {
  return projects.includes('package.json') && projects.includes('src');
};

const isCargoProject = (projects = []) => {
  return projects.includes('Cargo.toml') && projects.includes('src');
};

const getProjectsByDir = (dir) => {
  const result = {
    node: [],
    rust: [],
  };
  const projects = fs.readdirSync(dir);
  if (isNodeProject(projects)) {
    result.node.push(dir);
  }
  if (isCargoProject(projects)) {
    result.rust.push(dir);
  }
  projects.forEach((project) => {
    if (
      project.startsWith('.') ||
      ['node_modules', 'target', 'dist', 'build', 'npm', 'pkg', 'es', 'cjs', 'lib', 'cache'].includes(project)
    ) {
      return;
    }
    const nextDir = path.resolve(dir, project);
    if (fs.statSync(nextDir).isDirectory()) {
      const nextResult = getProjectsByDir(nextDir);
      result.node = result.node.concat(nextResult.node);
      result.rust = result.rust.concat(nextResult.rust);
    }
  });
  return result;
};

function getAllProjects() {
  const result = {
    node: [],
    rust: [],
  };
  const projectRoot = path.resolve(__dirname, '..');
  const projects = fs.readdirSync(projectRoot);
  if (isNodeProject(projects)) {
    result.node.push(projectRoot);
  }
  if (isCargoProject(projects)) {
    result.rust.push(projectRoot);
  }

  ['apps', 'crates', 'packages'].forEach((project) => {
    const nextResult = getProjectsByDir(path.resolve(projectRoot, project));
    result.node = result.node.concat(nextResult.node);
    result.rust = result.rust.concat(nextResult.rust);
  });
  return result;
}

function updateNodeProject(projects) {
  for (const project of projects) {
    console.log(`Updating ${project}`);
    exec('pnpm update', { cwd: project });
  }
}

async function updateCargoProject(projects) {
  for (const project of projects) {
    console.log(`Updating ${project}`);
    exec('cargo update', { cwd: project });
  }
}

// async main function
(async () => {
  const projects = getAllProjects();
  updateNodeProject(projects.node);
  updateCargoProject(projects.node);
})();
