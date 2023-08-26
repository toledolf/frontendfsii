import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function FormTreinador(props) {
    const [validado, setValidado] = useState(false);
    const [treinador, setTreinador] = useState(props.treinador);
    
    function manipularMudanca(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setTreinador({ ...treinador, [id]: valor });
    }

    function manipulaSumissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                fetch(urlBase + '/treinador', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(treinador)
                }).then((resposta) => {
                    window.alert('Treinador cadastrado com sucesso!!!')
                    window.location.reload();
                    return resposta.json();
                })
            }
            else {
                fetch(urlBase + '/treinador', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(treinador)
                }).then((resp) => {
                    window.alert('Treinador Atualizado com Sucesso!!!')
                    window.location.reload();
                    return resp.json();
                })
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }
    return (
        <>
            <Form noValidate validated={validado} onSubmit={manipulaSumissao}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Insira o nome" value={treinador.nome} id="nome" onChange={manipularMudanca} required />
                            <Form.Control.Feedback type="invalid">
                                Por getileza, insira o nome do treinador!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="cpf">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text" placeholder="111.111.111-11" value={treinador.cpf} id="cpf" onChange={manipularMudanca} required />
                            <Form.Control.Feedback type="invalid">
                                Por getileza, informe o cpf!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="cpf">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="text" placeholder="email@email.com" value={treinador.email} id="email" onChange={manipularMudanca} required />
                            <Form.Control.Feedback type="invalid">
                                Por getileza, informe o e-mail!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="cpf">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="text" placeholder="(XX)XXXXX-XXXX" value={treinador.telefone} id="telefone" onChange={manipularMudanca} required />
                            <Form.Control.Feedback type="invalid">
                                Por getileza, informe o telefone!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <Button type="submit">Gravar</Button>
                        {' '}{<p></p>}
                        <Button type="button" onClick={() => {
                            props.exibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}