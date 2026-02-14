"use client";

import { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { fetchItm, CreateUser } from "../bookmarks/backend/DataBaseFunctions";
import { useUser } from "../../../hooks/userContext";

const Google_Client_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface GoogleJwtPayload {
  email: string;
  name: string;
}

export default function login() {
  const { user, setUser } = useUser();

  const getData = async () => {
    if (!user) return;
    await CreateUser(user.email, user.name); // create user if not exists
    try {
      const data = await fetchItm(user.email);
      console.log("Data fetched successfully", data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-black-600">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Bookmarker</h1>
        <p className="text-gray-500 mb-8">Save and manage all your bookmarks in one place.</p>
        <div className="hover:cursor-pointer">
        <GoogleOAuthProvider clientId={Google_Client_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
              const GoogleUser = {
                email: decoded.email,
                name: decoded.name,
              };
              setUser(GoogleUser);
              getData();
            }}
            onError={() => console.log("Login Failed")}
          />
        </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
