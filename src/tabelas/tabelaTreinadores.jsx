import { useState } from "react";
import { Button, Container, FormControl, Row, Col, Table } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

  

export default function TabelaTreinadores(props) {
    //const [treinadores, setTreinadores] = useState(props.listaTreinadores);

    /*function excluirTreinador(nome) {
        const listaAtualizada = props.listaTreinadores.filter((treinador) => treinador.nome !== nome);
        props.setTreinadores(listaAtualizada);
    }*/

    function filtrarTreinadores(e) {
        const termoBusca = e.currentTarget.value;
        fetch(urlBase + "/treinador", { method: "GET" })
            .then((resposta) => {
                return resposta.json()
            })
            .then((listaTreinadores) => {
                if (Array.isArray(listaTreinadores)) {
                    const resultadoBusca = listaTreinadores.filter((treinador) => treinador.nome.toLowerCase().includes(termoBusca.toLowerCase()));
                    props.setTreinadores(resultadoBusca);
                }
            })
        const resultadoBusca = props.listaTreinadores.filter((treinador) => treinador.nome.toLowerCase().includes(termoBusca.toLowerCase()));
    }

    return (
        <Container>
            <Container className="m-3">
                <Row>
                    <Col>
                        <FormControl type="text" id="termoBusca" onChange={filtrarTreinadores} />
                    </Col>
                    <Col md-1>
                        <Button>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-search"
                                viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome do treinador</th>
                        <th>CPF</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaTreinadores?.map((treinador) => {
                            return <tr key={treinador.nome}>
                                <td>{treinador.nome}</td>
                                <td>{treinador.cpf}</td>
                                <td>{treinador.email}</td>
                                <td>{treinador.telefone}</td>
                                <td>
                                    <Button onClick={() => {
                                        props.editarTreinador(treinador)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil"
                                            viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </Button>{' '}
                                    <Button onClick={() => {
                                        if (window.confirm("Confirma a exclusão?")) {
                                            props.deletarTreinador(treinador);
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={() => {
                props.exibirTabela(false);
            }}>
                Cadastrar
            </Button>
            <p></p>
        </Container>
    );
}