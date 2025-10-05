import { awscdk } from 'projen';
import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

export function createZapPyProject(name: string) {
  const outdir = resolve('..', name);
  console.log('Output directory:', outdir);
  mkdirSync(outdir, { recursive: true }); // ensure folder exists
  process.chdir(outdir); // 👈 switch working directory

  const project = new awscdk.AwsCdkPythonApp({
    name,
    moduleName: name.replace(/-/g, '_'),
    authorName: 'Kester',
    authorEmail: 'kester@example.com',
    version: '0.1.0',
    cdkVersion: '2.130.0',
    deps: ['zap-cdk==0.0.3'],
  });


  const srcDir = join(project.outdir, name.replace(/-/g, '_'));
  mkdirSync(srcDir, { recursive: true }); // ensure src folder exists

  writeFileSync(join(project.outdir, `${name.replace(/-/g, '_')}/zap.py`), `from zap_cdk import ZapStack\n\nprint("Zap initialized")`);
  project.synth();
}
