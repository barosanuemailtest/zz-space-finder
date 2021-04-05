import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import * as Utils from '../shared/Utils';

const TABLE_NAME = process.env.TABLE_NAME!;  
class Create {

    private dbClient = new DynamoDB.DocumentClient();


    public async handleRequest(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
        const response =  {
            body: 'Hello from create lambda!',
            statusCode: 200
        }

        return response;
    }
}
const instance = new Create();
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    return instance.handleRequest(event, context);
}

export { handler }