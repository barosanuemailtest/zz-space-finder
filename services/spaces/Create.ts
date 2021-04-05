import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { AbstractApiLambda } from "../AbstractApiLambda";



class Create extends AbstractApiLambda {

    public async handleRequest(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
        return {
            body: 'Hello from create lambda!',
            statusCode: 200
        }
    }
}
const instance = new Create();
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    return instance.handleRequest(event, context);
}

export { handler }