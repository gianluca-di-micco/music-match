"use client";

import { useRouter }
from "next/navigation";

export default function LogoutButton() {

  const router =
    useRouter();

  function logout() {

    localStorage.removeItem(
      "utente"
    );

    router.push(
      "/login"
    );
  }

  return (

    <button
      onClick={logout}
    >
      Logout
    </button>

  );
}