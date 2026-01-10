import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import { compare } from 'bcryptjs'; // Uncomment when using database auth
import type { NextAuthConfig } from 'next-auth';

// For development/demo: use environment variables or mock credentials
// In production, use database authentication
const MOCK_ADMIN = {
  id: '1',
  email: process.env.ADMIN_EMAIL || 'admin@jainamshah.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  name: 'Jainam Shah',
};

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          // For development: check against mock admin
          if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
            return {
              id: MOCK_ADMIN.id,
              email: MOCK_ADMIN.email,
              name: MOCK_ADMIN.name,
            };
          }

          // TODO: In production, check against database
          // const user = await prisma.user.findUnique({ where: { email } });
          // if (!user) return null;
          // const isPasswordValid = await compare(password, user.password);
          // if (!isPasswordValid) return null;
          // return { id: user.id, email: user.email, name: user.name };

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname === '/admin/login';

      if (isOnAdmin) {
        if (isOnLogin) {
          if (isLoggedIn) {
            return Response.redirect(new URL('/admin/dashboard', nextUrl));
          }
          return true;
        }
        return isLoggedIn;
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

