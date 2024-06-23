import * as path from "path";

import * as cdk from "aws-cdk-lib";
import { aws_iam as iam, Duration, CfnOutput } from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { Construct } from "constructs";

import { MyStackProps } from "../types";

export class AdapterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MyStackProps) {
    super(scope, id, props);

    const handlerRole = new iam.Role(this, "HandlerRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    // Handler for FastAPI
    const apiHandler = new DockerImageFunction(this, "ApiHandler", {
      code: DockerImageCode.fromImageAsset(
        path.join(__dirname, "../../backend"),
        {
          platform: Platform.LINUX_AMD64,
          file: "Dockerfile",
        }
      ),
      role: handlerRole,
      memorySize: 1024,
      timeout: Duration.seconds(15),
    });

    const api = new apigateway.LambdaRestApi(this, "Api", {
      restApiName: id,
      handler: apiHandler,
      proxy: true,
      deployOptions: {
        stageName: "dev",
      },
    });

    new CfnOutput(this, "ApiId", {
      value: api.restApiId,
    });
    new CfnOutput(this, "ApiName", {
      value: api.restApiName,
    });
  }
}
