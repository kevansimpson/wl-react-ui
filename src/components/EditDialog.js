import React from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import EditIcon from '@material-ui/icons/Edit';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wineId: props.bottle.id,
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

  handleChange(event, newValue, key) {
    this.props.changeFxn(event, newValue, key, this.props.row);
    this.props.bottle[key] = newValue;
  }

  handleSubmit(event) {
//    var data = this.state;
//    delete data["modalIsOpen"];
    console.log("Update data: " + JSON.stringify(this.props.bottle));

    fetch('/wines/' + this.state.wineId, {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify(this.props.bottle),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(function(response) {
      console.log("Update Status: " + response.status);
      if (response.ok) {
        console.log('Update successful');
      } else {
        // push error further for the next `catch`, like
        return Promise.reject(response);
      }
    })
    .catch(rejected => {
      alert('Failed Update: ' + rejected.statusText);
      console.log(rejected);
    });

    this.closeModal();
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}><EditIcon/></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Wine">

          <div>
            <MuiThemeProvider>
              <div>
                <AppBar title="Edit Entry"/>
                <div>
                  <TextField floatingLabelText="Producer" style={styleML}
                             defaultValue={this.props.bottle.producer}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'producer')} />
                  <TextField floatingLabelText="Year" style={styleML}
                             defaultValue={this.props.bottle.year}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'year')} />
                  <TextField floatingLabelText="Bin" style={styleML}
                             defaultValue={this.props.bottle.bin}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'bin')} />
                  <br/>
                  <TextField floatingLabelText="Name" style={styleML}
                             defaultValue={this.props.bottle.name}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'name')} />
                  <TextField floatingLabelText="Price" style={styleML}
                             defaultValue={this.props.bottle.price}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'price')} />
                  <TextField floatingLabelText="Ready" style={styleML}
                             defaultValue={this.props.bottle.ready}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'ready')} />
                  <br/>
                  <TextField floatingLabelText="Type" style={styleML}
                             defaultValue={this.props.bottle.type}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'type')} />
                  <TextField floatingLabelText="Quantity" style={styleML}
                             defaultValue={this.props.bottle.qty}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'qty')} />
                  <TextField floatingLabelText="Rating" style={styleML}
                             defaultValue={this.props.bottle.rating}
                             onChange={(event,newValue) => this.handleChange(event, newValue, 'rating')} />
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

export default EditDialog;
