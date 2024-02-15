import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPass: newPassword } = reqBody;

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPass;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Successfully Reset the Password."});

    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong." }, { status: 400 });
    }
} 
