import { verifyToken, generateTokenV2, verifyTokenV2 } from '@/lib/security/token';

export async function POST(req) {
  const { role, tempToken } = await req.json();

  try {
    // Verify the temporary token
    const user = await verifyTokenV2("login_session", tempToken);
    console.log('backend-role display',role, user)

    console.log('backend-role tempToken',tempToken)

    // Verify if user(user) has the specified role
    if (!user.roles.includes(role)) {
      return Response.json({ message: "Invalid role selection" }, { status: 403 });
    }

    // Generate the final access token with chosen role
    const finalToken = await generateTokenV2("login", {
      id: user.id,
      name:user.name,
      email: user.email,
      role,
      zone: user.zone
    });
    console.log("autheticatedUser:", {
      id: user.id,
      name: user.name,
      email: user.email,
      role,
      zone: user.zone
    })

    return Response.json({
      message: "Role confirmed. Login successful.",
      token: finalToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
        zone: user.zone
      }
    });

  } catch (error) {
    console.error("Role confirm error:", error);
    return Response.json({ message: "Invalid or expired session" }, { status: 401 });
  }
}
