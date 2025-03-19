export async function callSingleUser(user_id:number):Promise<Response>  {
    const url = process.env.NEXT_PUBLIC_API_URL+"/users/"+user_id;

    const tokenJWT = localStorage.getItem("token");

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+tokenJWT,
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function callAllUsers():Promise<Response>  {
    const url = process.env.NEXT_PUBLIC_API_URL+"/users";

    const tokenJWT = localStorage.getItem("token");

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+tokenJWT,
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function callDeleteUser(user_id:number):Promise<Response>  {
    const url = process.env.NEXT_PUBLIC_API_URL+"/users/"+user_id;

    const tokenJWT = localStorage.getItem("token");

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer "+tokenJWT,
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function callInsertUser(nome:string, email:string, password:string, role:string) {
    const url = process.env.NEXT_PUBLIC_API_URL+"/users";

    const tokenJWT = localStorage.getItem("token");

    const bodyCreate = {
        "name": nome,
        "email": email,
        "password": password,
        "role": role
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer "+tokenJWT,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyCreate)
    })

    return response;
}

export async function callUpdateUser(user_id:number, nome:string, email:string, password:string, role:string, active:boolean) {
    const url = process.env.NEXT_PUBLIC_API_URL+"/users/"+user_id;

    const tokenJWT = localStorage.getItem("token");

    const bodyUpdate = {
        "name": nome,
        "email": email,
        "password": password,
        "role": role,
        "active": active
    }

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer "+tokenJWT,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyUpdate)
    })

    return response;
}