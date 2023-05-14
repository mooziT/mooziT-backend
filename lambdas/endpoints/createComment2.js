const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const commentTableName = process.env.commentTableName

exports.handler = async event => {
    console.log('event', event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;
    const comment = JSON.parse(event.body);
    comment.ID = ID;
    
    const newComment = await Dynamo.writeComment(comment, commentTableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    })


    if(!newComment){
        return Responses._400({message: 'failed to write comment by ID'})
    } 

    return Responses._200({newComment});
}