"use client"

//* React
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

//* Elements
import Loading from "@/elements/Loading";
import PopupUser from "@/elements/PopupUser";
import Table from "@/elements/Table";

//* Interfaces
import { userTable } from "@/interface/user.interface";
import { propPopupUser } from "@/interface/user.interface";

//* Models
import { callAllUsers, callDeleteUser, callInsertUser, callSingleUser, callUpdateUser } from "@/model/user.model";

//* Icons
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function UsersPage() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [users, setUsers] = useState<userTable[]>([]);
	const [popupUser, setPopupUser] = useState<boolean>(false);
	const [titPopup, setTitPopup] = useState<string>("");
	const [propPopup, setPropPopup] = useState<propPopupUser>({user_id: 0, nome: "", email: "", role:"", active: true});
	const [functionToPopup, setFunctionToPopup] = useState<string>("");
	useEffect(() => { fetchUsers(); }, []);

	const tableColumns = [
		{key: "nome", name: "Nome"},
		{key: "email", name: "E-mail"},
		{key: "active", name: "Ativo"},
		{key: "role", name: "Administrador"},
	];

	const headerStyle = { 
		textAlign: "center"
	};

	const columnStyle = {
		active: {"textAlign":"center"},
		role: {"textAlign":"center"}
	};

	const rowFunction = (user_id: number) => (
		<div className="tableRowFuncion">
			<FaPencil size={20} className="iconRowFunciton" onClick={() => openPopupUpdateUser(user_id)}/>
			<MdDelete size={20} className="iconRowFunciton" onClick={() => deletUser(user_id)}/>
		</div>
	);

	async function fetchUsers() {
		const response = await callAllUsers();

		if (response.ok) {
			const result = await response.json();

			var myRowData = [];

			for (const rowData of result) {
				myRowData.push({
					id: rowData.id,
					nome: rowData.nome,
					email: rowData.email,
					active: (<div className={rowData.is_active ? "green-circle click" : "red-circle click"} onClick={() => changeActiveUser(rowData.id)} style={{cursor:"pointer"}}/>),
					role: (<div className={rowData.role == "admin" ? "green-circle" : "red-circle"}/>)
				})
			}

			setUsers(myRowData);
			setIsLoading(false);
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
			redirect("/movies");
		} else {
			const error = await response.json();
			alert(error.error);
		}
	}

	//* Abre e fecha o popup
	function togglePopupUser() { setPopupUser(!popupUser); }

	//* Criação de usuário
	function openPopupCreateUser() {
		setTitPopup("Criação de Usuário");
		setPropPopup({user_id:0, nome: "", email: "", role:"user", active: true});
		setFunctionToPopup("insert");
		togglePopupUser();
	}

	async function createUser(event:React.FormEvent, nome:string, email:string, password:string, role:string, user_id:number) {
		event.preventDefault();

		const response = await callInsertUser(nome, email, password, role);
		if (response.ok) {
			alert("Usuário criado com sucesso");
			fetchUsers();
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
			redirect("/movies");
		} else {
			const error = await response.json();
			alert(error.error);
			return;
		}
		togglePopupUser();
	}

	//* Alteração entre ativo e inativo
	async function changeActiveUser(user_id:number) {
		const myUserId = Number(localStorage.getItem("user_id"));
		if (myUserId == user_id) {
			alert("Você não pode desativar seu usuário.");
			return;
		}

		const response = await callSingleUser(user_id);
		if (response.ok) {
			const result = await response.json();
			result.is_active = (result.is_active ? false : true);

			const updateResponse = await callUpdateUser(user_id, result.nome, result.email, "", result.role, result.is_active);
			if (updateResponse.ok) {
				const newStatus = result.is_active ? "ativado" : "desativado";
				alert("Usuário "+newStatus+" com sucesso");
				fetchUsers();
			} else if (updateResponse.status == 401) {
				alert("Operação não autorizada");
				localStorage.clear();
				redirect("/movies");
			} else {
				const error = await updateResponse.json();
				alert(error.error);
			}
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
			redirect("/movies");
		} else {
			alert("Ocorreu um erro.");
		}
	}

	//* Deleção de usuário
	async function deletUser(user_id:number) {
		const myUserId = Number(localStorage.getItem("user_id"));
		if (myUserId == user_id) {
			alert("Você não pode deletar seu usuário.");
			return;
		}

		const response = await callDeleteUser(user_id);

		if (response.ok) {
			alert("Usuário deletado com sucesso");
			fetchUsers();
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
			redirect("/movies");
		} else {
			alert("Ocorreu um erro.");
		}
	}

	//* Edição de usuário
	async function openPopupUpdateUser(user_id:number) {
		const myUserId = Number(localStorage.getItem("user_id"));
		if (myUserId == user_id) {
			alert("Você não pode alterar seu usuário.")
			return;
		}

		const response = await callSingleUser(user_id);
		if (response.ok) {
			const result = await response.json();

			const toPopup = {
				user_id: result.id,
				nome: result.nome,
				email: result.email,
				role: result.role,
				active: result.is_active
			}

			setTitPopup("Atualização de Usuário");
			setPropPopup(toPopup);
			setFunctionToPopup("update");
			togglePopupUser();
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
			redirect("/movies");
		} else {
			alert("Ocorreu um erro.");
		}
	}

	async function updateUser(event:React.FormEvent, nome:string, email:string, password:string, role:string, user_id:number) {
		event.preventDefault();

		if (role == "") role = propPopup.role;
		const active = propPopup.active ? true : false;

		const response = await callUpdateUser(user_id, nome, email, password, role, active);
		if (response.ok) {
			alert("Usuário atualizado com sucesso");
			fetchUsers();
		} else if (response.status == 401) {
			alert("Operação não autorizada");
			localStorage.clear();
			redirect("/movies");
		} else {
			const error = await response.json();
			alert(error.error);
			return;
		}
		togglePopupUser();
	}

	return (
		<div>
			{!isLoading ? 
				<Table columns={tableColumns} data={users} generalHeaderStyle={headerStyle} columnStyle={columnStyle} toInsert={openPopupCreateUser} rowFunction={rowFunction}/> :
				<Loading/>
			}
			{popupUser && <PopupUser closePopup={ togglePopupUser } onSubmit={ functionToPopup == "update" ? updateUser : createUser} titPopup={titPopup} propPopup={propPopup}/> }
		</div>
	);
}