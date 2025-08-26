



import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Please provide email and password");
                }

                await connectDB();

                const user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error("No user found");

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isPasswordValid) throw new Error("Invalid credentials");

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },

        async signIn({ user, account, profile }) {
            // Only for Google provider
            if (account?.provider === "google") {
                try {
                    await connectDB();

                    // Check if user exists
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        const newUser = new User({
                            name: user.name,
                            email: user.email,
                            // no password here
                        });
                        await newUser.save();
                    }

                    return true;
                } catch (error) {
                    console.error("Error checking/creating user:", error);
                    return false;
                }
            }
            return true;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
