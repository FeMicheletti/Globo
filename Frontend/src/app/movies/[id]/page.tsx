"use client"

//* CSS
import "@/styles/movie.css"

//* React
import { redirect, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

//* Elemetns
import Loading from '@/elements/Loading';
import Table from "@/elements/Table";

//* Models
import { callInsertMovie, callSetVote, callSingleMovie, callUpdateMovie } from '@/model/movie.model';

//* Icons
import { MdDelete } from "react-icons/md";
import { castInterface } from "@/interface/movie.interface";
import { IoIosStar } from "react-icons/io";
import { GrDislike, GrLike } from "react-icons/gr";

export default function UniqueMoviePage({ params }: { params: Promise<{ id: number }> }) {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const { id } = use(params);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [director, setDirector] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [synopsis, setSynopsis] = useState<string>("");
    const [release, setRelease] = useState<string>("");
    const [avarage, setAvarage] = useState<number>(0);
    const [userVote, setUserVote] = useState<number>(0);
    const [cast, setCast] = useState<castInterface[]>([]);
    const [actorName, setActorName] = useState<string>("");
    const [actorRole, setActorRole] = useState<string>("");
    const [titPage, setTitPage] = useState<string>("");
    const [isLogged, setIsLogged] = useState<string|null>();
    useEffect(() => { fetchMovie(); }, []);

    const tableColumns = [
		{key: "actor_name", name: "Nome"},
		{key: "role", name: "Papel"}
	];

    const headerStyle = { 
		textAlign: "center"
	};

    async function fetchMovie() {
        const userAdm = localStorage.getItem("user_role");

        if (userAdm != "admin" && (type === "edit" || type === "insert")) {
            alert("Você não tem autorização de realizar esta ação");
            redirect("/movies");
        }

        const isLogged = localStorage.getItem("token");
        setIsLogged(isLogged);

        if (id == 0 || type === "insert") {
            setTitPage("Criação de Filme");
        } else {
            const response = await callSingleMovie(id);

            if (response.ok) {
                const movieInfo = await response.json();

                const data = new Date(movieInfo.release);
				const dia = String(data.getDate()).padStart(2, '0');
				const mes = String(data.getMonth() + 1).padStart(2, '0');
				const ano = data.getFullYear();

                setTitle(movieInfo.title);
                setDirector(movieInfo.director);
                setGenre(movieInfo.genre);
                setSynopsis(movieInfo.synopsis);
                setRelease(ano+"-"+mes+"-"+dia);
                setAvarage(movieInfo.vote_average);
                setUserVote(movieInfo.vote_user);
                setCast(movieInfo.cast);

                if (type === "edit") {
                    setTitPage("Atualização de Filme");
                } else {
                    setTitPage("Visualização de Filme");
                }
            } else if (response.status == 401) {
                alert("Operação não autorizada");
                localStorage.clear();
                redirect("/movies");
            } else {
                const result = await response.json();
                alert(result.error);
            }
        }
        setIsLoading(false);
    }

    function rowFunction(row_id:number) {
        return(
            <div className="tableRowFuncion">
                <MdDelete size={20} className="iconRowFunciton" onClick={() => deleteCast(row_id)}/>
            </div>
        );
    }

    function addCast() {
        if (actorName && actorRole) {
            var castTemp = cast;
            const castLenght = cast.length;

            castTemp.push({
                id: castLenght, 
                actor_name: actorName, 
                role: actorRole
            });

            setCast(castTemp);
            setActorName("");
            setActorRole("");
        }
    };

    function deleteCast(row_id:number) {
        var castTemp:castInterface[] = [];
        cast.forEach((el) => { if (el.id != row_id) castTemp.push(el); });
        setCast(castTemp);
    }

    function doSomething(event:React.FormEvent, ) {
        event.preventDefault();
        if (type === "insert") {
            insertMovie();
        } else if (type === "edit") {
            updateMovie();
        }
    }

    async function insertMovie() {
        const unixTimestamp = Math.floor(new Date(release).getTime() / 1000);

		const response = await callInsertMovie(title, director, genre, synopsis, unixTimestamp, cast);
		if (response.ok) {
            const result = await response.json();
			alert("Filme criado com sucesso");
			redirect("/movies/"+result.id+"?type=view");
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
            redirect("/movies");
		} else {
			const error = await response.json();
			alert(error.error);
		}
    }

    async function updateMovie() {
        const unixTimestamp = Math.floor(new Date(release).getTime() / 1000);

		const response = await callUpdateMovie(id, title, director, genre, synopsis, unixTimestamp, cast);
		if (response.ok) {
            const result = await response.json();
			alert("Filme atualizado com sucesso");
			redirect("/movies/"+result.id+"?type=view");
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
            redirect("/movies");
		} else {
			const error = await response.json();
			alert(error.error);
		}
    }

    async function doVote(user_vote:number) {
		const response = await callSetVote(id, user_vote);
		if (response.ok) {
			alert("Voto salvo com sucesso");
            fetchMovie();
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
            redirect("/movies");
		} else {
			const error = await response.json();
			alert(error.error);
		}
    }

    return (
        <div>
            {!isLoading ?
                <form className="divContainerMovie" onSubmit={doSomething}>
                    <div className="divTitMovie">{titPage}</div>
                    <div className="divMainInformation">
                        <div>
                            <div className="divInputMovie">
                                <label>Título:</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required readOnly={type==="view"}/>
                            </div>
                            <div className="divInputMovie">
                                <label>Diretor:</label>
                                <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} required readOnly={type==="view"}/>
                            </div>
                            <div className="divInputMovie">
                                <label>Gênero:</label>
                                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required readOnly={type==="view"}/>
                            </div>
                            <div className="divInputMovie">
                                <label>Gênero:</label>
                                <input type="date" value={release} onChange={(e) => setRelease(e.target.value)} required readOnly={type==="view"}/>
                            </div>
                            <div className="divInputMovie">
                                <label>Sinopse:</label>
                                <textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} readOnly={type==="view"}/>
                            </div>
                        </div>
                        <div className="divRightInfo">
                            {type !== "view" ? 
                                <button className="buttonSave" type="submit">Salvar</button> : 
                                <fieldset className="fieldsetCast">
                                    <div className="divContainerAvarage">
                                        Avalição média: 
                                        <div className="divAverage">
                                            {avarage}
                                            <IoIosStar size={20} style={{color:"#f5c518", marginLeft: "5px"}}/>
                                        </div>
                                    </div>
                                    {isLogged &&
                                        <div className="divUserAvarage">
                                            Sua Avaliação
                                            <div className="divAverage">
                                                <GrLike size={20} className={"likeUserAvarage"+(userVote == 1 ? " green" : "")} onClick={() => doVote(1)}/>
                                                <GrDislike size={20} className={"likeUserAvarage"+(userVote == 0 ? " red" : "")} onClick={() => doVote(0)}/>
                                            </div>
                                        </div>
                                    }
                                </fieldset>
                            }
                        </div>
                    </div>

                    {type !== "view" &&
                    <div>
                        <label className="labelFieldSetCast">Adição de novo(a) Ator/Atriz</label>
                        <fieldset className="fieldsetCast">
                            <div className="divInputMovie">
                                <label>Nome:</label>
                                <input type="text" value={actorName} onChange={(e) => setActorName(e.target.value)} placeholder=""/>
                            </div>
                            <div className="divInputMovie">
                                <label>Papel:</label>
                                <input type="text" value={actorRole} onChange={(e) => setActorRole(e.target.value)} placeholder=""/>
                            </div>
                            <button className="buttonFieldsetCast" onClick={addCast} type="button">Adicionar ao Elenco</button>
                        </fieldset>
                    </div>}

                    <Table columns={tableColumns} data={cast} generalHeaderStyle={ headerStyle } style={{width:"100%"}} rowFunction={type === "edit" || type === "insert" ? rowFunction : null}/>
                </form> :
                <Loading/>
            }
        </div>
    );
}