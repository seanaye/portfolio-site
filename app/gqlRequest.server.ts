import { GraphQLClient } from "graphql-request"
import { getSdk } from "~/generated/sdk"

const client = new GraphQLClient("https://content.seanaye.ca/graphql")
export const sdk = getSdk(client)

export type Loaded<T extends (...args: any) => any> = Awaited<ReturnType<T>>
