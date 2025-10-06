import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { TextFile } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';
import { NodePackageManager } from 'projen/lib/javascript';

export function createZapGoProject(name: string) {
  const outdir = resolve('..', name);
  mkdirSync(outdir, { recursive: true });

  const goDir = join(outdir, 'go');
  mkdirSync(goDir, { recursive: true });

  const project = new TypeScriptProject({
    name,
    outdir,
    defaultReleaseBranch: 'main',
    gitignore: ['.env', 'bin/', 'node_modules/', '*.log', '*.tmp', 'dist/', 'go/bin/', 'go/pkg/', 'go/src/'],
    deps: ['zap-cdk@^0.0.3'],
    devDeps: ['@types/node','typescript', 'tsx@^3.12.7', 'aws-cdk@^2.130.0', 'projen@^0.70.0','zap-cdk-client'],
    packageManager: NodePackageManager.PNPM,
    pnpmVersion: '8.9.0',
    scripts: {
      'bygg:mac': `GOOS=darwin GOARCH=amd64 go build -o -${name}-macos`,
      'bygg:linux': `GOOS=linux GOARCH=amd64 go build -o ${name}-linux`,
      'bygg:windows': `GOOS=windows GOARCH=amd64 go build -o ${name}-windows.exe`,
      'bygg': 'pnpm run bygg:mac && pnpm run bygg:linux && pnpm run bygg:windows',
      'zynth':'zap-cdk-client synth'
    }
  });

  new TextFile(project, 'go/go.mod', {
    marker: false,
    lines: [
      `module github.com/kesi03/${name}`,
      '',
      'go 1.21',
      '',
      'require (',
      '  github.com/aws/aws-cdk-go/awscdk/v2 v2.130.0',
      '  github.com/kesi03/zap-cdk-go v0.0.3',
      ')',
    ],
  });

  new TextFile(project, 'go/main.go', {
    marker: false,
    lines: [
      'package main',
      '',
      'import (',
      '  "github.com/aws/aws-cdk-go/awscdk/v2"',
      '  "github.com/kesi03/zap-cdk-go"',
      ')',
      '',
      'func main() {',
      '  app := awscdk.NewApp(nil)',
      '  zap.NewZapStack(app, "ZapStack", &zap.ZapStackProps{})',
      '  app.Synth()',
      '}',
    ],
  });

  project.synth();

}
