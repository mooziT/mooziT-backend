const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const commentTableName = process.env.commentTableName;

exports.handler = async event => {
    if(!event.pathParameters.ID){
        //failed without post_id
        return Responses._400({message: 'missing the game from the path'});
    }

    const post_id = event.pathParameters.ID;

    const comments = await Dynamo.query({
        tableName: commentTableName,
        index: 'post-id',
        queryKey: 'post_id',
        queryValue: post_id,
    });

    return Responses._200({comments});
}