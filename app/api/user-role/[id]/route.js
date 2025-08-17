import db from "@/lib/db";
import { isAuthenticated, isAuthenticatedV2, isAuthorized } from '@/lib/security/auth';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        // Await the params object first, then access the id
        const { id } = await params;
        
        // Get token from request header
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1]; // Bearer <token>
        
        // Authentication
        const auth = await isAuthenticatedV2(token);
        if (!auth.ok) {
            return auth.response; // 401 Unauthorized
        }
        const user = auth.user;
        
        // Authorization
        if (!isAuthorized(user, ['admin'])) {
            return NextResponse.json(
                { message: 'Unauthorized' }, 
                { status: 403 }
            );
        }
        
        // Validate id
        if (!id) {
            return NextResponse.json(
                { message: 'Bad request: missing user ID' }, 
                { status: 400 }
            );
        }
        
        // Delete user role from database
        const [result] = await db.execute(`DELETE FROM user_roles WHERE user_id = ?`, [id]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { message: 'User role not found' }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { message: 'User role deleted successfully' },
            { status: 200 }
        );
        
    } catch (err) {
        console.error('Error deleting user role:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}