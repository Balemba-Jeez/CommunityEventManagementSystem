import * as sendgrid from './sendgrid';
import * as gmail from './gmail';
// import other services

// switch provider in .env 
const provider = process.env.MAIL_PROVIDER || 'sendgrid';

const mailers = { sendgrid, gmail };

export default mailers[provider];
