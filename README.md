## Description

_Pull data from a Google Sheet and display it on a web page in a table._

This front-end challenge tests whether you can use `fetch` to asynchronously pull data from a Google Sheets document which is served in a JSON data format.

### **Task**

In this challenge, your task is to fetch data from a Google Sheet and place it into a [Bootstrap table](https://getbootstrap.com/docs/4.0/content/tables/).

The spreadsheet is [located HERE](https://docs.google.com/spreadsheets/d/1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE/edit?usp=sharing)

Take a moment to note the spreadsheet's contents across three tabs: **Employees, Hire Date and Salary**. Each sheet has one column except for Employees, which has First Name and Last Name columns. After the header row, all sheets have **10 rows of data**.

Before diving into the specification, here is a screen capture of the finished mini-app:

Follow link to view image: https://campus.masterschool.com/courses/306/assignments/1823?module_item_id=8250

The [endpoint google exposes is: this](https://docs.google.com/spreadsheets/d/1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE/gviz/tq?tqx=out:json&tq&gid=0)

This endpoint returns the first sheet, Employees. Accessing the other two sheets can be done by changing the **gid** number to **1574569648** or **1605451198** in the above URL.

### Deliverables

Your main goal is to write `script.js` to fetch the Google Sheets data and organize it into a standard Bootstrap table with the id `#employees`, already in `index.html` in your workspace.

There should be 4 headers: **Last, First, Hire Date** and **Salary**, in that order. These headers, the pages and the sheet format will never change.

Rows will change from the sample dataset in terms of the number of rows and the length and content of the cells, but with no format changes from the sample.

In your rendered table...

- Hire Date should be in the **MMM DD YYYY** format, for example: _Feb 22 2020_.

- Salary should be in en-US, USD format, for example: _$80,000.00_

- All columns should be sortable by clicking a header

  - **Hire Dates** should be sorted as dates,

  - **Salaries** should be sorted by numeric value, not as strings!

  - Clicking on a header multiple times should **reverse the sort**,

  - Let Bootstrap's sort logic handle tie-breaks automatically (these aren't tested extensively)

- The data should be displayed in the order it appears in the sheet by default until a user clicks on a header

### Evaluation Criteria

Your score will be based primarily on passing the Puppeteer-powered submission test cases. Beyond that, we'd like to see that your code is clean and easy to maintain.

### Resources

You may consult any documentation you wish. It's expected that a fair amount of research will be involved to familiarize yourself with setting up a Bootstrap table and using the Google Sheets endpoint. As always you should reach out to us if you have questions.
