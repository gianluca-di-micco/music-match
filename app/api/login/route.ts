import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const utente =
    await prisma.utente.findFirst({
      where: {
        email:
          body.email
      }
    });

  if (!utente) {
    return Response.json(
      {
        error:
          "Credenziali errate"
      },
      {
        status: 401
      }
    );
  }

  const passwordCorretta =
    await bcrypt.compare(
      body.password,
      utente.password
    );

  if (!passwordCorretta) {
    return Response.json(
      {
        error:
          "Credenziali errate"
      },
      {
        status: 401
      }
    );
  }

  return Response.json(
    utente
  );
}