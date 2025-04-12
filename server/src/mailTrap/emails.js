import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailTrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: [{ email }],
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      subject: "Verify Your Email",
      category: "Email Verification",
    });
    console.log("Email Sent: ", response);
  } catch (error) {
    console.log("Error in email verification: ", error);
    throw new Error("Error in verifying email : ", error);
  }
};

export const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: [{email}],
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{resetURL}", resetLink),
            category: "Password Reset",
            subject: "Reset Your Password"
        })
        console.log("Email Sent: ", response);
    } catch (error) {
        console.log("Error in sending password reset email: ", error);
        throw new Error("Error in sending password reset email: ", error);
    }
}