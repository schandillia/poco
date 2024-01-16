import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.VERIFICATION_SENDER as string,
    to: email,
    subject: "Your OTP",
    html: `<p>Your one-time passcode is: ${token}</p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.APP_URL}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: process.env.VERIFICATION_SENDER as string,
    to: email,
    subject: "Reset your password",
    html: `<p>Please click <a href="${resetLink}">here</a> to reset your password.</p>`,
  })
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.APP_URL}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: process.env.VERIFICATION_SENDER as string,
    to: email,
    subject: "Confirm your email",
    html: `<p>Please click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  })
}
