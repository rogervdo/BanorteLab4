import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import './App.css';

const data = [
  { id: 1, nombre: 'Jorge Carranza', empresa: 'Tec', edad: 35, pais: 'México', contacto: 'jorge@tec.mx' },
  { id: 2, nombre: 'Ramon Velez', empresa: 'Banorte', edad: 42, pais: 'México', contacto: 'ramon@banorte.com' },
  { id: 3, nombre: 'Hugo Sanchez ', empresa: 'Real Madrid', edad: 66, pais: 'México', contacto: 'hugo@realmadrid.com' },
  { id: 4, nombre: 'Rafael Marquez', empresa: 'Barcelona', edad: 45, pais: 'México', contacto: 'rafa@barcelona.com' },
  { id: 5, nombre: 'Carlos Alcaraz', empresa: 'Mallorca', edad: 21, pais: 'España', contacto: 'carlos@atp.com' },
  { id: 6, nombre: 'N. Djokovic', empresa: 'Serbia', edad: 37, pais: 'Serbia', contacto: 'novak@atp.com' },
  { id: 7, nombre: 'Sergio Perez', empresa: 'Cadillac', edad: 34, pais: 'México', contacto: 'checo@f1.com' },
  {
    id: 8,
    nombre: 'Max Verstapen',
    empresa: 'Oracle Red Bull Racing',
    edad: 27,
    pais: 'Países Bajos',
    contacto: 'max@redbull.com',
  },
  {
    id: 9,
    nombre: 'Carlos Sainz',
    empresa: 'Williams Racing',
    edad: 30,
    pais: 'España',
    contacto: 'carlos.sainz@williams.com',
  },
];

class Manager extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: '',
      nombre: '',
      empresa: '',
      edad: '',
      pais: '',
      contacto: '',
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
      form: { id: '', nombre: '', empresa: '', edad: '', pais: '', contacto: '' },
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
      registro.id === dato.id
        ? {
            ...registro,
            nombre: dato.nombre,
            empresa: dato.empresa,
            edad: dato.edad === '' ? '' : Number(dato.edad),
            pais: dato.pais,
            contacto: dato.contacto,
          }
        : registro,
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
    valorNuevo.edad = valorNuevo.edad === '' ? '' : Number(valorNuevo.edad);
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
                <th>Edad</th>
                <th>País</th>
                <th>Contacto</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.empresa}</td>
                  <td>{dato.edad}</td>
                  <td>{dato.pais}</td>
                  <td>{dato.contacto}</td>
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
            <FormGroup>
              <label>Edad: </label>
              <input className="form-control" name="edad" type="number" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>País: </label>
              <input className="form-control" name="pais" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Contacto: </label>
              <input className="form-control" name="contacto" type="text" onChange={this.handleChange} />
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
            <FormGroup>
              <label>Edad:</label>
              <input
                className="form-control"
                name="edad"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>
            <FormGroup>
              <label>País:</label>
              <input
                className="form-control"
                name="pais"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.pais}
              />
            </FormGroup>
            <FormGroup>
              <label>Contacto:</label>
              <input
                className="form-control"
                name="contacto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.contacto}
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

export default Manager;

