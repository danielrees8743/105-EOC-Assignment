// DON'T EDIT THOSE LINES
const dataURLBase = 'https://docs.google.com/spreadsheets/d/';
const dataURLEnd = '/gviz/tq?tqx=out:json&tq&gid=';
const id = '1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE';
const gids = ['0', '1574569648', '1605451198'];
// END OF DATA SETUP

//* Get data from Google Sheets
const getDatabaseData = async (gid) => {
  try {
    const response = await fetch(`${dataURLBase}${id}${dataURLEnd}${gid}`);
    let data = await response.text();
    data = data.substring(47, data.length - 2);
    data = JSON.parse(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

let tableData = [];

//* Get all table data
const getAllDatabaseData = async (gid) => {
  try {
    let names = await getDatabaseData(gid[0]);
    tableData.names = names;
    let hire = await getDatabaseData(gid[1]);
    tableData.hire = hire;
    let salary = await getDatabaseData(gid[2]);
    tableData.salary = salary;

    createTable(tableData);
  } catch (error) {
    console.log(error);
  }
};

//* Create table
const labelForTable = {
  last: [],
  first: [],
  salary: [],
  hire: [],
  date: [],
};

//- Get labels for the table
const createTable = (tableData) => {
  labelForTable.first = tableData.names.table.rows[0].c[0].v.replace(
    'first',
    'First'
  );
  labelForTable.last = tableData.names.table.rows[0].c[1].v.replace(
    'last',
    'Last'
  );
  labelForTable.salary = tableData.salary.table.cols[0].label.replace(
    'salary',
    'Salary'
  );
  labelForTable.hire = tableData.hire.table.cols[0].label
    .replace('hire', 'Hire')
    .replace('date', 'Date');

  //- Create table head
  let table = $('#employees');
  table.addClass('table table-striped').bootstrapTable({
    columns: [
      {
        field: 'last',
        title: labelForTable.last,
        sortable: true,
        sorter: (a, b, c, d) => {
          if (a === b) {
            a = c.first;
            b = d.first;
          }
          if (a > b) {
            return 1;
          } else {
            return -1;
          }
        },
      },
      {
        field: 'first',
        title: labelForTable.first,
        sortable: true,
      },
      {
        field: 'hire',
        title: labelForTable.hire,
        sortable: true,
        sorter: (a, b) => {
          return new Date(a).getTime() - new Date(b).getTime();
        },
        formatter: (value) => {
          return Intl.DateTimeFormat('en-EU', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }).format(value);
        },
      },
      {
        field: 'salary',
        title: labelForTable.salary,
        sortable: true,
        sorter: (a, b) => {
          return a - b;
        },
        formatter: (value) => {
          return Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
          })
            .format(value)
            .replace(',', '');
        },
      },
    ],
  });
  //* Render the table data using the data from the database
  let data = {
    last: [],
    first: [],
    salary: [],
    hire: [],
  };

  tableData.names.table.rows.map((row, index) => {
    if (row.c[1].v === 'last') {
      return data.last;
    }
    data.last.push(row.c[1].v);
    data.first.push(row.c[0].v);
  });
  tableData.salary.table.rows.map((row, index) => {
    data.salary.push(tableData.salary.table.rows[index].c[0].v);
  });
  tableData.hire.table.rows.map((row, index) => {
    row.c[0].f = Date.parse(row.c[0].f);
    data.hire.push(tableData.hire.table.rows[index].c[0].f);
  });

  data.last.map((row, index) => {
    table.bootstrapTable('append', {
      last: data.last[index],
      first: data.first[index],
      salary: data.salary[index],
      hire: data.hire[index],
    });
  });
};

getAllDatabaseData(gids);
