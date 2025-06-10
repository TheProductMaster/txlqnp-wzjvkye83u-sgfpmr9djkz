import emailjs from '@emailjs/browser';

// EmailJS configuration - replace with your actual values
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
};

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class EmailService {
  private static instance: EmailService;

  private constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Send contact form email using EmailJS
   */
  public async sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
    try {
      // Validate form data
      const validation = this.validateFormData(formData);
      if (!validation.isValid) {
        return {
          success: false,
          message: validation.message || 'Please fill in all required fields.',
        };
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        service: formData.service || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message,
        to_email: 'YOUR_BUSINESS_EMAIL@domain.com', // Replace with your business email
        reply_to: formData.email,
        // Add timestamp for tracking
        timestamp: new Date().toLocaleString(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Handle specific EmailJS errors
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          return {
            success: false,
            message: 'Network error. Please check your internet connection and try again.',
            error: error.message,
          };
        } else if (error.message.includes('template')) {
          return {
            success: false,
            message: 'Configuration error. Please try again later.',
            error: error.message,
          };
        }
      }

      return {
        success: false,
        message: 'Something went wrong. Please try again or contact us directly.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Validate form data before sending
   */
  private validateFormData(formData: ContactFormData): { isValid: boolean; message?: string } {
    // Check required fields
    if (!formData.name?.trim()) {
      return { isValid: false, message: 'Name is required.' };
    }

    if (!formData.email?.trim()) {
      return { isValid: false, message: 'Email is required.' };
    }

    if (!formData.message?.trim()) {
      return { isValid: false, message: 'Project details are required.' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { isValid: false, message: 'Please enter a valid email address.' };
    }

    // Check message length
    if (formData.message.length < 10) {
      return { isValid: false, message: 'Please provide more details about your project (at least 10 characters).' };
    }

    if (formData.message.length > 2000) {
      return { isValid: false, message: 'Message is too long. Please keep it under 2000 characters.' };
    }

    return { isValid: true };
  }

  /**
   * Test EmailJS configuration
   */
  public async testConfiguration(): Promise<boolean> {
    try {
      const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        message: 'This is a test message to verify EmailJS configuration.',
        to_email: 'YOUR_BUSINESS_EMAIL@domain.com',
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        testParams
      );

      return response.status === 200;
    } catch (error) {
      console.error('EmailJS Configuration Test Failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();