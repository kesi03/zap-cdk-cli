import { awscdk } from 'projen';
import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { NodePackageManager } from 'projen/lib/javascript';

export function createZapTsProject(name: string) {
    const outdir = resolve('..', name);
    console.log('Output directory:', outdir);
    mkdirSync(outdir, { recursive: true }); // ensure folder exists
    process.chdir(outdir); // 👈 switch working directory


    const project = new awscdk.AwsCdkTypeScriptApp({
        outdir: resolve(outdir),
        name,
        defaultReleaseBranch: 'main',
        cdkVersion: '2.130.0',
        deps: ['zap-cdk@^0.0.3'],
        devDeps: ['@types/node'],
        packageManager: NodePackageManager.PNPM, 
        pnpmVersion: '8.9.0',

    });

    const srcDir = join(project.outdir, 'src');
    mkdirSync(srcDir, { recursive: true }); // ensure src folder exists

    writeFileSync(join(project.outdir, 'src/zap.ts'), `import { ZapStack } from 'zap-cdk';\n\nconsole.log('Zap initialized');`);
    project.synth();
}
