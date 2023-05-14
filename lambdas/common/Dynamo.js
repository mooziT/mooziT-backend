const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName){
        const params = {
            TableName, 
            Key: {
                ID
            }
        };

        const data = await documentClient.get(params).promise()

        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }

        console.log(data);

        return data.Item;
    },
    
    async getPost(ID, TableName){
        const params = {
            TableName, 
            Key: {
                ID
            }
        };

        const data = await documentClient.get(params).promise()

        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }

        console.log(data);

        return data.Item;
    },

    async getToken(ID, TableName){
        const params = {
            TableName, 
            Key: {
                ID
            }
        };

        const token = await documentClient.get(params).promise()

        if(!token || !token.Item){
            throw Error(`There was an error fetching the token for ID of ${ID} from ${TableName}`)
        }

        console.log(token);

        return token.Item;
    },

    async writePost(post, TableName) {
        if(!post.ID){
            throw Error('no ID on post')
        }

        const params = {
            TableName,
            Item: post
        };

        const res = await documentClient.put(params).promise();

        if(!res) {
            throw Error(`There was an error inserting ID of  ${post.ID} in table ${TableName}`);
        }

        return post;
    },

    async writeComment(comment, TableName) {
        if(!comment.ID){
            throw Error('no ID on comment')
        }

        const params = {
            TableName,
            Item: comment
        };

        const res = await documentClient.put(params).promise();

        if(!res) {
            throw Error(`There was an error inserting ID of  ${comment.ID} in table ${TableName}`);
        }

        return comment;
    },

    async writeToken(token, TableName) {
        if(!token.ID){
            throw Error('no ID on post')
        }

        const params = {
            TableName,
            Item: token
        };

        const res = await documentClient.put(params).promise();

        if(!res) {
            throw Error(`There was an error inserting ID of  ${token.ID} in table ${TableName}`);
        }

        return token;
    },

    async scan(tableName){
        const params = {
            TableName: tableName 
        };

        try {
            const data = await documentClient.scan(params).promise();
            return data.Items;
          } catch (err) {
            console.log('DynamoDB Scan Error:', err);
            return null;
          }
    },

    query: async ({tableName, index, queryKey, queryValue}) => {
        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue
            }
        }

        const res = await documentClient.query(params).promise();

       return res.Items || [];
    }, 
}

module.exports = Dynamo;