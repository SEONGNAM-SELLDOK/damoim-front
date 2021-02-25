<template>
  <div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Search</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <form>
              <ul class="form-style-1">
                <li>
                  <label>NO <span class="required">*</span></label>
                  <input type="text" v-model="task.name"/>
                </li>
                <li>
                  <label>DATE <span class="required">*</span></label>
                  <input type="date" v-model="task.date">
                </li>
                <li>
                  <label>HOBBY</label>
                  <input type="text" v-model="task.hobby">
                </li>
                <li>
                  <label>ADDRESS <span class="required">*</span></label>
                  <input type="text" v-model="task.address">
                </li>
                <li>
                  <input type="submit" value="Search" style="margin-right: 10px;"/>
                  <input type="button" value="cancel"/>
                </li>
              </ul>
            </form>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">Edit form</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <form>
              <ul class="form-style-1">
                <li>
                  <label>NO <span class="required">*</span></label>
                  <input type="text" v-model="task.name"/>
                </li>
                <li>
                  <label>DATE <span class="required">*</span></label>
                  <input type="date" v-model="task.date">
                </li>
                <li>
                  <label>HOBBY</label>
                  <input type="text" v-model="task.hobby">
                </li>
                <li>
                  <label>ADDRESS <span class="required">*</span></label>
                  <input type="text" v-model="task.address">
                </li>
                <li>
                  <input type="submit" value="Submit" style="margin-right: 10px;"/>
                  <input type="button" value="cancel"/>
                </li>
              </ul>
            </form>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div style="margin-top:30px;">
      <ve-table :columns="columns" :table-data="tableData" :event-custom-option="eventCustomOption"/>
      <div class="table-pagination">
        <ve-pagination
            :total="totalCount"
            :page-index="pageIndex"
            :page-size="pageSize"
            @on-page-number-change="pageNumberChange"
            @on-page-size-change="pageSizeChange"/>
      </div>
    </div>
  </div>
</template>

<style>
.table-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>

<script>
// Simulation table data from database
let DB_DATA = [];

export default {
  data() {
    return {
      task:{
        name:"",
        date:null,
        hobby:"",
        address:"",
      },
      // page index
      pageIndex: 1,
      // page size
      pageSize: 10,
      columns: [
        {
          field: "",
          key: "a",
          title: "No",
          align: "center",
          renderBodyCell: ({row, column, rowIndex}, h) => {
            return (this.pageIndex - 1) * this.pageSize + rowIndex + 1;
          },
        },
        {field: "name", key: "b", title: "Name", align: "center"},
        {field: "date", key: "c", title: "Date", align: "left"},
        {field: "hobby", key: "d", title: "Hobby", align: "left"},
        {field: "address", key: "e", title: "Address", width: ""},
      ],
      eventCustomOption: {
        bodyRowEvents: ({row, rowIndex}) => {
          return {
            click: (event) => {
              console.log("click::", row, rowIndex, event);
              this.task = row;
            },
          };
        },
      }
    }
  },
  computed: {
    // table data
    tableData() {
      const {pageIndex, pageSize} = this;
      return DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },
    // total count
    totalCount() {
      return DB_DATA.length;
    },
  },
  methods: {
    // page number change
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
    },

    // page size change
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    },

    // Simulation table data
    initDatabase() {
      DB_DATA = [];
      for (let i = 0; i < 1000; i++) {
        DB_DATA.push({
          name: "John" + i,
          date: "1900-05-20",
          hobby: "coding and coding repeat" + i,
          address: "No.1 Century Avenue, Shanghai" + i,
        });
      }
    },
  },
  created() {
    this.initDatabase();
  },
};
</script>
<style scoped>
.form-style-1 {
  max-width: 400px;
  padding: 20px 12px 10px 20px;
  font: 13px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}

.form-style-1 li {
  padding: 0;
  display: block;
  list-style: none;
  margin: 10px 0 0 0;
}

.form-style-1 label {
  margin: 0 0 3px 0;
  padding: 0px;
  display: block;
  font-weight: bold;
}

.form-style-1 input[type=text],
.form-style-1 input[type=date],
.form-style-1 input[type=datetime],
.form-style-1 input[type=number],
.form-style-1 input[type=search],
.form-style-1 input[type=time],
.form-style-1 input[type=url],
.form-style-1 input[type=email],
textarea,
select {
  width:300px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border: 1px solid #BEBEBE;
  padding: 7px;
  margin: 0px;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;
  outline: none;
}

.form-style-1 input[type=text]:focus,
.form-style-1 input[type=date]:focus,
.form-style-1 input[type=datetime]:focus,
.form-style-1 input[type=number]:focus,
.form-style-1 input[type=search]:focus,
.form-style-1 input[type=time]:focus,
.form-style-1 input[type=url]:focus,
.form-style-1 input[type=email]:focus,
.form-style-1 textarea:focus,
.form-style-1 select:focus {
  -moz-box-shadow: 0 0 8px #88D5E9;
  -webkit-box-shadow: 0 0 8px #88D5E9;
  box-shadow: 0 0 8px #88D5E9;
  border: 1px solid #88D5E9;
}

.form-style-1 .field-divided {
  width: 49%;
}

.form-style-1 .field-long {
  width: 100%;
}

.form-style-1 .field-select {
  width: 100%;
}

.form-style-1 .field-textarea {
  height: 100px;
}

.form-style-1 input[type=submit], .form-style-1 input[type=button] {
  background: #4B99AD;
  padding: 8px 15px 8px 15px;
  border: none;
  color: #fff;
}

.form-style-1 input[type=submit]:hover, .form-style-1 input[type=button]:hover {
  background: #4691A4;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

.form-style-1 .required {
  color: red;
}
</style>
