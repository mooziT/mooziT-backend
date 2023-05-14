const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tokenTableName = process.env.tokenTableName

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;
    const token = JSON.parse(event.body);
    token.ID = ID;
    
    const newToken = await Dynamo.writeToken(token, tokenTableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    })


    if(!newToken){
        return Responses._400({message: 'failed to write post by ID'})
    } 

    return Responses._200({newToken});
}