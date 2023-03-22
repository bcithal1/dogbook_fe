import axios from "axios";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import jwt from "jsonwebtoken";
import { Router, useRouter } from "next/router";

const SECRET = "Slhj+BwXY7qiUMEnHm1O1zB8j2kWDspTqhtBJ/9i48M=";
const token = jwt.sign({ role: 'next-server' }, SECRET);

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: { Authorization: `Bearer ${token}` }
});

export default NextAuth({
    secret: SECRET,
    providers: [
        GithubProvider({
            clientId: "24e93df90f0bfa4f5516",
            clientSecret: "c564e1f260e6d8aed553c2c91f8e3fb4f6bb86df"
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // 1 month
        updateAge: 60 * 15 // refresh every 15 minutes
    },
    callbacks: {
        jwt: ({ token, user, account, isNewUser }) => {
            if(isNewUser){
                // TODO(Trystan): Do the thing that implements the new user flow.
                
            }

            if(user){
                token.userId = Number.parseInt(user.id);
            }

            return token;
        },
        session: ({ session, token }) => {
            session.accessToken = jwt.sign({
                    userId: token.userId,
                    role: "user"
                },
                SECRET,
                { expiresIn: '15m' }
            );

            session.user.id = token.userId;

            return session;
        }
    },
    adapter: {
        createUser: async ({ name, email, image }) => {
            const createUserRequest = { name, email, image };
            const createUserResponse = await api.post("/users", createUserRequest);
            const user = createUserResponse.data;
            return { ...user, emailVerified: null };
        },
        getUser: async (id) => {
            let user;
            try{
                const searchResponse = await api.get(`/users/${id}`);
                user = searchResponse.data;
            } catch(e) {
                if(e.response.status === 404){
                    return null;
                } else {
                    throw e;
                }
            }

            return { ...user, emailVerified: null };
        },
        getUserByEmail: async (email) => {
            let user;
            try{
                const searchResponse = await api.get(`/users?email=${email}`);
                user = searchResponse.data;
            } catch(e) {
                if(e.response.status === 404){
                    return null;
                } else {
                    throw e;
                }
            }

            return { ...user, emailVerified: null };
        },
        getUserByAccount: async ({ providerAccountId, provider }) => {
            let user;
            try{
                const searchResponse = await api.get(`/users?providerName=${provider}&providerAccountId=${providerAccountId}`);
                user = searchResponse.data;
            } catch(e) {
                if(e.response.status === 404){
                    return null;
                } else {
                    throw e;
                }
            }

            return { ...user, emailVerified: null };
        },
        linkAccount: async ({ type, provider, providerAccountId, userId }) => {
            const createProivderRequest = { type, name: provider, accountId: providerAccountId };
            await api.post(`/users/${userId}/providers`, createProivderRequest);
        },
        // @ts-ignore
        createSession: () => {},
        // @ts-ignore
        getSessionAndUser: () => {},
        // @ts-ignore
        updateSession: () => {},
        // @ts-ignore
        deleteSession: () => {},
        // @ts-ignore
        updateUser: () => {},
    }
})