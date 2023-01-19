import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

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
};