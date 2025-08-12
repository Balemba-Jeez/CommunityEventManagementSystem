import { verifyToken, verifyTokenV2 } from '@/lib/security/token'; 


/**
 * @deprecated Use isAuthenticatedV2(token, type) with updated token verification.
 * This function relies on the deprecated verifyToken and single secret approach.
 */
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

export async function isAuthenticatedV2(token, type) {
    try {
        const user = await verifyTokenV2(type, token);
        if (!user) {
            return { response: new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 }) };
        }
        return {  ok: true, user };
    } catch (err) {
        return { response: new Response(JSON.stringify({ message: 'Invalid token or expired token' }), { status: 401 }) };
    }
}

export function isAuthorized(user, allowedRoles = []) {
    const userRoles = user.role.map(r => r.name);
    return allowedRoles.some(role => userRoles.includes(role));
}
