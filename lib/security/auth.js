import { verifyToken } from '@/lib/security/token'; 



export function isAuthenticated(token) {
    try {
        const user = verifyToken(token);
        if (!user) {
            return { response: new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 }) };
        }
        return {  ok: true, user };
    } catch (err) {
        return { response: new Response(JSON.stringify({ message: 'Invalid token or expired token' }), { status: 401 }) };
    }
}

export function isAuthorized(user, allowedRoles = []) {
    const userRoles = user.role.map(r => r.name); // ['member']
    return allowedRoles.some(role => userRoles.includes(role));
}
