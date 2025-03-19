import { castInterface } from "@/interface/movie.interface";

export async function callAllMovies(filter:string):Promise<Response>  {
	var url = process.env.NEXT_PUBLIC_API_URL+"/movies";

	if (filter != "") url += "?filter="+filter;

	const tokenJWT = localStorage.getItem("token");

	var headers:any = {
		"Content-Type": "application/json"
	};

	if (tokenJWT) headers["Authorization"] = "Bearer "+tokenJWT;

	const response = await fetch(url, {
		method: "GET",
		headers: headers
	})

	return response;
}

export async function callSingleMovie(movie_id:number):Promise<Response> {
	const url = process.env.NEXT_PUBLIC_API_URL+"/movies/"+movie_id;

	const tokenJWT = localStorage.getItem("token");

	var headers:any = {
		"Content-Type": "application/json"
	};

	if (tokenJWT) headers["Authorization"] = "Bearer "+tokenJWT;

	const response = await fetch(url, {
		method: "GET",
		headers: headers
	})

	return response;
}

export async function callDeleteMovie(movie_id:number):Promise<Response> {
	const url = process.env.NEXT_PUBLIC_API_URL+"/movies/"+movie_id;

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

export async function callInsertMovie(title:string, director:string, genre:string, synopsis:string, release:number, cast:castInterface[]):Promise<Response> {
	const url = process.env.NEXT_PUBLIC_API_URL+"/movies";

	const tokenJWT = localStorage.getItem("token");

	const bodyCreate = {
		title: title,
		director: director,
		genre: genre,
		synopsis: synopsis,
		release: release,
		cast: cast
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

export async function callUpdateMovie(movie_id:number, title:string, director:string, genre:string, synopsis:string, release:number, cast:castInterface[]):Promise<Response> {
	const url = process.env.NEXT_PUBLIC_API_URL+"/movies/"+movie_id;

	const tokenJWT = localStorage.getItem("token");

	const bodyCreate = {
		title: title,
		director: director,
		genre: genre,
		synopsis: synopsis,
		release: release,
		cast: cast
	}

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Authorization": "Bearer "+tokenJWT,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(bodyCreate)
	})

	return response;
}

export async function callSetVote(movie_id:number, user_vote:number) {
	const url = process.env.NEXT_PUBLIC_API_URL+"/movies/"+movie_id+"/vote";

	const tokenJWT = localStorage.getItem("token");

	const bodyCreate = {
		vote: user_vote
	}

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Authorization": "Bearer "+tokenJWT,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(bodyCreate)
	})

	return response;
}