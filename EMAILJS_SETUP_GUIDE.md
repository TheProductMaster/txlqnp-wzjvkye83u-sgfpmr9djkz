# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to handle contact form submissions without any backend server.

## 📋 Prerequisites

- EmailJS account (free tier available)
- Email account for receiving contact form submissions
- Access to your project's source code

## 🚀 Step-by-Step Setup

### 1. Create EmailJS Account

1. Visit [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Save your Service ID** (you'll need this later)

### 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```html
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Service Needed: {{service}}
Budget Range: {{budget}}
Timestamp: {{timestamp}}

Message:
{{message}}

---
Reply directly to this email to respond to {{from_name}}.

Best regards,
Your Website Contact Form
```

4. Set template variables:
   - `from_name`
   - `from_email` 
   - `company`
   - `service`
   - `budget`
   - `message`
   - `timestamp`
   - `to_email`
   - `reply_to`

5. **Save your Template ID**

### 4. Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. Update Your Code

Open `/components/services/emailService.ts` and update these values:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // From step 2
  templateId: 'YOUR_TEMPLATE_ID', // From step 3  
  publicKey: 'YOUR_PUBLIC_KEY', // From step 4
};
```

Also update:
```typescript
to_email: 'YOUR_BUSINESS_EMAIL@domain.com', // Your business email
```

### 6. Install EmailJS Package

Run this command in your project directory:

```bash
npm install @emailjs/browser
```

### 7. Test the Integration

1. Start your development server
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email for the test message

## 🔧 Configuration Options

### Email Template Customization

You can customize the email template with:
- HTML formatting
- Your company branding
- Additional fields
- Conditional content

### Rate Limiting

EmailJS free tier includes:
- 200 emails/month
- Rate limiting protection
- Spam protection

### Security Features

- All emails are sent through EmailJS servers
- No sensitive data exposed in frontend
- Built-in spam protection
- CAPTCHA integration available

## 🎯 Best Practices

### 1. Form Validation
- Always validate on the frontend
- Provide clear error messages
- Guide users to fix issues

### 2. User Experience
- Show loading states during submission
- Provide success/error feedback
- Clear form after successful submission

### 3. Error Handling
- Handle network errors gracefully
- Log errors for debugging
- Provide fallback contact methods

### 4. Testing
- Test with different email providers
- Verify email delivery
- Test error scenarios

## 🚨 Common Issues & Solutions

### Issue: Emails not being received
**Solutions:**
- Check spam/junk folders
- Verify service and template IDs
- Ensure email service is properly configured
- Check EmailJS usage limits

### Issue: "User ID not found" error
**Solutions:**
- Verify your Public Key is correct
- Ensure EmailJS is properly initialized
- Check for typos in configuration

### Issue: Template variables not working
**Solutions:**
- Verify variable names match exactly
- Check template syntax
- Ensure all required variables are provided

### Issue: Network errors
**Solutions:**
- Check internet connection
- Verify EmailJS service status
- Implement retry logic for failures

## 📧 Email Template Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `from_name` | Sender's name | Yes |
| `from_email` | Sender's email | Yes |
| `company` | Company name | No |
| `service` | Requested service | No |
| `budget` | Budget range | No |
| `message` | Project details | Yes |
| `to_email` | Your business email | Yes |
| `reply_to` | Reply-to address | Yes |
| `timestamp` | Submission time | No |

## 🔗 Useful Links

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Integration Guide](https://www.emailjs.com/docs/sdk/react/)
- [Template Variables Guide](https://www.emailjs.com/docs/user-guide/template-variables/)
- [Troubleshooting Guide](https://www.emailjs.com/docs/troubleshooting/)

## 💡 Pro Tips

1. **Keep your credentials secure** - Never commit real credentials to version control
2. **Test thoroughly** - Always test email delivery before going live
3. **Monitor usage** - Keep track of your monthly email limits
4. **Have a fallback** - Provide alternative contact methods
5. **Customize templates** - Make emails match your brand

---

Need help? Check the [EmailJS Documentation](https://www.emailjs.com/docs/) or contact their support team.