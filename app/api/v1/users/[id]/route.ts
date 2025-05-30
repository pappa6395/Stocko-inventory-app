import { getAllProducts, getProductBySlug } from "@/actions/products";
import { getUserById } from "@/actions/users";
import { User } from "@prisma/client";

import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, {params}: Props) {
    
  const { id } = await params;
  try {
    const user: User | null | undefined = (await getUserById(id))?.data || null;
    if (!user) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: "No User Found",
        },
        { status: 404 }
      );
    }
    const { password, ...others } = user;
    return NextResponse.json(
      {
        data: others,
        success: true,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}
