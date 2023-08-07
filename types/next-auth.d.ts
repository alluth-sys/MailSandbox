import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: Account.accessToken;
        user?: User | AdapterUser;
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: Account.accessToken;
        user?: User | AdapterUser;
    }
}