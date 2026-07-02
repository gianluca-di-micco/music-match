"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [utente, setUtente] =
  useState<any>(null);

  useEffect(() => {

    const u =
      JSON.parse(
        localStorage.getItem("utente") || "null"
      );

    setUtente(u);

  }, []);
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messaggio, setMessaggio] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    const data =
      await response.json();

    if (response.ok) {
      localStorage.setItem("utente", JSON.stringify(data));
      setMessaggio(
        "Registrazione completata!"
      );
      router.push("/profilo");
    } else {
      setMessaggio(data.error);
    }
  }

  return (
    <main>
      <h1>Registrazione</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />
        </div>

        <button type="submit">
          Registrati
        </button>
      </form>

      <br />
      <br />

      <button type="button" onClick={() => router.push("/login")}>
        Vai al Login
      </button>

      <p>{messaggio}</p>
    </main>
  );
}