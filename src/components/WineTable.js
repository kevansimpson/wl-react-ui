import React from 'react';
//import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Toolbar from '@material-ui/core/Toolbar';

import './WineTable.css';
import CreateDialog from './CreateDialog'
import EditDialog from './EditDialog'
import RemoveDialog from './RemoveDialog'

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
    fetch('/wines', {
      method: 'get',
      mode: 'cors',
      credentials: 'include'
    })
    .then(results => {
        return results.json();
    })
    .then(data => {
        if (data) {
          this.updateState(data);
        } else {
          console.log('Failed to get data')
        }
    })
    .catch(rejected => {
        console.log(rejected);
    });
  }

  updateState(data) {
    this.setState({ winelist: data });
    this.updateHeader(data);
  }

  updateHeader(data) {
    if (data) {
      var bottleCount = 0;
      var totalValue = 0;
      data.forEach(function (bottle) {
        var q = parseInt(bottle.qty);
        bottleCount += q;
        totalValue += (q * bottle.price);
      })
      this.setState({ bottleCount: bottleCount, totalCount: data.length, totalValue: totalValue.toFixed(2) });
    }
  }

  insert(newBottle) {
    console.log('Adding new bottle...');
    console.log(newBottle);
    this.loadWineData();
  }

  update(event, newValue, key, row) {
    const wl = this.state.winelist;
    const bottle = wl[row];
    console.log('Updating ' + key + ' => ' + newValue);
    bottle[key] = newValue;
    this.setState({winelist: wl});
  }

  remove(event, row) {
    const wl = this.state.winelist;
    console.log('Removing row: '+ row);
    wl.splice(row, 1);
    this.setState({winelist: wl});
  }

  filterChanged(filtered) {
    this.setState({ filtered });
    const currentRecords = this.selectTable.getResolvedState().sortedData;
    if (currentRecords && currentRecords.length > 0) {
      this.updateHeader(currentRecords);
    }
  }

  clearFilters() {
    console.log('clear filters');
    this.setState({ filtered: [] });
    this.updateHeader(this.state.winelist);
  }
//              <span>Average Value / Bottle:  {this.state.averageValue}</span>

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div className="App-bar">
              <h3>JMS Winelist</h3>
            </div>
            <div className="WT-header">
              <Toolbar>
                <span><CreateDialog callback={this.insert.bind(this)}/></span>
                <span>Collection Value:  USD {this.state.totalValue}</span>
                <span>Individual Bottle Count:  {this.state.bottleCount}</span>
                <span>Total Count:  {this.state.totalCount}</span>
              </Toolbar>
            </div>
            <ReactTable
              data={this.state.winelist}
              ref={(r) => {
                this.selectTable = r;
              }}
              filterable
              filtered={this.state.filtered}
              onFilteredChange={this.filterChanged.bind(this)}
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
              columns={[
                {
                  Header: '',
                  id: 'edit-button',
                  Cell: row => (<EditDialog row={row.index} bottle={this.state.winelist[row.index]} callback={this.update.bind(this)}/>),
                  Filter: <button onClick={this.clearFilters.bind(this)}><RemoveCircleIcon color="action"/></button>,
                  width: 50
                },
                {
                  Header: '',
                  id: 'delete-button',
                  Cell: row => (<RemoveDialog row={row.index} bottle={this.state.winelist[row.index]} callback={this.remove.bind(this)}/>),
                  Filter: <span/>, //<button onClick={()=>this.setState({ filtered: [] })}><RemoveCircleIcon color="action"/></button>,
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
