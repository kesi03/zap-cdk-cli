#!/usr/bin/env ts-node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import ZapCdkManager from '../lib/cdk';
import { execSync } from 'child_process';
import { createZapTsProject } from '../lib/cdk/templates/typescript';
import { createZapPyProject } from '../lib/cdk/templates/python';
import { createZapJavaProject } from '../lib/cdk/templates/java';
import { createZapGoProject } from '../lib/cdk/templates/golang';
import { createZapCsharpProject } from '../lib/cdk/templates/csharp';
import { resolve } from 'path';

const argv = yargs(hideBin(process.argv))
  .command('baseline-scan', 'Export baseline yaml', {}, () => {
    console.log('Exporting baseline scan yaml...');
    ZapCdkManager.exportBaseline();
  })
  .command('fullscan', 'Export fullscan yaml', {}, () => {
    console.log('Exporting full scan yaml...');
    //ZapCdkManager.exportFullScan?.(); // Add logic in ZapCdkManager
  })
  .command('apiscan', 'Export api scan yaml', {}, () => {
    console.log('Exporting API scan yaml...');
    //ZapCdkManager.exportApiScan?.(); // Add logic in ZapCdkManager
  })
  .command(
    'new <language> [name]',
    'Scaffold a new CDK project',
    (yargs) =>
      yargs
        .positional('language', {
          describe: 'Programming language',
          choices: ['typescript', 'python', 'java', 'go', 'csharp'],
        })
        .positional('name', {
          describe: 'Project name',
          type: 'string',
          default: 'my-cdk-app',
        }),
    async (argv) => {
      const { language, name } = argv;

      if (!language) {
        console.error('❌ Language is required.');
        process.exit(1);
      }

      switch (language) {
        case 'typescript':
          createZapTsProject(name);
          break;
        case 'python':
          createZapPyProject(name);
          break;
        case 'java':
          createZapJavaProject(name);
          break;
        case 'go':
          createZapGoProject(name);
          break;
        case 'csharp':
          createZapCsharpProject(name);
          break;
        default:
          console.error(`Unsupported language: ${language}`);
      }

      console.log(`✅ Project ${name} created successfully!`);
    }
  )
  .command(
    'synth [target]',
    'Run cdk synth in a target project folder',
    (yargs) =>
      yargs.positional('target', {
        type: 'string',
        describe: 'Path to the CDK project folder',
        default: '.', // fallback to current directory
      })
     
      ,
    ({ target }) => {
      const resolved = resolve(target);
      console.log(`Running CDK synth in: ${resolved}`);
      execSync('npx cdk synth', {
        stdio: 'inherit',
        cwd: resolved,
      });
    }
  )
  .command(
    'deploy [target]',
    'Run automation based on synthed file',
    (yargs) =>
      yargs.positional('target', {
        type: 'string',
        describe: 'Path to the CDK project folder',
        default: '.', // fallback to current directory
      }) .positional('platform', {
        type: 'string',
        describe: 'The container platform to use',
        choices: ['docker', 'podman'],
        default: 'docker', // fallback to docker
      }),
      
    (args) => {
      const {target,platform} = args;
      const resolved = resolve(target);
      console.log(`Running CDK synth in: ${resolved}`);
      execSync('npx cdk synth', {
        stdio: 'inherit',
        cwd: resolved,
      });
      console.log(`Running CDK deploy in: ${resolved}`);
      execSync(`${platform} run -v $(pwd):/zap/wrk/:rw -t zaproxy/zap-stable zap.sh -cmd -autorun /zap/wrk/zap.yaml`, {
        stdio: 'inherit',
        cwd: resolved,
      });
    }
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv;
