const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tokenTableName = process.env.tokenTableName

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;

    const token = await Dynamo.getToken(ID, tokenTableName).catch(err => {
        console.log("error in dynamo get", err)
        return null;
    })

    if(!token){
        return Responses._400({message: 'failed to get token by ID'})
    }

    return Responses._200({token});
}