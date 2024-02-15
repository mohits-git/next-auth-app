import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id : userId, email } = decodedToken;
        await sendEmail({ email, emailType: "RESET", userId});
        return NextResponse.json({ message: "Reset Password Mail Sent.", success: true })
    } catch(error: any) {
        return NextResponse.json({error: "SendResetMail :: Something went wrong."})
    }
}

