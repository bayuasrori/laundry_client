import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(tokenObject: any) {
    
    try {
        // Get a new set of tokens with a refreshToken
        const tokenResponse = await axios.post(process.env.API_URL + 'auth/dj-rest-auth/token/refresh/', {
            refresh: tokenObject.refreshToken
        });

        

        return {
            ...tokenObject,
            accessToken: tokenResponse.data.accessToken,
            accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
            refreshToken: tokenResponse.data.refreshToken
        }
    } catch (error) {
        console.log(tokenObject);
        
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }
}

const providers = [
    CredentialsProvider({
    name: 'Credentials',
    authorize: async (credentials: any) => {
        try {
            // Authenticate user with credentials
            const user = await axios.post(process.env.API_URL + 'auth/dj-rest-auth/login/', {
                password: credentials.password,
                username: credentials.username
            });


            if (user.data.access_token) {
                return user.data;
            }

            return null;
        } catch (e: any) {
            throw new Error(e);
        }
    },
    credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
})
]

const callbacks = {
    jwt: async ({ token, user } : any) => {
        if (user) {
            
            // This will only be executed at login. Each next invocation will skip this part.
            token.accessToken = user.access_token;
            token.accessTokenExpiry = Number(new Date( user.access_token_expiration));
            token.refreshToken = user.refresh_token;
        }


        // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
        const shouldRefreshTime = Math.round((token.accessTokenExpiry) - Date.now());

        // If the token is still valid, just return it.
        if (shouldRefreshTime > 0) {
            return Promise.resolve(token);
        }

        // If the call arrives after 23 hours have passed, we allow to refresh the token.
        token = refreshAccessToken(token);
        return Promise.resolve(token);
    },
    async redirect() {
        return "/dashboard"
      },

    session: async ({ session, token }: any) => {
        // Here we pass accessToken to the client to be used in authentication with your API
        session.accessToken = token.accessToken;
        session.accessTokenExpiry = token.accessTokenExpiry;
        session.error = token.error;

        return Promise.resolve(session);
    },
}

export const options = {
    providers,
    callbacks,
    pages: {},
    secret: 'your_secret'
}

const Auth = (req: any, res: any) => NextAuth(req, res, options)
export default Auth;