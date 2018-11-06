import React from "react";
//import matchSorter from 'match-sorter';
import ReactTable from "react-table";
import "react-table/react-table.css";

const REST_URL = process.env.REST_URL || 'http://localhost:4000';

class WineTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winelist: [],
      totalCount: 0
    };
  }

//  componentWillMount() {
//    fetch(REST_URL + '/auth/login', {
//      method: 'post',
//      mode: 'cors',
//      body: JSON.stringify({ username: 'jms', password: 'cpa' }),
//      headers: new Headers({
//        'Authorization'
//        'Content-Type': 'application/json'
//      })
//    })
//    .then(results => {
//      console.log("Auth: " + results.json());
//    })
//    .catch(rejected => {
//      console.log(rejected);
//    });
//  }
  componentDidMount() {
    fetch(REST_URL + '/wines', {
      method: 'get',
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImptcyIsImlhdCI6MTU0MTM4OTAwNCwiZXhwIjoxNTQyMjUzMDA0fQ.JtZIE7I9tyx5HOnYFHSQsMNvVIEk2oLM1DI9xavoRCo',
        'Content-Type': 'application/json'
      })
    })
    .then(results => {
        return results.json();
    })
    .then(data => {
        this.setState({ winelist: data, totalCount: data.length});
    })
    .catch(rejected => {
        console.log(rejected);
    });
  }

// TOKEN  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImptcyIsImlhdCI6MTU0MDc0MzU2MiwiZXhwIjoxNTQxNjA3NTYyfQ.hosCdQzutKDdiBSofW04kA0XvujjHfjQVs_eHTXmRYA
// TOKEN  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImptcyIsImlhdCI6MTU0MDgzNjEzOCwiZXhwIjoxNTQxNzAwMTM4fQ.PoxCNIEHrkaCjRXPaCfH8MuGqWkYgnvbKuR_WHzpyFI
  render() {
    const { data } = this.state.winelist;
    return (
      <div>
        <h1>Wine List</h1>
        <div>Total Count: {this.state.totalCount}</div>
        <ReactTable
          data={this.state.winelist}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: "Producer",
              id: "producer",
              accessor: "producer",
              width: 250,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value) && row[filter.id].endsWith(filter.value)
            },
            {
              Header: "Name",
              id: "name",
              width: 200,
              accessor: d => d.name,
              filterAll: true
            },
            {
              Header: "Type",
              id: "type",
              width: 125,
              accessor: d => d.type,
              filterAll: true
            },
            {
              Header: "Year",
              id: "year",
              width: 80,
              accessor: d => d.year,
              filterAll: true
            },
            {
              Header: "Price",
              id: "price",
              width: 80,
              accessor: d => d.price,
              filterAll: true
            },
            {
              Header: "Qty",
              id: "qty",
              width: 50,
              accessor: d => d.qty,
              filterAll: true
            },
            {
              Header: "Bin",
              id: "bin",
              width: 150,
              accessor: d => d.bin,
              filterAll: true
            },
            {
              Header: "Ready",
              id: "ready",
              accessor: d => d.ready,
              filterAll: true
            },
            {
              Header: "Rating",
              id: "rating",
              accessor: d => d.rating,
              filterAll: true
            }
          ]}
          defaultPageSize={25}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default WineTable;
