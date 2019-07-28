import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
const AWS = require('aws-sdk')
const table_name = process.env.table_name

const doClient = new 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const result = await doClient.scan({ TableName: table_name }).promise()

  const items = result.items

  return{ statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ items }) }

  // TODO: Get all TODO items for a current user
}
