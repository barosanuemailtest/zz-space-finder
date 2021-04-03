import { CfnOutput, Construct, Stack, StackProps, App, CfnParameter } from '@aws-cdk/core';

class SpaceStack extends Stack {

    private zzz = new CfnParameter(this, 'param1', {
        type: "String"
    })

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)
        console.log('given param:');
        console.log(this.zzz.valueAsString)
        new CfnOutput(this, 'someId', {
            value: this.zzz.valueAsString            
        })
    }
}

new SpaceStack(new App(), 'Space-finder', {
    stackName: 'SpaceStack'
})

