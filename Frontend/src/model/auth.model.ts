export async function callLogin(email:string, password:string):Promise<Response> {
    const url = process.env.NEXT_PUBLIC_API_URL+"/auth/login";

    const loginData = {
        email: email,
        password: password
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })

    return response;
}

export async function callLogout(user_id:number) {
    const url = process.env.NEXT_PUBLIC_API_URL+"/auth/logout";

    const logoutData = {
        user_id: user_id
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logoutData)
    })

    return response;
}