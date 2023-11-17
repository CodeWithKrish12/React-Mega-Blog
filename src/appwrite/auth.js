import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account; // we keep it has normal variable name bcoz we need to call the client with its endpoint and project url of the appwrite then make an account

    // we need such that when someone make the object then only the class should be called and then the account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique() ,email, password, name);
            if (userAccount) {
                // Call another method
                return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

// constructor bcoz when we call the class the constructor is automatically first called and executed so 

// in frontend we can access the functions by using the object given by authService such as authService.logout()

const authService = new Authservice();

export default authService;

// when some uses the class they need to make an object to use it so for code improvement is that we already make an object and export it so that we can directly use it 

