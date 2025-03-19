//* CSS
import "@/styles/loading.css"

export default function Loading() {
    return(
        <div className="divLoading">
            <p>Carregando...</p>
            <div className="divSpinner"/>
        </div>
    );
}