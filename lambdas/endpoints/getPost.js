const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const postTableName = process.env.postTableName

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;

    const post = await Dynamo.getPost(ID, postTableName).catch(err => {
        console.log("error in dynamo get", err)
        return null;
    })

    if(!post){
        return Responses._400({message: 'failed to get post by ID'})
    }

    return Responses._200({post});
}