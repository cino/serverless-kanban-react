#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ServerlessKanbanReactStack } from '../lib/serverless-kanban-react-stack';

const app = new cdk.App();

new ServerlessKanbanReactStack(app, 'ServerlessKanbanReactStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },

  domainName: 'cino.io',
  subdomainName: 'kanban',
});
