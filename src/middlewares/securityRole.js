import { auth } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
    audience: 'https://dev-k7yl83j48fggnlqk.us.auth0.com/api/v2/', // link of Auth0
    issuerBaseURL: 'http://127.0.0.1:3010/'            // TODO: add url of domain
});

export { checkJwt };