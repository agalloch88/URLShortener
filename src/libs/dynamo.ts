import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput, GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";

const dyanmoClient = new DynamoDBClient({});
export const dynamo = {
    write: async (data: Record<string, any>, tableName: string) => {
        const params: PutCommandInput = {
            TableName: tableName,
            Item: data,
        };
        const command = new PutCommand(params);

        await dyanmoClient.send(command);

        return data;
    },
    get: async (id: string, tableName: string) => {
        const params: GetCommandInput = {
            TableName: tableName,
            Key: {
                id,
            },
        };
        const command = new GetCommand(params);
        const response = await dyanmoClient.send(command);

        return response.Item;
    },
};