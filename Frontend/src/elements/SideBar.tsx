"use client"

//* CSS
import "@/styles/sideBar.css"

//* React
import { redirect, usePathname } from "next/navigation";

//* Interface
import { SideBarProps } from "@/interface/sidebar.interface";

//* Models
import { callLogout } from "@/model/auth.model";

//* Icons
import { CgProfile } from "react-icons/cg";
import { MdMovie } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";

export default function SideBar({ closeSideBar, userStatus, userStatusUpdate, openProfile }: SideBarProps) {
	const myPath = usePathname();

	function redirectLogin() {
		closeSideBar();
		redirect("/login");
	}

	async function logout() {
		const user_id = Number(localStorage.getItem("user_id"));

		const response = await callLogout(user_id);

		if (response.ok) {
			localStorage.clear();
			userStatusUpdate();

			if (myPath == "/movies") {
				redirect("/");
			} else {
				redirect("/movies");
			}
		} else {
			const error = await response.json();
			alert(error.error);
		}
	}

	return (
		<div>
			{/* Usuário logado */}
			{userStatus != 0 && (
				<div className="divLoggedSB">
					<ul>
						<li className="liTitSB">
							<label>Menu</label>
						</li>
						<li className="liItemSB"  onClick={() => {closeSideBar(), openProfile()}}>
							<CgProfile size={30}/> 
							<label>Perfil</label>
						</li>
						<li className="liItemSB"  onClick={() => {closeSideBar(), redirect("/movies")}}>
							<MdMovie size={30}/>
							<label>Filmes</label>
						</li>
						{/* Usuário Administrador */}
						{userStatus == 2 && (
							<li className="liItemSB"  onClick={() => {closeSideBar(), redirect("/users")}}>
								<FaUserGroup size={30}/>
								<label>Usuários</label>
							</li>
						)}
					</ul>

					<button className="buttonLogoutSB" onClick={logout}>
						Logout
					</button>
				</div>
			)}

			{/* Usuário não logado */}
			{userStatus == 0 && (
				<div className="divLoginSB">
					<button className="buttonLoginSB" onClick={redirectLogin}>
						Login
					</button>
				</div>
			)}
		</div>
	)
}