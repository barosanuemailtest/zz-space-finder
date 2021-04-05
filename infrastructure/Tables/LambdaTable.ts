import { Stack } from "@aws-cdk/core";
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb'
import { Code, Function as LambdaFunction, Runtime } from '@aws-cdk/aws-lambda'
import { LambdaIntegration } from '@aws-cdk/aws-apigateway'
import { join } from "path";


export interface TableProps {
    createLambdaPath?: string,
    readLambdaPath?: string,
    updateLambdaPath?: string,
    deleteLambdaPath?: string
    tableName: string,
    partitionKeyName: string
}

export class LambdaTable {

    private props: TableProps;
    private stack: Stack;
    private table: Table;
    private createLambda: LambdaFunction | undefined;
    private readLambda: LambdaFunction | undefined;
    private updateLambda: LambdaFunction | undefined;
    private deleteLambda: LambdaFunction | undefined;

    public createLambdaIntegration: LambdaIntegration;
    public readLambdaIntegration: LambdaIntegration;
    public updateLambdaIntegration: LambdaIntegration;
    public deleteLambdaIntegration: LambdaIntegration;

    constructor(stack: Stack, props: TableProps) {
        this.stack = stack;
        this.props = props;
        this.initialize()
    }

    private initialize() {
        this.createTable();
        this.createLambdas();
        this.grantTableRights();
    }

    private createTable() {
        this.table = new Table(this.stack, this.props.tableName, {
            partitionKey: {
                name: this.props.partitionKeyName,
                type: AttributeType.STRING
            },
            tableName: this.props.tableName
        })
    }

    private createLambdas() {
        if (this.props.createLambdaPath) {
            this.createLambda = this.createSingleLambda(this.props.createLambdaPath);
            this.createLambdaIntegration = new LambdaIntegration(this.createLambda);
        }
        if (this.props.readLambdaPath) {
            this.readLambda = this.createSingleLambda(this.props.readLambdaPath);
            this.readLambdaIntegration = new LambdaIntegration(this.readLambda);
        }
        if (this.props.updateLambdaPath) {
            this.updateLambda = this.createSingleLambda(this.props.updateLambdaPath);
            this.updateLambdaIntegration = new LambdaIntegration(this.updateLambda);
        }
        if (this.props.deleteLambdaPath) {
            this.deleteLambda = this.createSingleLambda(this.props.deleteLambdaPath);
            this.deleteLambdaIntegration = new LambdaIntegration(this.deleteLambda);
        }
    }

    private createSingleLambda(lambdaPath: string): LambdaFunction {
        return new LambdaFunction(this.stack, lambdaPath, {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', '..', 'build', lambdaPath)),
            handler: `${lambdaPath}.handler`,
            environment: {
                TABLE_NAME: this.props.tableName,
                PRIMARY_key: this.props.partitionKeyName
            }
        });
    };

    private grantTableRights(){
        if (this.createLambda) {
            this.table.grantWriteData(this.createLambda);
        }
        if (this.readLambda) {
            this.table.grantReadData(this.readLambda);
        }
        if (this.updateLambda) {
            this.table.grantWriteData(this.updateLambda)
        }
        if (this.deleteLambda) {
            this.table.grantWriteData(this.deleteLambda)
        }
    }

}