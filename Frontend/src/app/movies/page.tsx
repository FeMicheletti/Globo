"use client"

//* CSS
import "@/styles/movie.css"

//* React
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

//* Elements
import Table from "@/elements/Table";

//* Interfaces
import { movieTable } from "@/interface/movie.interface";

//* Models
import { callAllMovies, callDeleteMovie } from "@/model/movie.model";

//* Icons
import { IoIosStar } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Loading from "@/elements/Loading";

export default function MoviesPage() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [movies, setMovies] = useState<movieTable[]>([]);
	const [userAdm, setUserAdm] = useState<boolean>(false);
	useEffect(() => { fetchMovies(); }, []);

	const tableColumns = [
		{key: "title", name: "Título"},
		{key: "director", name: "Diretor"},
		{key: "genre", name: "Gênero"},
		{key: "release", name: "Data de Lançamento"},
		{key: "vote_average", name: "Avaliação"}
	];

	const headerStyle = { 
		textAlign: "center"
	};

	const columnStyle = {
		release: {"textAlign": "center"},
		vote_average: {"justifyContent": "center", "display": "flex"}
	}

	async function fetchMovies(filter:string = "") {
		const response = await callAllMovies(filter);

		if (response.ok) {
			const allMovies = await response.json();

			var myRowData = [];
			for (const movie of allMovies) {
				const data = new Date(movie.release);
				const dia = String(data.getDate()).padStart(2, '0');
				const mes = String(data.getMonth() + 1).padStart(2, '0');
				const ano = data.getFullYear();

				myRowData.push({
					id: movie.id,
					title: movie.title,
					director: movie.director,
					genre: movie.genre,
					release: dia+"/"+mes+"/"+ano,
					vote_average: (<div className="divAverage">{movie.vote_average}<IoIosStar size={20} style={{color:"#f5c518", marginLeft: "5px"}}/></div>)
				})
			}

			setMovies(myRowData);
			setUserAdm(localStorage.getItem("user_role") == "admin");
			setIsLoading(false);
		} else {
			const result = await response.json();
			alert(result.error);
		}
	}

	function rowFunction(movie_id: number) {
		return (
			<div className="tableRowFuncion">
				<FaSearch size={20} className="iconRowFunciton" onClick={() => redirect("/movies/"+movie_id+"?type=view")}/>
				{userAdm ? <FaPencil size={20} className="iconRowFunciton" onClick={() => redirect("/movies/"+movie_id+"?type=edit")}/> : ""}
				{userAdm ? <MdDelete size={20} className="iconRowFunciton" onClick={() => deleteMovie(movie_id)}/> : ""}
			</div>
		);
	}

	async function deleteMovie(movie_id:number) {
		const response = await callDeleteMovie(movie_id);

		if (response.ok) {
			alert("Filme deletado com sucesso.");
			fetchMovies();
		} else {
			const result = await response.json();
			alert(result.error);
		}
	}

	async function funFilter(filter:string) {
		fetchMovies(filter);
	}

	return (
		<div>
			{!isLoading ? 
				<Table columns={ tableColumns } data={ movies } generalHeaderStyle={ headerStyle } columnStyle={ columnStyle } toInsert={ userAdm ? (() => redirect("/movies/0?type=insert")) : null } rowFunction={ rowFunction } toFilter={ funFilter }/> :
				<Loading/>
			}
		</div>
	);
}