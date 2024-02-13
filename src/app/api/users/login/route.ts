import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User do not exist" }, { status: 400 });
        }

        const res = await bcryptjs.compare(password, user.password);

        if (!res) {
            return NextResponse.json({ error: "Incorrect password." }, { status: 401 })
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({ message: "User Loged In successfully" });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

