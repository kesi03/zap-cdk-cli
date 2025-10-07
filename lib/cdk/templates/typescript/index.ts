import { awscdk, TextFile } from 'projen';
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
        deps: ['zap-cdk@^0.0.4'],
        devDeps: ['@types/node'],
        packageManager: NodePackageManager.PNPM, 
        pnpmVersion: '8.9.0',

    });

    const srcDir = join(project.outdir, 'bin');
    mkdirSync(srcDir, { recursive: true }); // ensure src folder exists

    new TextFile(project, 'bin/index.ts', {
  lines: [
    "import * as cdk from 'aws-cdk-lib';",
    "import { IEnvironment } from 'zap-cdk/lib/models/environment';",
    "import {EnvironmentConfig} from 'zap-cdk/lib/constructs/environment';",
    "console.log('Zap initialized');",
    "const app= new cdk.App();",
    "const stack = new cdk.Stack(app, 'Baseline');",
    "const environmentConfig: IEnvironment = {",
    "  contexts: [",
    "    {",
    "      name: 'TestContext',",
    "      urls: ['http://example.com'],",
    "      authentication: {",
    "        method: 'http',",
    "        parameters: {",
    "          hostname: 'example.com',",
    "          port: 80,",
    "          realm: 'exampleRealm',",
    "        },",
    "        verification: {",
    "          method: 'response',",
    "          loggedInRegex: '.*logged in.*',",
    "        },",
    "      },",
    "      sessionManagement: {",
    "        method: 'cookie',",
    "        parameters: {},",
    "      },",
    "      technology: {",
    "        include: ['Node.js', 'Express'],",
    "      },",
    "      structure: {",
    "        structuralParameters: ['param1', 'param2'],",
    "        dataDrivenNodes: [",
    "          {",
    "            name: 'Node1',",
    "            regex: '(.*)',",
    "          },",
    "        ],",
    "      },",
    "      users: [",
    "        {",
    "          name: 'User1',",
    "          credentials: [",
    "            {",
    "              username: 'user1',",
    "              password: 'password1',",
    "            },",
    "          ],",
    "        },",
    "      ],",
    "    },",
    "  ],",
    "  vars: {",
    "    key: 'value',",
    "  },",
    "  parameters: {",
    "    failOnError: true,",
    "    continueOnFailure: false,",
    "  },",
    "  proxy: {",
    "    hostname: 'proxy.example.com',",
    "    port: 8080,",
    "  },",
    "};",
    "const environmentConstruct = new EnvironmentConfig(stack, 'BaselineEnvironment', {",
    "  environment: environmentConfig,",
    "});"
  ],
});

    project.synth();
}
