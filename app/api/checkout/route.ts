
import { authOptions } from "@/config/authOptions";
import { CartItem } from "@/redux/slices/cartSlice";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
 
async function getActiveProducts() {
  const stripeProducts = await stripe.products.list();
  const activeProducts = stripeProducts.data.filter(
    (item: any) => item.active === true
  );
  return activeProducts;
}
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
  try {
    const { products } = await request.json();
    const checkoutProducts: CartItem[] = products;
    // Creating Stripe Non existing Stripe Products
    let activeProducts = await getActiveProducts();
    try {
      for (const product of checkoutProducts) {
        const stripeProduct = activeProducts?.find(
          (stripeProduct: any) =>
            stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
        );
 
        if (stripeProduct === undefined) {
          const unitAmount = Math.round(product.price * 100);
 
          const prod = await stripe.products.create({
            name: `${product.brand} ${product.name}`,
            default_price_data: {
              unit_amount: unitAmount,
              currency: "usd",
            },
            images: [product.image],
          });
          console.log(`Product created: ${prod.name}`);
        } else {
          console.log("Product already exists");
        }
      }
    } catch (error) {
      console.error("Error creating products:", error);
    }
 
    //Creating Checkout Stripe Items
    activeProducts = await getActiveProducts();
    let checkoutStripeProducts: any = [];
    for (const product of checkoutProducts) {
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() === (`${product.brand} ${product.name}`).toLowerCase()
      );
 
      if (stripeProduct) {
        checkoutStripeProducts.push({
          price: stripeProduct?.default_price,
          quantity: product.qty,
        });
      }
    }
 
    //Creating Checkout Session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("Checkout Stripe Products:", checkoutStripeProducts);
    const session = await stripe.checkout.sessions.create({
      line_items: checkoutStripeProducts,
      mode: "payment",
      success_url: `${baseUrl}/order/order-success?id=${userId}`,
      cancel_url: `${baseUrl}/order/order-cancelled`,
    });
    console.log(session?.url);
    return NextResponse.json({
      url: session?.url,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to create checkout session",
    });
  }
}
 