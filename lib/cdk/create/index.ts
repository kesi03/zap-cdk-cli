import { execSync } from 'child_process';

export async function createProject(language: string, name: string) {
  switch (language) {
    case 'typescript':
      execSync(`npx projen new awscdk-app-ts --name ${name}`, { stdio: 'inherit' });
      break;
    case 'python':
      execSync(`npx projen new awscdk-app-py --name ${name}`, { stdio: 'inherit' });
      break;
    case 'java':
      execSync(`npx projen new awscdk-app-java --name ${name}`, { stdio: 'inherit' });
      break;
    case 'go':
      execSync(`npx projen new awscdk-app-go --name ${name}`, { stdio: 'inherit' });
      break;
    case 'csharp':
      console.log('C# scaffolding is not yet supported. Coming soon!');
      break;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}