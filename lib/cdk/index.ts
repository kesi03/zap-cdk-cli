import * as cdk from 'aws-cdk-lib';
import { IEnvironment } from 'zap-cdk/lib/models/environment';
import {EnvironmentConfig} from 'zap-cdk/lib/constructs/environment'
import YamlUtils from 'zap-cdk/lib/utils/yaml'

export default class ZapCdkManager{
    public static exportBaseline(){
        const app= new cdk.App();
        const stack = new cdk.Stack(app, 'Baseline');

        const environmentConfig: IEnvironment = {
      contexts: [
        {
          name: 'TestContext',
          urls: ['http://example.com'],
          authentication: {
            method: 'http',
            parameters: {
              hostname: 'example.com',
              port: 80,
              realm: 'exampleRealm',
            },
            verification: {
              method: 'response',
              loggedInRegex: '.*logged in.*',
            },
          },
          sessionManagement: {
            method: 'cookie',
            parameters: {},
          },
          technology: {
            include: ['Node.js', 'Express'],
          },
          structure: {
            structuralParameters: ['param1', 'param2'],
            dataDrivenNodes: [
              {
                name: 'Node1',
                regex: '(.*)',
              },
            ],
          },
          users: [
            {
              name: 'User1',
              credentials: [
                {
                  username: 'user1',
                  password: 'password1',
                },
              ],
            },
          ],
        },
      ],
      vars: {
        key: 'value',
      },
      parameters: {
        failOnError: true,
        continueOnFailure: false,
      },
      proxy: {
        hostname: 'proxy.example.com',
        port: 8080,
      },
    };

    const environmentConstruct = new EnvironmentConfig(stack, 'BaselineEnvironment', {
      environment: environmentConfig,
    });

    const yaml:string = YamlUtils.stringify(environmentConstruct.toYaml());

    console.log(yaml);

    }
}