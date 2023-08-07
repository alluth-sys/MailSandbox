import NextAuth, {NextAuthOptions, Session} from 'next-auth';
import {JWT} from 'next-auth/jwt';
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
    async jwt({token,account,user}): Promise<JWT>{
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }): Promise<Session>{
        session.accessToken = token.accessToken;
        session.user = token.user;
        return session;
      }
    }
};
export default NextAuth(authOptions);