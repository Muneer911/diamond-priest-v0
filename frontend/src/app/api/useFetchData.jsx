// api/userApi.js
"use client";
import axios from "axios";

export async function fetchUserData(access_token) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await axios.post(
    "http://127.0.0.1:5000/userdata",
    {},
    {
      headers: { Authorization: `Bearer ${access_token}` },
      timeout: 10000,
    }
  );
  const history = response?.data?.user_history ?? [];
  const profile = response?.data?.user_profile ?? null;
  return { history, profile };
}
