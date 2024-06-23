import { StackProps } from "aws-cdk-lib";

export interface MyStackProps extends StackProps {
  readonly appEnv: string;
  readonly config: Record<string, string | string[]>;
}
