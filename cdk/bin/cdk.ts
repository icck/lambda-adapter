#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

import { config as devConfig } from "../environment/dev/config";
import { config as prdConfig } from "../environment/prd/config";
import { MyStackProps } from "../types";

import { AdapterStack } from "../lib/adapter-stack";

const app = new cdk.App();

const appEnv = app.node.tryGetContext("appEnv") as string; // dev or prd
if (!["dev", "prd"].includes(appEnv)) {
  throw new Error(
    `The value of "stage" must be one of "dev" or "prd" but got "${appEnv}". Try like "cdk --context appEnv=dev ..."`
  );
}

const config = getConfig(appEnv);

function getConfig(envKey: String) {
  if (envKey === "dev") {
    return devConfig;
  } else if (envKey === "prd") {
    return prdConfig;
  } else {
    throw new Error("No Support environment");
  }
}

const props: MyStackProps = {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
  appEnv,
  config,
};

new AdapterStack(app, "adapter-stack", props);
