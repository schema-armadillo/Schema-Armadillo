import React, { Component } from 'react';
import '.././styles/Dashboard.css';
import KeyValue from './KeyValue';
import schemaGenerator from '../../utils/modelCodeMaker2';
const url = require('url')

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      schema: {
        schemaName: '',
        rows: [
          {
            key: '',
            type: '',
            options: {
              required: false,
              unique: false
            }
          }
        ]
      }
    };

    this.handleSchemaName = this.handleSchemaName.bind(this);
    this.createRow = this.createRow.bind(this);
    this.handleCreateSchema = this.handleCreateSchema.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleChangeRequired = this.handleChangeRequired.bind(this);
    this.handleChangeUnique = this.handleChangeUnique.bind(this);
    this.handleChangeKey = this.handleChangeKey.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleSaveSchema = this.handleSaveSchema.bind(this);
    this.handleCopySchema = this.handleCopySchema.bind(this);
    this.getSchema = this.getSchema.bind(this);
  }
  handleCopySchema() {
    // console.log('Dashboard.js => handleCopySchema => this.state.result', this.state.result)
    // create a fake element
    // don't display it on page
    // need textarea to copy to clipboard
    let copyText = document.createElement('textarea');
    copyText.value = this.state.result;
    document.body.appendChild(copyText);
    // console.log('Dashboard => handleCopySchema => copyText', copyText);

    copyText.select();
    document.execCommand('copy');
    copyText.setAttribute('id', 'hideThis');

    // show message to the client
    let clipboardMessage = document.querySelector('.clipboard-message');
    clipboardMessage.innerText = 'Copied';
    clipboardMessage.style.display = 'block';
    setTimeout(() => {
      clipboardMessage.style.display = 'none';
    }, 650);

  }

  handleSaveSchema() {
    fetch('/api/schema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.schema)
    })
      .then(data => data.json())
      .then(result => {
        console.log('save schema result ', result)
        let stateCopy = Object.assign(this.state.schema, {});
        stateCopy.rows = [
          {
            key: '',
            type: '',
            options: {
              required: false,
              unique: false
            }
          }
        ];
        stateCopy.schemaName = '';
        this.setState({ schema: stateCopy })
        this.props.getUserSchemaArr([{
          schema_id: result.schema_id, schema_name: result.schema_name, user_id: result.user_id
        }])
      })


  }

  getSchema(user_id, schema_id) {
    console.log('getSchema Dashboard user_id, schema_id ', user_id, schema_id)
    const url = '/api/schema/one?user_id=' + user_id + '&schema_id=' + schema_id;
    fetch(url)
      .then(data => data.json())
      .then(result => {
        console.log('result from getSchema in dashboard ', result)
        let stateCopy = Object.assign(this.state.schema, {})
        console.log('stateCopy ', stateCopy)
        stateCopy.rows = [];
        result.forEach(el => {
          console.log('el ', el)
          stateCopy.schemaName = el.schema_name
          stateCopy.rows.push({
            key: el.key,
            type: el.type,
            options: {
              required: el.required_check,
              unique: el.unique_check
            }
          })
        })
        this.setState({ schema: stateCopy })
      })
  }

  handleCreateSchema(state) {
    // check if schemaname is filled out
    if (this.state.schema.schemaName.trim() === '') {
      return this.setState({ result: 'Enter a schema name' });
    }

    let rows = this.state.schema.rows;
    for (let i = 0; i < rows.length; i += 1) {
      // check if key or type is empty
      if (rows[i].key.trim() === '')
        return this.setState({ result: 'Assign name for all keys' });
      if (rows[i].type.trim() === '')
        return this.setState({ result: 'Select type for all keys' });
    }

    let result = schemaGenerator(state);
    this.setState({ result });
    event.preventDefault();
  }

  handleSchemaName(event) {
    let schema = Object.assign({}, this.state.schema);
    schema.schemaName = event.target.value;
    this.setState({ schema });
  }

  createRow() {
    let schema = Object.assign({}, this.state.schema);
    let { rows } = schema;
    // console.log('Dashboard => createRow => this.state.schema.rows', rows);
    rows.push({
      key: '',
      type: '',
      options: {
        required: false
      }
    });
    this.setState({ schema });
  }

  deleteRow(rowIndex) {
    let schema = Object.assign({}, this.state.schema);
    let { rows } = schema;
    schema.rows = rows.filter((el, index) => {
      if (index === rowIndex) return false;
      return true;
    });
    // console.log('Dashboard => deleteRow => rows', rows);
    this.setState({ schema });
  }

  updateRow(key, type, required) {
    let schema = Object.assign({}, this.state.schema);
    let { rows } = schema;
    // console.log('Dashboard => updateRow => this.state.schema.rows', rows);

    rows[rows.length - 1] = {
      key,
      type,
      required
    };
    this.setState({ schema });
  }

  handleChangeRequired(event, rowIndex) {
    let schema = Object.assign({}, this.state.schema);
    let { rows } = schema;
    // console.log(
    //   'Dashboard => handleChangeRequired => event.target',
    //   event.target.checked
    // );
    rows[rowIndex].options.required = event.target.checked;
    return this.setState({ schema });
  }

  handleChangeUnique(event, rowIndex) {
    let schema = Object.assign({}, this.state.schema);
    let { rows } = schema;
    // console.log(
    //   'Dashboard => handleChangeUnique => event.target',
    //   event.target.checked
    // );
    rows[rowIndex].options.unique = event.target.checked;
    return this.setState({ schema });
  }

  handleChangeKey(event, rowIndex) {
    let schema = Object.assign({}, this.state.schema);
    let { rows } = schema;
    rows[rowIndex].key = event.target.value;
    return this.setState({ schema });
  }

  handleChangeType(selectedOption, rowIndex) {
    let schema = Object.assign({}, this.state.schema);
    let { rows } = schema;

    // clicking the 'x' button when nothing is in the dropdown box gives an error
    // to mitigate the error, if selectedOption is null, assign it to an empty string
    if (selectedOption === null) {
      selectedOption = '';
    }
    rows[rowIndex].type = selectedOption.label;
    return this.setState({ schema });
    // console.log(`Option selected:`, selectedOption.label);
  }


  render() {
    let rows = [];
    for (let i = 0; i < this.state.schema.rows.length; i++) {
      rows.push(
        <KeyValue
          key={'row' + i}
          rowIndex={i}
          deleteRow={this.deleteRow}
          handleChangeRequired={this.handleChangeRequired}
          handleChangeUnique={this.handleChangeUnique}
          handleChangeKey={this.handleChangeKey}
          handleChangeType={this.handleChangeType}
          rowData={this.state.schema.rows[i]}
        />
      );
    }

    let schemaButtons = [];
    schemaButtons = this.props.userSchemaArr.map(el => {
      console.log('el ', el)
      return (<button onClick={() => this.getSchema(el.user_id, el.schema_id)}>{el.schema_name}</button>)
    })

    return (
      <div>
        <div className='schemaName'>
          <input
            type='text'
            value='Schema Name'
            placeholder='Schema Name'
            value={this.state.schema.schemaName}
            onChange={this.handleSchemaName}
          />
          <br />
        </div>
        <div className='container'>
          {/* ADDED TABLE HEADS - SHOULD BE STYLED */}
          <div className='headers'>
            <p>Key</p>
            <p>Type</p>
            <p>Required</p>
            <p>Unique</p>
            <p>Delete</p>
          </div>
          <br />
          <div className='form'>{rows}</div>
          <div className='optionsKey'>
            {schemaButtons}
          </div>
          <div className="buttons">
            <button
              className='submit'
              onClick={() => this.handleCreateSchema(this.state.schema)}
            >
              Create Schema
            </button>
            <button className='createrow' onClick={this.createRow}>
              Add a New Key
            </button>
          </div>
        </div>
        <button className='saveButton' onClick={this.handleSaveSchema}>
          Save
        </button>
        <pre onClick={this.handleCopySchema}>
          <code>{this.state.result}</code>
        </pre>
        <div className='clipboard-message' />
      </div>
    );
  }
}

export default Dashboard;

