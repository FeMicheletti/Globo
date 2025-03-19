"use client"

//* CSS
import "@/styles/login.css";

//* React
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

//* Model
import { callLogin } from "@/model/auth.model";

export default function LoginPage() {
	useEffect(() => {
		if (localStorage.getItem("token")) {
			alert("Você já está logado!");
			redirect("/movies");
		}
	}, []);

	const [loginError, setLoginError] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function tryLogin(event: React.FormEvent) {
		event.preventDefault();

		const response = await callLogin(email, password);

		if (response.ok) {
			const data = await response.json();

			if (data.token) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("user_id", data.user_id);
				localStorage.setItem("user_role", data.role);
				redirect("/movies");
			}
		}
		setLoginError(true);
	}

	return (
		<form className="loginForm" onSubmit={tryLogin}>
			<img className="loginImage" src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png" alt="Logo"/>
			<input id="emailInput" className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
			<input id="passwordInput" className="loginInput" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
			{loginError && (<label className="loginError">E-mail ou senha incorreto(s).</label>)}
			<button type="submit" className="loginButton">Entrar</button>
		</form>
	);
}