import Dynamo from '../common/Dynamo'
const tokenTableName = process.env.tokenTableName

exports.handler = async event => {
    console.log('event', event);

    const tokenID = (event.headers && (event.headers['X-Amz-Security-Token'] || event.headers['x-amz-security-token'])) || event.authorizationToken;

    if(!tokenID){
        console.log('could not find a token on the event');
        return generatePolicy({ allow: false });
    }
    //salkfasjdlkf

    try{
        const token = await Dynamo.get(tokenID, tokenTableName);

        if (!token){
            console.log(`no token for ID of ${tokenID}`);
            return generatePolicy({ allow: false });
        }

        //check expiries for limited time access Maybe not needed?
        if(token.expiryDate && token.expiryDate < Date.now()) {
            console.log('after expiry date');
            return generatePolicy({ allow: false });
        }

        return generatePolicy({ allow: true });
    } catch(error) {
        console.log('error ', error);
        return generatePolicy({ allow: false });
    }
};

const generatePolicy = ({allow}) => {
    return {
        principalId: 'token',
        policyDocument: {
            Version: '2012-10-17',
            Statement: {
                Action: 'execute-api:Invoke',
                Effect: allow ? 'Allow' : 'Deny', //if allow is true return 'Allow', else 'Deny'
                Resource: '*',

            }
        }
    }
}