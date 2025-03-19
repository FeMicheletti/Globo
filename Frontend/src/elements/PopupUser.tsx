//* CSS
import "@/styles/popupUser.css";

//* React
import { useState } from "react";

//* Models
import { userPopup } from "@/interface/user.interface";

export default function PopupUser({ closePopup, onSubmit, titPopup, propPopup }:userPopup) {
    const [nome, setNome] = useState<string>(propPopup.nome);
    const [email, setEmail] = useState<string>(propPopup.email);
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>(propPopup.role);

    return(
        <div className="divOverlayPP">
            <div className="divContentPP">
                <label className="labelTitPP">{titPopup}</label>
                <form onSubmit={(event) => onSubmit ? onSubmit(event, nome, email, password, role, propPopup.user_id) : ""}>
                    <div className="divInputPP">
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required readOnly={onSubmit == null}/>
                    </div>
                    <div className="divInputPP">
                        <label>E-mail:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required readOnly={onSubmit == null}/>
                    </div>
                    {onSubmit ? 
                        <div className="divInputPP">
                            <label>Senha:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div> : ""
                    }
                    {onSubmit ? 
                        <div className="divInputPP">
                            <label>Tipo de Usuário:</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="user">Normal</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div> : ""
                    }

                    <div className="divButtonsPP">
                        {onSubmit ? <button className="buttonPP" type="submit">Salvar</button> : ""}
                        <button className="buttonPP" type="button" onClick={closePopup}>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}