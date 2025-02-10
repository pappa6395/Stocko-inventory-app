

import cloudinary from "@/lib/cloudinary";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    
    try {
      const body = await req.json();
      const { imageData, email, orderId } = body;
        
      if (!imageData || !email) {
        return NextResponse.json({ message: "Missing required fields" });
      }

  
      // Upload to Cloudinary
      const cloudinaryUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            `data:image/png;base64,${imageData}`,
            {
              upload_preset: "ml_default",
              folder: "stocko_receipt",
              public_id: `receipt-${orderId}`
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
      });
      const uploadResult = cloudinaryUpload as { secure_url: string };
      console.log("Upload result:", uploadResult);
      
      if (!uploadResult.secure_url) {
        return NextResponse.json(
            { error: "Cloudinary upload failed" },
            { status: 500 }
        );
    }
  
      // Save receipt URL to PostgreSQL
      const receipt = await prismaClient.receipt.create({
        data: {
            orderId, 
            imageUrl: uploadResult.secure_url || "",
            email,
        },
      });
      console.log("receipt saved successfully:", receipt);
      
  
      // Send email using Resend
      await resend.emails.send({
        from: 'Stocko-Online <admin@89residencexclusive.co>',
        to: email,
        subject: "Your Receipt",
        html: `<p>Here is your receipt:</p><img src="${uploadResult.secure_url}" alt="Receipt Image"/>`,
      });

      return NextResponse.json({ success: true, receipt, message: "receipt saved and emailed" }, { status: 200 });
  
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal Server Error" });
    }
  }