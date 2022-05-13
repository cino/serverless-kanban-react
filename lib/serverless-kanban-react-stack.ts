import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { CloudFrontWebDistribution, CloudFrontAllowedMethods, OriginAccessIdentity, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';
import { HostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { Bucket, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

interface ReactStackProps extends StackProps {
  readonly domainName: string;
  readonly subdomainName: string;
}

export class ServerlessKanbanReactStack extends Stack {
  constructor(scope: Construct, id: string, props: ReactStackProps) {
    super(scope, id, props);

    const zone = HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domainName,
    });

    const bucket = new Bucket(this, 'KanbanAppBucket', {
      bucketName: `${props.subdomainName}.${props.domainName}`,
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    const cloudFrontOAI = new OriginAccessIdentity(this, 'KanbanAppOAI', {
      comment: 'Kanban App Origin Access Identity',
    });
    bucket.grantRead(cloudFrontOAI);

    const certificate = new DnsValidatedCertificate(this, 'KanbanAppCertificate', {
      domainName: `${props.subdomainName}.${props.domainName}`,
      hostedZone: zone,
      region: 'us-east-1', // Needs to be in use-east-1 to use CloudFront
    });
    const viewerCertificate = ViewerCertificate.fromAcmCertificate(certificate, {
      aliases: [`${props.subdomainName}.${props.domainName}`],
    });

    const distribution = new CloudFrontWebDistribution(this, 'KanbanAppDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: cloudFrontOAI,
          },
          behaviors: [{
            isDefaultBehavior: true,
            compress: true,
            allowedMethods: CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
          }],
        },
      ],
      errorConfigurations: [{
        errorCode: 404,
        responseCode: 200,
        responsePagePath: '/index.html',
      }],
      defaultRootObject: 'index.html',
      viewerCertificate: viewerCertificate,
    });

    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset('./app/build')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });

    new ARecord(this, 'AliasRecord', {
      zone,
      recordName: `${props.subdomainName}.${props.domainName}`,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    // We are using CfnOutput to output the CloudFront URL to the console and the CloudFormation interface
    new CfnOutput(this, 'WebsiteURL', { value: distribution.distributionDomainName });
    new CfnOutput(this, 'BucketName', { value: bucket.bucketName });
  }
}
