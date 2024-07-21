type verificationEmailOptions = {
    username?: string;
    name?: string;
    companyName?: string;
    verificationToken: number;
    userVerificationUrl: string;
    verifyTokenExpiry: Date;
}

const verificationEmail = ({ username, name, companyName, verificationToken, userVerificationUrl, verifyTokenExpiry }: verificationEmailOptions) => `
  Dear ${username || name},<br>

  Thank you for registering with ${companyName}!<br>

  To ensure the security of your account and complete the registration process, we kindly ask you to verify your email address.<br>

  Please use the following token to verify your account:<br>
  <strong>OTP: ${verificationToken}</strong><br>

  You can verify your account by clicking on the following link: ${userVerificationUrl}<br>

  If you are unable to click the link, please copy and paste the URL into your browser's address bar.<br>

  Thank you for choosing ${companyName}.<br>
  If you have any questions or concerns, please don't hesitate to contact us.<br>

  <strong>Note:</strong> This OTP is valid till ${new Date(verifyTokenExpiry).toLocaleString()}<br>

  Best regards,<br>
  ${companyName}
`;

export default verificationEmail;
