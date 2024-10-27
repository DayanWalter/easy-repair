import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the SSR package. It exchanges an auth code for the user's session.
	// https://supabase.com/docs/guides/auth/server-side/nextjs

	// this
	const requestUrl = new URL(request.url);
	// this
	const code = requestUrl.searchParams.get("code");
	// this not
	const origin = requestUrl.origin;
	// this not
	const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

	if (code) {
		const supabase = await createClient();
		await supabase.auth.exchangeCodeForSession(code);
	}

	if (redirectTo) {
		return NextResponse.redirect(`${origin}${redirectTo}`);
	}
	console.log("redirecting to", `${origin}`);
	// URL to redirect to after sign up process completes
	return NextResponse.redirect(`${origin}`);
}
