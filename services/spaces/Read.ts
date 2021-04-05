import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { AbstractApiLambda } from "../AbstractApiLambda";



class Read extends AbstractApiLambda {

    public async handleRequest(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
        return {
            body: 'Hello from read lambda!',
            statusCode: 200
        }
    }
}
const instance = new Read();
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    return instance.handleRequest(event, context);
}

export { handler }