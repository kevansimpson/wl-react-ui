import React from 'react';
//import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import './WineTable.css';
import EditDialog from './EditDialog'
import RemoveDialog from './RemoveDialog'

const REST_URL = process.env.REST_URL || 'http://localhost:4000';
const TABLE_HEIGHT = process.env.TABLE_HEIGHT || '500px';

class WineTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winelist: [],
      averageValue: 0.0,
      bottleCount: 0,
      totalCount: 0,
      totalValue: 0.00,
      filtered: []
    };
  }

  componentDidMount() {
    this.loadWineData();
  }

  loadWineData() {
    fetch(REST_URL + '/wines', {
      method: 'get',
      mode: 'cors',
      credentials: 'include'
    })
    .then(results => {
        return results.json();
    })
    .then(data => {
        if (data) {
          var bottleCount = 0;
          var totalValue = 0;
          data.forEach(function (bottle) {
            var q = parseInt(bottle.qty);
            bottleCount += q;
            totalValue += (q * bottle.price);
          })
          this.setState({ winelist: data, bottleCount: bottleCount, totalCount: data.length, totalValue: totalValue.toFixed(2) });
        } else {
          console.log('Failed to get data')
        }
    })
    .catch(rejected => {
        console.log(rejected);
    });
  }

  update(event, newValue, key, row) {
    console.log(event);
    console.log(newValue);
    console.log(bottle);
    console.log(row);
    console.log('update foobar');
    const wl = this.state.winelist;
    const bottle = wl[row];
    console.log('Updating ' + key + ' => ' + newValue);
    bottle[key] = newValue;
//    wl[row] = bottle;
    this.setState({winelist: wl});
  }
//              <span>Average Value / Bottle:  {this.state.averageValue}</span>

  render() {
    const { data } = this.state.winelist || [];
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div>
              <AppBar title='Winelist'/>
            </div>
            <div className="WT-header">
              <span><button><AddCircleIcon/> Create Entry</button></span>
              <span>Collection Value:  USD {this.state.totalValue}</span>
              <span>Individual Bottle Count:  {this.state.bottleCount}</span>
              <span>Total Count:  {this.state.totalCount}</span>
            </div>
            <ReactTable
              data={this.state.winelist}
              filterable
              filtered={this.state.filtered}
              onFilteredChange={filtered => {this.setState({ filtered });}}
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={[
                {
                  Header: '',
                  id: 'edit-button',
                  Cell: row => (<EditDialog row={row.index} bottle={this.state.winelist[row.index]} changeFxn={this.update.bind(this)}/>),
                  Filter: <button onClick={()=>this.setState({ filtered: [] })}><RemoveCircleIcon/></button>,
                  width: 50
                },
                {
                  Header: '',
                  id: 'delete-button',
                  Cell: row => (<RemoveDialog bottle={this.state.winelist[row.index]}/>),
                  Filter: <button onClick={()=>this.setState({ filtered: [] })}><RemoveCircleIcon/></button>,
                  width: 50
                },
                {
                  Header: 'Producer',
                  id: 'producer',
                  accessor: 'producer',
                  width: 250,
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value)
                },
                {
                  Header: 'Name',
                  id: 'name',
                  width: 200,
                  accessor: d => d.name,
                  filterAll: true
                },
                {
                  Header: 'Type',
                  id: 'type',
                  width: 125,
                  accessor: d => d.type,
                  filterAll: true
                },
                {
                  Header: 'Year',
                  id: 'year',
                  width: 80,
                  accessor: d => d.year,
                  filterAll: true
                },
                {
                  Header: 'Price',
                  id: 'price',
                  width: 80,
                  accessor: d => d.price,
                  filterAll: true
                },
                {
                  Header: 'Qty',
                  id: 'qty',
                  width: 50,
                  accessor: d => d.qty,
                  filterAll: true
                },
                {
                  Header: 'Bin',
                  id: 'bin',
                  width: 150,
                  accessor: d => d.bin,
                  filterAll: true
                },
                {
                  Header: 'Ready',
                  id: 'ready',
                  accessor: d => d.ready,
                  filterAll: true
                },
                {
                  Header: 'Rating',
                  id: 'rating',
                  accessor: d => d.rating,
                  filterAll: true
                }
              ]}
              defaultPageSize={25}
              style={{
                height: TABLE_HEIGHT // This will force the table body to overflow and scroll, since there is not enough room
              }}
              className='-striped -highlight'
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default WineTable;
