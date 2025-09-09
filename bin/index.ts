#!/usr/bin/env ts-node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import ZapCdkManager from '../lib/cdk';

const argv = yargs(hideBin(process.argv))
  .command('baseline-scan', 'Export baseline yaml', {}, (argv) => {
    console.log('Exporting baseline scan yaml...');
    // Add your baseline scan logic here
    ZapCdkManager.exportBaseline();
  })
  .command('fullscan', 'Export fullscan yaml', {}, (argv) => {
    console.log('Exporting full scan yaml...');
    // Add your full scan logic here
    
  })
  .command('apiscan', 'Export api scan yaml', {}, (argv) => {
    console.log('Exporting API scan yaml...');
    // Add your API scan logic here
    
  })
  .help()
  .argv;


