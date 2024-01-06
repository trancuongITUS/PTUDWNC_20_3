import nodemailer from 'nodemailer';


class NodemaillerConfig {
    transporter: any = null;
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ptudwnc@gmail.com',
                pass: 'wtbd bevo nkik bmeo',
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
    }
}

export default new NodemaillerConfig().transporter;