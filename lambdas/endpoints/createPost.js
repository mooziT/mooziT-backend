const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const postTableName = process.env.postTableName

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;
    const post = JSON.parse(event.body);
    post.ID = ID;
    
    const newPost = await Dynamo.writePost(post, postTableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    })


    if(!newPost){
        return Responses._400({message: 'failed to write post by ID'})
    } 

    return Responses._200({newPost});
}