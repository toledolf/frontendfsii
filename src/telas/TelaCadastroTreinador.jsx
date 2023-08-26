import FormTreinador from "../forms/FormTreinador";
import Pagina from "../templates/pagina";
import TabelaTreinadores from "../tabelas/tabelaTreinadores";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";


export default function TelaCadastroTreinador(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [treinadores, setTreinadores] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [treinadorEmEdicao, setTreinadorEmEdicao] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
    });

    function prepararParaEdicao(treinador) {
        setModoEdicao(true);
        setTreinadorEmEdicao(treinador);
        setExibirTabela(false);

    }

    function excluirTreinador(treinador) {
        fetch(urlBase + '/treinador', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(treinador)
        }).then((resposta) => {
            window.alert('Treinador excluído com sucesso!!!')
            window.location.reload();
            return resposta.json()
        })
    }


    useEffect(()=>{
        fetch(urlBase + "/treinador", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setTreinadores(dados);
            }
            else{

            }
        })
    },[])

    return (
        <Pagina>
            <Container className="border m-3">
                <Alert variant={"secondary"} className="text-center m-3"> Cadastro de Treinadores</Alert>
            {
                exibirTabela? 
                <TabelaTreinadores  listaTreinadores={treinadores}
                                    setTreinadores={setTreinadores}
                                    exibirTabela={setExibirTabela}
                                    editarTreinador={prepararParaEdicao}
                                    deletarTreinador={excluirTreinador}/> 
                :
                <FormTreinador      listaTreinadores={treinadores}
                                    setTreinadores={setTreinadores}
                                    exibirTabela={setExibirTabela}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    treinador={treinadorEmEdicao}/>
            }
            </Container>
        </Pagina>
    );
}