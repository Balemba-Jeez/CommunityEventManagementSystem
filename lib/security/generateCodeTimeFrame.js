
// Get code expiration time based on code purpose
 const getExpirationTime = (purpose) => {
    const now = new Date();

    switch (purpose) {
        case 'password_reset':
            // Highly sensitive – very short window to reduce chance of misuse
            return new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes

        case 'email_verification':
            // Medium sensitivity – user might check email later, allow more time
            return new Date(now.getTime() + 1 * 60 * 60 * 1000); // 1 hour

        case '2fa_login':
            // Extremely sensitive – only for immediate authentication
            return new Date(now.getTime() + 3 * 60 * 1000); // 3 minutes

        case 'account_recovery':
            // Sensitive but less urgent than password reset
            return new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes

        case 'phone_verification':
        case 'whatsapp_verification':
        return new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes

        default:
            // Default fallback for any unlisted purpose
            return new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
    }
};

export default getExpirationTime;
