import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadUsuario(props) {
    const [formValidado, setFormValidado] = useState(false);
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                props.setListaDeUsuarios([...props.listaDeUsuarios, usuario]);
                props.setExibirTabela(true);
            }
            else{
                props.setListaDeUsuarios(props.listaDeUsuarios.map((user) => {
                    if (user.cpf !== usuario.cpf)
                        return user
                    else
                        return usuario
                }));
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    cpf: "",
                    nome: "",
                    telefone: "",
                    email: "",
                    senha: ""
                });
                props.setExibirTabela(true);
            }
        }
        else{
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor    = evento.target.value; 
        setUsuario({...usuario, [elemento]:valor});
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={fornecedor.cpf}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o CPF do usuário!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="7">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={usuario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a nome do usuário!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={usuario.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone do usuário!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="7">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="email"
                        name="email"
                        value={usuario.email}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o email do usuário!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="senha"
                        name="senha"
                        value={fornecedor.senha}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a senha do usuário!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>

    );
}