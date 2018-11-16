import React from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class CreateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producer: '',
      name: '',
      type: '',
      year: '',
      price: '0.0',
      qty: '0',
      bin: '',
      ready: '',
      rating: '',
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.setState({
        producer: '',
        name: '',
        type: '',
        year: '',
        price: '0.0',
        qty: '0',
        bin: '',
        ready: '',
        rating: '',
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleSubmit(event) {
    var data = this.state;
    delete data["modalIsOpen"];
    console.log("Create data: " + JSON.stringify(data));
    const cb = this.props.callback;
    fetch('/wines', {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(function(response) {
      console.log("Create Status: " + response.status);
      if (response.ok) {
        console.log('Create successful');
        cb(data);
      } else {
        // push error further for the next `catch`, like
        return Promise.reject(response);
      }
    })
    .catch(rejected => {
      alert('Failed Create: ' + rejected.statusText);
      console.log(rejected);
    });

    this.closeModal();
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}><AddCircleIcon color="action"/> Create Entry</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Create Wine">

          <div>
            <MuiThemeProvider>
              <div>
                <AppBar title="Create Entry"/>
                <div>
                  <TextField floatingLabelText="Producer" style={styleML}
                             value={this.state.producer}
                             onChange={(event,newValue) => this.setState({ 'producer': newValue })} />
                  <TextField floatingLabelText="Year" style={styleML}
                             value={this.state.year}
                             onChange={(event,newValue) => this.setState({ 'year': newValue })} />
                  <TextField floatingLabelText="Bin" style={styleML}
                             value={this.state.bin}
                             onChange={(event,newValue) => this.setState({ 'bin': newValue })} />
                  <br/>
                  <TextField floatingLabelText="Name" style={styleML}
                             value={this.state.name}
                             onChange={(event,newValue) => this.setState({ 'name': newValue })} />
                  <TextField floatingLabelText="Price" style={styleML}
                             value={this.state.price}
                             onChange={(event,newValue) => this.setState({ 'price': newValue })} />
                  <TextField floatingLabelText="Ready" style={styleML}
                             value={this.state.ready}
                             onChange={(event,newValue) => this.setState({ 'ready': newValue })} />
                  <br/>
                  <TextField floatingLabelText="Type" style={styleML}
                             value={this.state.type}
                             onChange={(event,newValue) => this.setState({ 'type': newValue })} />
                  <TextField floatingLabelText="Quantity" style={styleML}
                             value={this.state.qty}
                             onChange={(event,newValue) => this.setState({ 'qty': newValue })} />
                  <TextField floatingLabelText="Rating" style={styleML}
                             value={this.state.rating}
                             onChange={(event,newValue) => this.setState({ 'rating': newValue })} />
                  <br/>
                  <RaisedButton label="Cancel" style={style}
                                onClick={this.closeModal} />
                  <RaisedButton label="Save Changes" primary={true} style={style}
                                onClick={(event) => this.handleSubmit(event)} />
                </div>
              </div>
            </MuiThemeProvider>
          </div>
        </Modal>
      </div>
    );
  }
}

const style = {
  margin: 15
};

const styleML = {
  marginLeft: 15,
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default CreateDialog;
