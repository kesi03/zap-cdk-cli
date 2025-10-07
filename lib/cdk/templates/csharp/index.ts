import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

export function createZapCsharpProject(name: string) {
  const outdir = resolve('..', name);
  mkdirSync(outdir, { recursive: true });
  const srcDir = join(outdir, 'src');
  mkdirSync(srcDir, { recursive: true }); // ensure src folder exists

  // Create .csproj
  writeFileSync(
    join(outdir, 'ZapApp.csproj'),
    `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Amazon.CDK" Version="2.130.0" />
    <PackageReference Include="com.mockholm.zap.cdk" Version="0.0.4" />
  </ItemGroup>
</Project>`
  );

 

  // Create Program.cs
  writeFileSync(
    join(outdir, 'src', 'Program.cs'),
    `using Amazon.CDK;
using Com.Mockholm.Zap.Cdk;

namespace ZapApp {
  sealed class Program {
    public static void Main(string[] args) {
      var app = new App();
      new ZapStack(app, "ZapStack");
      app.Synth();
    }
  }
}`
  );
}
