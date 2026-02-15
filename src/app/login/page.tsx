"use client";

import { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { fetchItm, CreateUser } from "../bookmarks/backend/DataBaseFunctions";
import { useUser } from "../../../hooks/userContext";
import { useRouter } from "next/navigation";

const Google_Client_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface GoogleJwtPayload {
  email: string;
  name: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser, setIsLoading, isLoading, setBookmarks, Auth, setAuth } = useUser();

  // Redirect to dashboard if user exists
  useEffect(() => {
    console.log("User:", user);
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading]);

  const handleLogin = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      const User = await jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      const GoogleUser = {
        email: User.email,
        name: User.name,
      };
      // Create user if it doesn't exist and fetch data
      setUser(await CreateUser(GoogleUser.email, GoogleUser.name));
      setBookmarks(user.bookmarks)
      setAuth(true);
      const storedUser = localStorage.getItem("user");
      if(!Auth && !storedUser){
      setIsLoading(false)
      router.push("/dashboard");
      }

    } catch (error: any) {
      console.log("Login error:", error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white to-gray-900">
        <p className="text-gray-700 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-900">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm text-center transform transition-transform hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Bookmarker</h1>
        <p className="text-gray-500 mb-8">Save and manage all your bookmarks in one place.</p>

        <GoogleOAuthProvider clientId={Google_Client_ID}>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("Login Failed")}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
