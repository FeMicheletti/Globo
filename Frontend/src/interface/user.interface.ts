import { ReactElement } from "react";

export interface userTable {
    id: string,
    nome: string,
    email: string,
    active: ReactElement,
    role: ReactElement
}

export interface propPopupUser {
    user_id:number, 
    nome:string, 
    email:string, 
    role:string,
    active:boolean
}

export interface userPopup {
    closePopup: () => void,
    onSubmit: null | ((event: React.FormEvent, nome:string, email:string, password:string, role:string, user_id:number) => void),
    titPopup: string,
    propPopup: propPopupUser
}