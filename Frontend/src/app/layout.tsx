"use client"

//* CSS
import "./globals.css";

//* React
import { useEffect, useRef, useState } from "react";
import { redirect, usePathname } from "next/navigation";

//* Elements
import SideBar from "@/elements/SideBar";
import PopupUser from "@/elements/PopupUser";

//* Interfaces
import { LayoutProps } from "@/interface/layout.interface";
import { propPopupUser } from "@/interface/user.interface";

//* Models
import { callSingleUser } from "@/model/user.model";

//* Icons
import { FaBars } from "react-icons/fa";

export default function RootLayout({ children }: LayoutProps) {
	const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
	const [userStatus, setUserStatus] = useState<number>(0);
	const [popupProfile, setPopupProfile] = useState<boolean>(false);
	const [propPopupProfile, setPropPopupProfile] = useState<propPopupUser>({user_id: 0, nome: "", email: "", role:"", active: true});

	const path       = usePathname();
	const isLogin    = path === "/login";
	const sidebarRef = useRef<HTMLDivElement>(null); 

	async function toggleSidebar() {
		await updateUserStatus();
		setSideBarOpen(!sideBarOpen); 
	};

	async function togglePopupProfile() { 
		if (!popupProfile) {
			const myUserId = Number(localStorage.getItem("user_id"));

			const response = await callSingleUser(myUserId);
			if (response.ok) {
				const result = await response.json();

				const toPopup = {
					user_id: result.id,
					nome: result.nome,
					email: result.email,
					role: result.role,
					active: result.is_active
				}

				setPropPopupProfile(toPopup);
				setPopupProfile(true);
			} else if (response.status == 401) {
				alert("Operação não autorizada");
				localStorage.clear();
			} else {
				alert("Ocorreu um erro.");
			}
		} else {
			setPopupProfile(false); 
		}
	}

	async function updateUserStatus() {
		if (localStorage.getItem("token")) {
			const user_id = Number(localStorage.getItem("user_id"));
			const response = await callSingleUser(user_id);
			const userInfo = await response.json();
			setUserStatus(userInfo.role == "admin" ? 2 : 1);
		} else {
			setUserStatus(0);
		}
	}

	//* Adiciona o click para fechar a SideBar
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) setSideBarOpen(false);
		};

		document.addEventListener("click", handleClickOutside);

		return () => { document.removeEventListener("click", handleClickOutside); };
	});

	return (
		<html lang="pt">
			<body>
				{!isLogin && (
				<header className="headerMain">
					<img className="headerImage" src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png" alt="Logo" onClick={() => {redirect('/movies')}}/>
					<FaBars className="headerButton" size={30} onClick={toggleSidebar}/>
				</header>)}

				<div className={"sideBar"+(sideBarOpen ? " open" : "")} ref={sidebarRef}>
					<SideBar closeSideBar={ toggleSidebar } userStatusUpdate={ updateUserStatus } userStatus={ userStatus } openProfile={ togglePopupProfile }/>
				</div>

				{popupProfile && <PopupUser closePopup={ togglePopupProfile } onSubmit={null} titPopup={"Perfil"} propPopup={propPopupProfile}/> }

				<div className={".appLayout"+(sideBarOpen ? " blur" : "")}>
					<main>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}