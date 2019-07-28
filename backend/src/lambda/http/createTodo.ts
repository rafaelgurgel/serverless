import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const docClient = new APIGatewayProxyResult.DynamoDB.DocumentClient()
const todo_table = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  const itemId = uuid.v4()

  const newTodoItem = {
    id: itemId,
    ...newTodo
  }

  await docClient.put({ TableName: todo_table, Item: newTodoItem }).promise()
  // TODO: Implement creating a new TODO item
  return { statusCode: 201, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({newTodoItem}) }
}
