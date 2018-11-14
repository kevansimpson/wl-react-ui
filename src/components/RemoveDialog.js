import React from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wineId: props.bottle.id,
      producer: props.bottle.producer,
      name: props.bottle.name,
      type: props.bottle.type,
      year: props.bottle.year,
      price: props.bottle.price,
      qty: props.bottle.qty,
      bin: props.bottle.bin,
      ready: props.bottle.ready,
      rating: props.bottle.rating,
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
    // references are now sync'd and can be accessed.
//    this.subtitle.style.color = '#f00';
//            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleSubmit(event) {
    var close = false;

    fetch('/wines/' + this.state.wineId, {
      method: 'delete',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(function(response) {
      console.log("Delete Status: " + response.status);
      if (response.ok) {
        console.log('Delete successful');
        close = true;
      } else {
        // push error further for the next `catch`, like
        return Promise.reject(response);
      }
    })
    .catch(rejected => {
      alert('Failed Delete: ' + rejected.statusText);
      console.log(rejected);
    });

    if (close) this.closeModal();
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}><DeleteForeverIcon/></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Delete Wine">

          <div>
            <MuiThemeProvider>
              <div>
                <AppBar title="Delete Wine"/>
                <div>
                  <table>
                    <tr><td colspan="5"><br/>Are you sure you want to delete:<br/><br/></td></tr>
                    <tr><td><b>Producer</b></td><td></td><td>{this.state.producer}</td></tr>
                    <tr><td><b>Name</b></td><td></td><td>{this.state.name}</td></tr>
                    <tr><td><b>Type</b></td><td></td><td>{this.state.type}</td></tr>
                    <tr><td><b>Year</b></td><td></td><td>{this.state.year}</td></tr>
                    <tr><td><b>Price</b></td><td></td><td>{this.state.price}</td></tr>
                    <tr><td><b>Quantity</b></td><td></td><td>{this.state.qty}</td></tr>
                    <tr><td><b>Bin</b></td><td></td><td>{this.state.bin}</td></tr>
                    <tr><td><b>Ready</b></td><td></td><td>{this.state.ready}</td></tr>
                    <tr><td><b>Rating</b></td><td></td><td>{this.state.rating}</td></tr>
                  </table>
                  <br/>
                  <RaisedButton label="Cancel" style={style} onClick={this.closeModal} />
                  <RaisedButton label="Delete" primary={true} style={style} onClick={(event) => this.handleSubmit(event)} />
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

export default RemoveDialog;
