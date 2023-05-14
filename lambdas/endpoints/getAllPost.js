const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const postTableName = process.env.postTableName

exports.handler = async event => {
    console.log('event', event)

    const posts = await Dynamo.scan(postTableName).catch(err => {
        console.log("error in dynamo scan", err)
        return null;
    })
    
    if(!posts){
        return Responses._400({message: 'failed to get any posts'})
    }

    if(!posts.length){
        return Responses._400({message: 'posts.length issue'})
    }

    return Responses._200({posts});
}