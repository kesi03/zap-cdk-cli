import { awscdk } from 'projen';
import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

export function createZapJavaProject(name: string) {
  const outdir = resolve('..', name); // one level above CLI folder
  mkdirSync(outdir, { recursive: true });

  const project = new awscdk.AwsCdkJavaApp({
    outdir,
    name,
    artifactId: name,
    groupId: 'io.github.kesi03',
    version: '0.0.1',
    cdkVersion: '2.130.0',
    deps: ['io.github.kesi03/zap.cdk:0.0.4'], // ✅ your custom dependency
    mainClass: 'io.github.kesi03.zap.Main',
  });

  const srcDir = join(outdir, 'src/main/java/io/github/kesi03/zap');
  mkdirSync(srcDir, { recursive: true }); // ensure src folder exists

  writeFileSync(
    join(outdir, 'src/main/java/io/github/kesi03/zap/Main.java'),
    `package io.github.kesi03.zap;

import software.amazon.awscdk.App;
import zap.cdk.ZapStack;

public class Main {
    public static void main(String[] args) {
        App app = new App();
        new ZapStack(app, "ZapStack");
        app.synth();
    }
}`
  );

  project.synth();
}
