import NextAuth, {NextAuthOptions} from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: `${process.env.AZURE_AD_CLIENT_ID}`,
      clientSecret: `${process.env.AZURE_AD_CLIENT_SECRET}`,
      authorization:{
        params: { scope: "openid email Mail.Read Mail.ReadBasic Mail.ReadWrite User.Read User.ReadWrite"}
      },
      token:{
        url: "https://login.microsoftonline.com/common/oauth2/v2.0/token"
      }
    }),
  ],
  callbacks:{
    async jwt({token,user,account}:{
      token: any,
      user: any,
      account: any
    }){
      console.log(account)
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account?.expires_at
            ? account.expires_at * 1000
            : 0,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires - 100000 || 0) {
        return token;
      }
    },
    async session({ session, token }:{
      session: any,
      token: any
    }){
      if (session) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
        } 
        return session;
      }
    }
};
export default NextAuth(authOptions);