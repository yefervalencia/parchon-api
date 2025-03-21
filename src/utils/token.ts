import jwt from 'jsonwebtoken';
import { Request } from 'express';

// Definir una interfaz para el payload del token
interface TokenPayload {
    id: number;
    email: string;
    name: string;
    lastname: string;
    role: string;
}

class TokenUtils {
    // Método para extraer el token de la solicitud
    static extractTokenFromRequest(req: Request): string | null {
        // Intentar obtener el token de diferentes fuentes
        const token =
            req.cookies.SESSIONPON ||
            req.headers.authorization?.split(' ')[1] ||
            null;

        return token;
    }

    // Método para verificar y decodificar el token
    static verifyToken(token: string): TokenPayload | null {
        try {
            // Asegúrate de usar tu clave secreta real de JWT
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'tu_clave_secreta';

            const decoded = jwt.verify(token, JWT_SECRET_KEY) as TokenPayload;
            return decoded;
        } catch (error) {
            console.error('Error verificando token:', error);
            return null;
        }
    }

    // Método para generar un nuevo token
    static generateToken(payload: Partial<TokenPayload>): string {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'tu_clave_secreta';

        return jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: '1d'
        });
    }

    // Método para obtener el ID del usuario desde el token
    static getUserIdFromRequest(req: Request): number | null {
        const token = this.extractTokenFromRequest(req);

        if (!token) {
            return null;
        }

        const decoded = this.verifyToken(token);
        return decoded ? decoded.id : null;
    }

    // Método para obtener el rol desde el token
    static getRoleFromRequest(req: Request): string | null {
        const token = this.extractTokenFromRequest(req);

        if (!token) {
            return null;
        }

        const decoded = this.verifyToken(token);
        return decoded ? decoded.role : null;
    }
}

export default TokenUtils;