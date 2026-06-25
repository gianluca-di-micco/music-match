"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import ProteggiPagina
from "../components/ProteggiPagina";

export default function MatchPage() {

  const [utente,
    setUtente] =
    useState<any>(null);

  const [matches,
    setMatches] =
    useState<any[]>([]);

  useEffect(() => {

    const u =
      JSON.parse(
        localStorage.getItem(
          "utente"
        ) || "null"
      );

    setUtente(u);

  }, []);

  useEffect(() => {

    if (!utente) return;

    async function caricaMatch() {

      const response =
        await fetch(
          `/api/match?idUtente=${utente.idUtente}`
        );

      const data =
        await response.json();

      setMatches(data);
    }

    caricaMatch();

  }, [utente]);

  return (

    <ProteggiPagina>

      <main
        style={{
          padding: "20px",
          maxWidth: "900px"
        }}
      >

        <h1>
          I miei Match
        </h1>

        {matches.length === 0 ? (

          <p>
            Nessun match
          </p>

        ) : (

          matches.map(
            (match) => {

              const altroUtente =

                match.idUtenteOrigina ===
                utente.idUtente

                  ? match.utenteOttiene

                  : match.utenteOrigina;

              return (

                <div
                  key={
                    match.idMatch
                  }
                  style={{
                    border:
                      "1px solid #ccc",

                    borderRadius:
                      "8px",

                    padding:
                      "15px",

                    marginBottom:
                      "20px"
                  }}
                >

                  <h2>
                    {
                      altroUtente
                        .username
                    }
                  </h2>

                  <p>

                    <strong>
                      Bio:
                    </strong>

                    {" "}

                    {
                      altroUtente
                        .bio ||

                      "Nessuna bio"
                    }

                  </p>

                  <p>

                    <strong>
                      Esperienza:
                    </strong>

                    {" "}

                    {
                      altroUtente
                        .livelloEsperienza ||

                      "Non specificata"
                    }

                  </p>

                  <Link
                    href={
                      `/chat/${match.idMatch}`
                    }
                  >

                    <button>
                      Apri Chat
                    </button>

                  </Link>

                </div>

              );

            }
          )

        )}

      </main>

    </ProteggiPagina>

  );

}