import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Menu(props){

    return (
        <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to ="/"><Navbar.Brand>Inicio</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              
              <LinkContainer to="/FormUsuario"><NavDropdown.Item>Usuários</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormTime"><NavDropdown.Item>Times</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormTreinador"><NavDropdown.Item>Treinadores</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
            
              
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/"> Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}