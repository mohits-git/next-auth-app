import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: 'mohit@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email.' : 'Reset your password.',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
                    ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
                    or copy paste the link in your browser. <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const res = await transport.sendMail(mailOptions);
        return res;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
