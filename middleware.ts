import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
    const url = req.nextUrl
    const origin = req.nextUrl.origin // e.g. https://pass-sage.vercel.app

    let username = req.cookies.get('username')?.value;
    let info = req.cookies.get('info');
    let skills = req.cookies.get('skills');
    let profile = `${origin}/users/${username}`;

    if (username && (url.pathname === '/login' || url.pathname === '/signup')) {
        return NextResponse.redirect(profile);
    }

    else if (info && skills && (url.pathname === '/users/polish' || url.pathname === '/users/polish-skills')) {
        return NextResponse.redirect(profile);
    }

    else if (!username && (url.pathname === '/users/polish' || url.pathname === '/users/polish-skills' || url.pathname === '/users/settings' || url.pathname === '/manage-interviews')) {
        return NextResponse.redirect(`${origin}/login`);
    }


}

// dont't forget: use valueOf with cookies to get the value of the cookie