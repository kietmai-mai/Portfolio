// Email Service Integration for Michael Mai's Portfolio
// This simulates email sending functionality - in production, you'd integrate with a real email service

class EmailService {
    constructor() {
        this.isSending = false;
        this.sentMessages = [];
    }
    
    async sendContactForm(data) {
        if (this.isSending) return false;
        
        this.isSending = true;
        
        try {
            // Simulate API call delay
            await this.delay(2000);
            
            // In production, this would make an actual API call to your email service
            // For example, using EmailJS, SendGrid, or a custom backend endpoint
            
            const emailData = {
                to: 'kiethmai@gmail.com',
                from: data.email,
                subject: `Portfolio Contact: ${data.subject}`,
                html: this.formatContactEmail(data),
                text: this.formatContactText(data),
                timestamp: new Date().toISOString()
            };
            
            // Store sent message (in production, this would be handled by the email service)
            this.sentMessages.push(emailData);
            
            // Log to console for demonstration
            console.log('📧 Email sent successfully:', emailData);
            
            this.isSending = false;
            return true;
            
        } catch (error) {
            console.error('❌ Email sending failed:', error);
            this.isSending = false;
            return false;
        }
    }
    
    async sendConversationalMessage(data) {
        if (this.isSending) return false;
        
        this.isSending = true;
        
        try {
            await this.delay(1500);
            
            const emailData = {
                to: 'kiethmai@gmail.com',
                from: data.email,
                subject: `Conversational Contact: ${data.subject}`,
                html: this.formatConversationalEmail(data),
                text: this.formatConversationalText(data),
                timestamp: new Date().toISOString(),
                type: 'conversational'
            };
            
            this.sentMessages.push(emailData);
            console.log('📧 Conversational email sent:', emailData);
            
            this.isSending = false;
            return true;
            
        } catch (error) {
            console.error('❌ Conversational email failed:', error);
            this.isSending = false;
            return false;
        }
    }
    
    formatContactEmail(data) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1a2332, #2c3e50); color: white; padding: 2rem; text-align: center;">
                    <h2 style="margin: 0; font-family: 'Playfair Display', serif;">New Message from Portfolio</h2>
                </div>
                <div style="background: white; padding: 2rem;">
                    <h3 style="color: #b87333; margin-bottom: 1rem;">Contact Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Name:</td>
                            <td style="padding: 0.5rem 0;">${data.firstName} ${data.lastName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Email:</td>
                            <td style="padding: 0.5rem 0;">${data.email}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Company:</td>
                            <td style="padding: 0.5rem 0;">${data.company || 'Not specified'}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Subject:</td>
                            <td style="padding: 0.5rem 0;">${data.subject}</td>
                        </tr>
                    </table>
                    
                    <h3 style="color: #b87333; margin: 1.5rem 0 1rem 0;">Message</h3>
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #b87333;">
                        <p style="margin: 0; line-height: 1.6;">${data.message}</p>
                    </div>
                    
                    <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 0.875rem;">
                        <p>This message was sent from your portfolio website at ${new Date().toLocaleString()}</p>
                        <p>Reply directly to this email to respond to ${data.firstName}.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    formatConversationalEmail(data) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1a2332, #2c3e50); color: white; padding: 2rem; text-align: center;">
                    <h2 style="margin: 0; font-family: 'Playfair Display', serif;">Conversational Contact</h2>
                    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Someone had a conversation with your contact form</p>
                </div>
                <div style="background: white; padding: 2rem;">
                    <h3 style="color: #b87333; margin-bottom: 1rem;">Contact Information</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Name:</td>
                            <td style="padding: 0.5rem 0;">${data.name}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Email:</td>
                            <td style="padding: 0.5rem 0;">${data.email}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Company:</td>
                            <td style="padding: 0.5rem 0;">${data.company}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem 0; font-weight: 600;">Subject:</td>
                            <td style="padding: 0.5rem 0;">${data.subject}</td>
                        </tr>
                    </table>
                    
                    <h3 style="color: #b87333; margin: 1.5rem 0 1rem 0;">Conversation Summary</h3>
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #b87333;">
                        <p style="margin: 0 0 0.5rem 0; line-height: 1.6;"><strong>Specifics:</strong> ${data.specifics}</p>
                        <p style="margin: 0; line-height: 1.6;"><strong>Message:</strong> ${data.message}</p>
                    </div>
                    
                    <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 0.875rem;">
                        <p>This conversational message was sent from your portfolio website at ${new Date().toLocaleString()}</p>
                        <p>Reply directly to this email to continue the conversation with ${data.name}.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    formatContactText(data) {
        return `
New message from ${data.firstName} ${data.lastName}

Contact Details:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Company: ${data.company || 'Not specified'}
- Subject: ${data.subject}

Message:
${data.message}

Sent from portfolio website at ${new Date().toLocaleString()}
        `;
    }
    
    formatConversationalText(data) {
        return `
Conversational contact from ${data.name}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company}
- Subject: ${data.subject}

Conversation:
Specifics: ${data.specifics}
Message: ${data.message}

Sent from portfolio website at ${new Date().toLocaleString()}
        `;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Utility method to get sent messages (for debugging)
    getSentMessages() {
        return this.sentMessages;
    }
}

// EmailJS Integration (when you're ready to use a real email service)
class EmailJSIntegration {
    constructor(userID, serviceID, templateID) {
        this.userID = userID;
        this.serviceID = serviceID;
        this.templateID = templateID;
        this.initialized = false;
    }
    
    async init() {
        // In production, you would load the EmailJS SDK
        // emailjs.init(this.userID);
        this.initialized = true;
        console.log('EmailJS integration initialized');
    }
    
    async sendForm(formData) {
        if (!this.initialized) {
            console.error('EmailJS not initialized');
            return false;
        }
        
        try {
            // In production, this would use the actual EmailJS SDK
            // const response = await emailjs.sendForm(this.serviceID, this.templateID, formElement);
            console.log('EmailJS form sent successfully');
            return true;
        } catch (error) {
            console.error('EmailJS send failed:', error);
            return false;
        }
    }
}

// Initialize email service
const emailService = new EmailService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmailService, EmailJSIntegration };
}