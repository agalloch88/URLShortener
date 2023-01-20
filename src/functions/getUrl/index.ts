import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { dynamo } from '@libs/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.urlTable;
    const { code } = event.pathParameters || {};

    if (!code) {
        return formatJSONResponse({
            statusCode: 400,
            data: {
            message: 'Missing code in path',
            },
        });
    }
    
    const record = await dynamo.get(code, tableName);

    const originalUrl = record.originalUrl;

    return formatJSONResponse({ data: { originalUrl }});
  } catch (error) {
    console.log(error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
