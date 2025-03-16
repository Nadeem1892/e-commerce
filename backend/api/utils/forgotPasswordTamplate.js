const forgotPasswordTamplate = (otpData) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
          <h2 style="color: #007bff; text-align: center;">Password Reset Request</h2>
          <p style="font-size: 16px;">Dear ${otpData?.name},</p>
          <p style="font-size: 16px;">You've requested a password reset. Please use the following OTP code to reset your password:</p>
          
          <div style="background-color: #f0f8ff; padding: 10px 15px; font-size: 20px; font-weight: bold; border-radius: 5px; text-align: center; margin: 20px 0;">
              ${otpData?.otp}
          </div>
  
          <p style="font-size: 16px;">This OTP is valid for 1 hour only. Enter this OTP on the Deems-Shop website to proceed with resetting your password.</p>
  
          <p style="font-size: 16px; color: #555;">Thanks,<br/>Deems-Shop Team</p>
  
          <div style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
              <p>If you didn't request a password reset, please ignore this email.</p>
          </div>
      </div>
    `;
  };
  

  module.exports = forgotPasswordTamplate