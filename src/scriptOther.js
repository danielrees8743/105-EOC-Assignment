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
    console.log(error);
  }
};

//* Get the data from each table and creates the table
const table = document.querySelector('#employees');
let tableData = {};

//* Get all table data
const getAllDatabaseData = async (gid) => {
  table.classList.add('table', 'table-striped', 'table-dark', 'table-bordered');
  try {
    tableData.names = await getDatabaseData(gid[0]);
    tableData.hire = await getDatabaseData(gid[1]);
    tableData.salary = await getDatabaseData(gid[2]);

    //* Create the table head
    //* loops through each array and get the header for the table header
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const tableHeadRowData = document.createElement('th');
    tableHeadRowData.setAttribute('scope', 'col');

    const dataSet = [];
    for (const key in tableData) {
      if (tableData[key].cols === '') {
        dataSet.push(tableData[key].table.rows[0].c);
      }
      dataSet.push(tableData[key].table);
    }
    console.log(dataSet);

    for (items in tableData) {
      tableData[items].table.cols.forEach((col, i) => {
        tableHeadRowData.setAttribute(
          'data-field',
          `${tableData[items].table.rows[0].c[i].v}`
        );
        //todo: Refactor the make uppercase a function
        if (col.label === '') {
          tableHeadRowData.textContent = tableData[items].table.rows[0].c[i].v
            .split('')
            .map((letter, index) => {
              if (index === 0) {
                return letter.toUpperCase();
              } else {
                return letter;
              }
            })
            .join('');
        } else {
          tableHeadRowData.textContent = col.label
            .split('')
            .map((letter, index) => {
              if (index === 0) {
                return letter.toUpperCase();
              } else {
                return letter;
              }
            })
            .join('');
        }

        tableHeadRow.appendChild(tableHeadRowData.cloneNode(true));
        tableHead.appendChild(tableHeadRow);
        table.appendChild(tableHead);
      });
    }
    //todo: Look at refactoring all this code later!
    //* Create the table body
    //* loops through each array and get the data for the table body
    const tableBody = document.createElement('tbody');
    tableBody.setAttribute('class', 'tableBody');
    const tableBodyRow = document.createElement('tr');
    tableBodyRow.setAttribute('class', 'table-body-row');
    const tableBodyRowData = document.createElement('td');
    tableBodyRowData.setAttribute('class', 'table-data');

    for (items in tableData) {
      tableData[items].table.rows.forEach((row, i) => {
        for (let j = 0; j < row.c.length; j++) {
          tableBodyRowData.setAttribute(
            'data-field',
            `${tableData[items].table.rows[0].c[j].v}`
          );
        }
        row.c.forEach((cItem, j) => {
          tableBodyRowData.setAttribute(
            'data-field',
            `${tableData[items].table.rows[0].c[j].v}`
          );
          if (cItem.v === 'first' || cItem.v === 'last') {
            tableBodyRowData.textContent = '';
          } else {
            tableBodyRowData.textContent = cItem.v;
            tableBodyRow.appendChild(tableBodyRowData.cloneNode(true));
          }

          if (j === row.c.length - 1) {
            tableBody.appendChild(tableBodyRow.cloneNode(true));
            tableBodyRow.innerHTML = '';
          }

          if (i === tableData[cItem].table.rows.length - 1) {
            table.appendChild(tableBody);
          }
        });
      });
    }

    console.log(tableData);
  } catch (error) {
    console.log(error);
  }
};

getAllDatabaseData(gids);
