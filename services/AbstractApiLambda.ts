import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from 'aws-sdk';



export abstract class AbstractApiLambda {

    protected dbClient = new DynamoDB.DocumentClient();
    TABLE_NAME = process.env.TABLE_NAME;  

    abstract handleRequest(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>

}