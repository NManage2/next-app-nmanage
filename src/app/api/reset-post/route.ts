import { PrismaClient } from '@prisma/client/extension';
import { NextResponse } from 'next/server';
import { prisma } from '@/utils/lib/prisma';
//const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Supprimer les données (Optionnel mais conseillé pour éviter les conflits d'ID)
    //await prisma.post.deleteMany();

    // 2. Réinitialiser le compteur à 1 (PostgreSQL)
    // Note: Utilise "post_id_seq" en minuscules si "Post_id_seq" échoue
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE "Post_id_seq" RESTART WITH 1;`,
    );

    return NextResponse.json({
      message: 'Séquence réinitialisée à 1 avec succès !',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Échec de la réinitialisation' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
