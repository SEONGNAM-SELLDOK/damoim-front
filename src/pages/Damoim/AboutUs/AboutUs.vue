<template>
  <div>
    <div class="accordion" role="tablist">
      <modal></modal>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Search</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" v-model="searchFormVisible" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <form>
              <ul class="form-style-1 inline-form">
                <li class="display-inline">
                  <label>NO <span class="required">*</span></label>
                  <input type="text" v-model="search.name"/>
                </li>
                <li class="display-inline">
                  <label>DATE <span class="required">*</span></label>
                  <input type="date" v-model="search.date">
                </li>
                <li class="display-inline">
                  <label>HOBBY</label>
                  <input type="text" v-model="search.hobby">
                </li>
                <li class="display-inline">
                  <label>ADDRESS <span class="required">*</span></label>
                  <input type="text" v-model="search.address">
                </li>
                <li>
                  <input type="submit" value="Search" style="margin-right: 10px;" v-on:click="this.getItems"/>
                  <input type="button" value="cancel" class="grey" v-on:click="searchFormVisible = false;"/>
                </li>
              </ul>
            </form>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info" class="green">Edit</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" v-model="editFormVisible" accordion="my-accordion" role="tabpanel">
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
                  <input type="submit" value="Submit" style="margin-right: 10px;" v-on:click="this.save"/>
                  <input type="button" value="cancel" class="grey" v-on:click="editFormVisible = false;"/>
                </li>
              </ul>
            </form>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div style="margin-top:30px; text-align: right;">
      <b-button id="show-btn" @click="showModal">Open Modal</b-button>
      <b-button variant="info" style="background: #74aace; border-color: #74aace;" v-on:click="this.newRow">
        New Item
        <b-icon icon="check2-square"></b-icon>
      </b-button>
    </div>
    <div style="margin-top:10px;">
      <ve-table :columns="columns" :table-data="tableData"/>
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
import httpService from "@/service/httpService";
import modal from '@/components/Modal/Modal';
export default {
  data() {
    return {
      loadingInstance: null,
      items: [],
      totalCount: 0,
      searchFormVisible: true,
      editFormVisible: false,
      search: {
        name: "",
        date: null,
        hobby: "",
        address: "",
      },
      task: {
        name: "",
        date: null,
        hobby: "",
        address: "",
      },
      // page index
      pageIndex: 1,
      // page size
      pageSize: 15,
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
        {
          field: "",
          key: "f",
          title: "Action",
          width: "",
          center: "left",
          renderBodyCell: ({row, column, rowIndex}, h) => {
            return (
                <span>
                  <b-button variant="success" style="padding: 2px 8px" on-click={() => this.editRow(rowIndex)}>
                    Edit
                  </b-button>
                  &nbsp;
                  <b-button variant="danger" style="padding: 2px 8px" on-click={() => this.deleteRow(rowIndex)}>
                    Delete
                  </b-button>
                </span>
            );
          },
        },
      ],
    }
  },
  computed: {
    // table data
    tableData() {
      const {pageIndex, pageSize} = this;
      return this.items.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },
  },
  methods: {
    showModal() {
      // modal.
      modal.methods.showModal();
    },
    save() {
      var employee = {
        "id" : "incheol@naver.com",
        "name" : "정인철",
        "pwd" : "password",
        "profilePicUrl" : "temp"
      };

      httpService.call('post', 'members', null, null, employee).then((response) => {
        this.getItems();
      })
    },
    show() {
      this.loadingInstance.show();

      setTimeout(() => {
        this.loadingInstance.close();
      }, 2000);
    },
    deleteRow(rowIndex) {
      alert('delete : ' + rowIndex);
    },
    newRow() {
      this.editFormVisible = true;
      this.task = {
        name: "",
        date: null,
        hobby: "",
        address: "",
      }
    },
    editRow(rowIndex) {
      this.editFormVisible = true;
      this.task = this.items[rowIndex];
    },
    // page number change
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getItems();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getItems();
    },
    getItems() {
      this.show();
      httpService.call(
          'get',
          'https://api.github.com/users/mapbox',
          this.pageSize,
          this.pageIndex,
          this.search
      ).then((response) => {
        this.items = response.items;
        this.totalCount = response.totalCount;
      });
    },
  },
  created() {
    this.loadingInstance = this.$veLoading({
      fullscreen: true,
      name: "bounce",
      lock: true,
    });

    this.getItems();
  },
  mounted() {

  },
  destroyed() {
    this.loadingInstance.destroy();
  },
};
</script>

<style scoped>
.table-btn {
  padding: 2px 8px !important;
}

.form-style-1 {
  max-width: 400px;
  padding: 20px 12px 10px 20px;
  font: 13px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}

.inline-form {
  max-width: 100% !important;
}

.grey {
  background: #abbabd !important;
}

.green {
  background: #21ae8c !important;
}

.form-style-1 li {
  padding: 0;
  display: block;
  list-style: none;
  margin: 10px 0 0 0;
}

.form-style-1 li.display-inline {
  display: inline-block;
  margin-right: 20px;
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
  width: 300px;
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
