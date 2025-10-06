import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { YamlFile } from 'projen';
import { TypeScriptProject } from 'projen/lib/typescript';

export interface IDaemonConfig {
    host?: string;
    image?: string;
    containerName?: string;
    ports?: string[];
    environment?: { [key: string]: string };
    volumes?: string[];
    command?: string;
    dependsOn?: string[];
}

export function createZapDaemonProject(name: string,{
    host= '0.0.0.0',
    image='ghcr.io/zaproxy/zaproxy:stable',
    containerName='zap-daemon',
    ports=['8090:8090'],
}:IDaemonConfig) {
    const [externalPort, internalPort] = ports ? ports[0].split(':') : ['8090', '8090'];

    const project = new TypeScriptProject({
        name: 'zap-docker',
        defaultReleaseBranch: 'main',
        // other config...
    });

    new YamlFile(project, 'docker-compose.yml', {
        obj: {
            version: '3.8',
            services: {
                [containerName]: {
                    image: image,
                    command: `zap.sh -daemon -port ${internalPort} -host ${host}`,
                    ports: [`${externalPort}:${internalPort}`],
                },
            },
        },
    });

    project.synth();
}