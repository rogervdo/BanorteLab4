import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import './App.css';

const data = [
  { id: 1, nombre: 'Jorge Carranza', empresa: 'Tec' },
  { id: 2, nombre: 'Ramon Velez', empresa: 'Banorte' },
  { id: 3, nombre: 'Hugo Sanchez ', empresa: 'Real Madrid' },
  { id: 4, nombre: 'Rafael Marquez', empresa: 'Barcelona' },
  { id: 5, nombre: 'Carlos Alcaraz', empresa: 'Mallorca' },
  { id: 6, nombre: 'N. Djokovic', empresa: 'Serbia' },
  { id: 7, nombre: 'Sergio Perez', empresa: 'Cadillac' },
  { id: 8, nombre: 'Max Verstapen', empresa: 'Oracle Red Bull Racing' },
  { id: 9, nombre: 'Carlos Sainz', empresa: 'Williams Racing' },
];

class Usuarios extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: '',
      nombre: '',
      empresa: '',
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: { id: '', nombre: '', empresa: '' },
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  editar = (dato) => {
    const arreglo = this.state.data.map((registro) =>
      registro.id === dato.id ? { ...registro, nombre: dato.nombre, empresa: dato.empresa } : registro,
    );
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    const opcion = window.confirm('Estás Seguro que deseas Eliminar el elemento ' + dato.id);
    if (opcion === true) {
      const arreglo = this.state.data.filter((registro) => registro.id !== dato.id);
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    const lista = [...this.state.data, valorNuevo];
    this.setState({ modalInsertar: false, data: lista });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.empresa}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>
                      Editar
                    </Button>{' '}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar nombre</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id: </label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>
            <FormGroup>
              <label>Nombre: </label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Empresa: </label>
              <input className="form-control" name="empresa" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Usuarios;

