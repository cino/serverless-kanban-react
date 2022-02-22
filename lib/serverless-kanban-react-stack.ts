import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

interface ReactStackProps extends StackProps {
  readonly domainName: string;
  readonly subdomainName: string;
}

export class ServerlessKanbanReactStack extends Stack {
  constructor(scope: Construct, id: string, props: ReactStackProps) {
    super(scope, id, props);

    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: props.domainName,
    });

    const bucket = new s3.Bucket(this, "KanbanAppBucket", {
      bucketName: `${props.subdomainName}.${props.domainName}`,
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'KanbanAppOAI', {
      comment: 'Kanban App Origin Access Identity',
    });
    bucket.grantRead(cloudFrontOAI);

    const certificate = new acm.DnsValidatedCertificate(this, 'KanbanAppCertificate', {
      domainName: `${props.subdomainName}.${props.domainName}`,
      hostedZone: zone,
      region: 'us-east-1',
    });
    const viewerCertificate = cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
      aliases: [`${props.subdomainName}.${props.domainName}`],
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'KanbanAppDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: cloudFrontOAI,
          },
          behaviors: [{
            isDefaultBehavior: true,
            compress: true,
            allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
          }],
        },
      ],
      viewerCertificate: viewerCertificate,
    });

    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('./app/build')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });

    new route53.ARecord(this, 'AliasRecord', {
      zone,
      recordName: `${props.subdomainName}.${props.domainName}`,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });

    // We are using CfnOutput to output the CloudFront URL to the console and the CloudFormation interface
    new CfnOutput(this, 'WebsiteURL', { value: distribution.distributionDomainName });
    new CfnOutput(this, 'BucketName', { value: bucket.bucketName });
  }
}
