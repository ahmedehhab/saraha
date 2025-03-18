import transporter from "./nodemailerConfig.js";
export const verifyEmail = (verifyLink) => `
<div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; 
            text-align: center; font-family: Arial, sans-serif; border: 1px solid #ddd; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e90ff, #00bfa5); padding: 20px; border-radius: 10px 10px 0 0;">
        <h2 style="color: #fff; margin: 0;">Welcome to Saraha</h2>
    </div>

    <!-- Body -->
    <div style="padding: 20px;">
        <p style="font-size: 16px; color: #333;">Thank you for signing up! Please confirm your email address by clicking the button below.</p>
        
        <a href="${verifyLink}" target="_blank"
           style="display: inline-block; background: #00bfa5; color: #fff; padding: 14px 24px; border-radius: 6px; 
                  text-decoration: none; font-size: 16px; font-weight: bold; margin: 20px 0; transition: background 0.3s ease;">
            Verify Your Email
        </a>

        <p style="color: #777; font-size: 14px; margin-top: 15px;">
            If you didn't sign up, you can safely ignore this email.
        </p>
    </div>

    <!-- Footer -->
    <div style="background: #f1f1f1; padding: 12px; border-radius: 0 0 10px 10px; font-size: 13px; color: #666;">
        <p style="margin: 5px 0;">Need help? <a href="mailto:support@saraha.com" style="color: #1e90ff; text-decoration: none;">Contact Support</a></p>
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Saraha. All rights reserved.</p>
    </div>

</div>`;


export const resetPasswordEmail = (resetCode) => `
<div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; 
            border-radius: 10px; text-align: center; font-family: Arial, sans-serif; 
            border: 1px solid #ddd; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ff416c, #ff4b2b); padding: 20px; 
                border-radius: 10px 10px 0 0;">
        <h2 style="color: #fff; margin: 0;">Reset Your Password</h2>
    </div>

    <!-- Body -->
    <div style="padding: 20px;">
        <p style="font-size: 16px; color: #333;">We received a request to reset your password. 
           Use the code below to reset it.</p>
        
        <div style="background: #f8f8f8; padding: 15px; border-radius: 5px; 
                    font-size: 24px; font-weight: bold; color: #ff416c; 
                    display: inline-block; margin: 20px 0;">
            ${resetCode}
        </div>

        <p style="color: #777; font-size: 14px;">This code will expire in 15 minutes. 
           If you did not request a password reset, please ignore this email.</p>
    </div>

    <!-- Footer -->
    <div style="background: #f1f1f1; padding: 12px; border-radius: 0 0 10px 10px; 
                font-size: 13px; color: #666;">
        <p style="margin: 5px 0;">Need help? 
           <a href="mailto:support@saraha.com" style="color: #ff416c; text-decoration: none;">
           Contact Support</a></p>
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Saraha. All rights reserved.</p>
    </div>

</div>`;


export const sendVerificationEmail = async (email, verifyLink) => {
  
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Account",
      html: verifyEmail(verifyLink)
  };

  await transporter.sendMail(mailOptions);
};

export const sendResetCode = async (email, code) => {
  
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password",
        html: resetPasswordEmail(code)
    };
  
    await transporter.sendMail(mailOptions);
  };