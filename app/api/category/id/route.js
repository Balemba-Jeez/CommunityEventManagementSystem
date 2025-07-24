import db from "@/lib/db";
import { isAuthenticated, isAuthorized } from "@/lib/security/auth";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {
    try {
        // Await the params object first, then access the id
        const { id } = await params;
       
        // Get token from request header
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1]; // Bearer <token>
       
        // Authentication
        const auth = isAuthenticated(token);
        if (!auth.ok) {
            return auth.response; // 401 Unauthorized
        }
        const user = auth.user;
       
        // Authorization
        if (!isAuthorized(user, ['zone_event_manager','general_event_manager'])) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }
       
        // Validate id parameter
        if (!id) {
            return NextResponse.json(
                { message: 'Bad request: missing Category ID' },
                { status: 400 }
            );
        }

        // Collect data to be Updated in the Category
        const { name, description = null, image_url = null, zone_id = null, parent_id = null } = await req.json();

        // Validate required fields
        if (!name || !user.id) {
            return NextResponse.json(
                { error: 'Bad request: name and user id is required' },
                { status: 400 }
            );
        }

        // Zone Event Managers must provide a valid zone_id
        if (isAuthorized(user, ['zone_event_manager'])) {
            if (!zone_id) {
              return NextResponse.json({ message: "Bad request: zone_id is required for zone_event_manager" }, { status: 400 });
            }

            // Check if zone exist
            const [zone] = await db.execute("SELECT id FROM zones WHERE id = ?", [zone_id]);
            if (zone.length === 0) {
                return NextResponse.json({ message: `Zone with ID '${zone_id}' does not exist` }, { status: 404 });
            }
        }
       
        // Update Category in database
        const [result] = await db.execute(
            `UPDATE categories SET name = ?, description = ?, image_url = ?, zone_id = ?, parent_id = ?, user_id = ? WHERE id = ?`, 
            [name, description || null, image || null, zone_id, parent_id, user.id, id]
        );
       
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: 'Failed to update zone' },
                { status: 500 }
            );
        }


        // Fetch updated zone
        const [updatedZone] = await db.execute(
            `SELECT * FROM zones WHERE id = ?`, 
            [id]
        );
       
        return NextResponse.json(
            { 
                message: 'Zone updated successfully',
                zone: updatedZone[0]
            },
            { status: 200 }
        );
       
    } catch (err) {
        console.error('Error updating zone:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}