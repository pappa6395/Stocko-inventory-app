import { getAllProducts, getProductBySlug } from "@/actions/products";

import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ slug: string }>
}

export async function GET(request: Request, {params}: Props) {
  
    const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);
    return NextResponse.json(
      {
        data: product,
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
