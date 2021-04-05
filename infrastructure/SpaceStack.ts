import { CfnOutput, Construct, Stack, StackProps, App, CfnParameter } from '@aws-cdk/core';
import { LambdaTable } from './Tables/LambdaTable';
import { AuthorizationType, LambdaIntegration, MethodOptions, RestApi } from '@aws-cdk/aws-apigateway'
import { LambdasNames } from '../services/LambdasNames';

class SpaceStack extends Stack {

    private spacesTable: LambdaTable;
    private spaceApi = new RestApi(this, 'SpaceApi');

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)
        this.initialize();
    }

    private initialize(){
        this.initializeStackParamsAndOutput();
        this.createSpacesTable();
        this.addSpacesApiLambdasIntegrations();
    }
    private initializeStackParamsAndOutput(){
        const zzz = new CfnParameter(this, 'param1', {
            type: "String"
        })
        new CfnOutput(this, 'someId', {
            value: zzz.valueAsString
        })
    }
    private createSpacesTable(){
        this.spacesTable = new LambdaTable(this,
            {
                tableName: 'SpacesTable',
                partitionKeyName: 'spaceId',
                createLambdaPath: LambdasNames.CREATE_SPACE,
                readLambdaPath: LambdasNames.READ_SPACE
            }
        )
    }
    private addSpacesApiLambdasIntegrations(){
        const spaceResource = this.spaceApi.root.addResource('spaces');
        spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
        spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration)
    }
}

new SpaceStack(new App(), 'Space-finder', {
    stackName: 'SpaceStack'
})

