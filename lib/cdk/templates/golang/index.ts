import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

export function createZapGoProject(name: string) {
  const outdir = resolve('..', name);
  mkdirSync(outdir, { recursive: true });

  // Create go.mod
  writeFileSync(
    join(outdir, 'go.mod'),
    `module github.com/kesi03/${name}

go 1.21

require (
  github.com/aws/aws-cdk-go/awscdk v2.130.0
  github.com/kesi03/zap.cdk v0.0.3
)`
  );

  // Create main.go
  writeFileSync(
    join(outdir, 'main.go'),
    `package main

import (
  "github.com/aws/aws-cdk-go/awscdk/v2"
  "github.com/kesi03/zap.cdk/zap"
)

func main() {
  app := awscdk.NewApp(nil)
  zap.NewZapStack(app, "ZapStack", &zap.ZapStackProps{})
  app.Synth()
}`
  );
}
