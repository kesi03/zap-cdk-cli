#!/usr/bin/env ts-node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import ZapCdkManager from '../lib/cdk';
import { createProject } from '../lib/cdk/create';
import { execSync } from 'child_process';
import { createZapTsProject } from '../lib/cdk/templates/typescript';
import { createZapPyProject } from '../lib/cdk/templates/python';
import { createZapJavaProject } from '../lib/cdk/templates/java';
import { createZapGoProject } from '../lib/cdk/templates/golang';

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
    'create <language> [name]',
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
          createZapJavaProject(name); // Implement similarly to TS and Python
          break;
        case 'go':
          createZapGoProject(name); // Implement similarly to TS and Python
          break;
        default:
          console.error(`Unsupported language: ${language}`);
      }

      console.log(`✅ Project ${name} created successfully!`);
    }
  )
  .command('synth', 'Run cdk synth in current project', {}, () => {
    console.log('Running CDK synth...');
    execSync('npx cdk synth', { stdio: 'inherit' });
  })
  .help()
  .argv;
