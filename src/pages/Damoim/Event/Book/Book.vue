<template>
  <div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Search</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" v-model="searchFormVisible" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <form>
              <ul class="form-style-1 inline-form">
                <li class="display-inline">
                  <label>제목 </label>
                  <input type="text" v-model="search.title"/>
                </li>
                <li class="display-inline">
                  <label>내용 </label>
                  <input type="text" v-model="search.description"/>
                </li>
                <li class="display-inline">
                  <label>국제 표준 도서 번호(ISBN) </label>
                  <input type="text" v-model="search.isbn"/>
                </li>
                <li class="display-inline">
                  <label>출판사 </label>
                  <input type="text" v-model="search.publisher"/>
                </li>
                <li class="display-inline">
                  <label>주제 </label>
                  <input type="text" v-model="search.subject"/>
                </li>
                <li class="display-inline">
                  <label>태그 </label>
                  <input type="text" v-model="search.tag"/>
                </li>
                <li class="display-inline">
                  <label>등록자 </label>
                  <input type="text" v-model="search.register"/>
                </li>
                <li class="display-inline">
                  <label>모임 마감일 시작</label>
                  <input type="date" v-model="search.deadlineFrom"/>
                </li>
                <li class="display-inline">
                  <label>모임 마감일 시작</label>
                  <input type="date" v-model="search.deadlineTo"/>
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
                  <label>제목 <span class="required">*</span></label>
                  <input type="text" v-model="task.title">
                </li>
                <li>
                  <label>회사 이미지 <span class="required">*</span></label>
                  <input type="file" @change="upload">
                </li>
                <li>
                  <label>내용</label>
                  <input type="text" v-model="task.description">
                </li>
                <li>
                  <label>국제 표준 도서 번호(ISBN) <span class="required">*</span></label>
                  <input type="text" v-model="task.isbn">
                </li>
                <li>
                  <label>출판사 <span class="required">*</span></label>
                  <input type="number" v-model="task.publisher">
                </li>
                <li>
                  <label>지은이 <span class="required">*</span></label>
                  <input type="text" v-model="task.writer">
                </li>
                <li>
                  <label>주제 <span class="required">*</span></label>
                  <input type="text" v-model="task.subject">
                </li>
                <li>
                  <label>태그 <span class="required">*</span></label>
                  <input type="text" v-model="task.tag">
                </li>
                <li>
                  <label>모임 마감일 <span class="required">*</span></label>
                  <input type="date" v-model="task.deadline"/>
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
      file: null,
      loadingInstance: null,
      items: [],
      totalCount: 0,
      searchFormVisible: true,
      editFormVisible: false,
      search: {
        title: null,
        description: null,
        isbn: null,
        publisher: null,
        writer: null,
        subject: null,
        tags: [],
        register: null,
        deadlineFrom: null,
        deadlineTo: null
      },
      task: {
        id: 0,
        title: "",
        description: "",
        image: "",
        isbn: "",
        publisher: 0,
        writer: "",
        subject: "",
        tag: "",
        deadline: null,
        file: null
      },
      // page index
      pageIndex: 1,
      // page size
      pageSize: 10,
      columns: [
        {field: "id", key: "a", title: "id", align: "center"},
        {field: "title", key: "b", title: "title", align: "center"},
        {field: "description", key: "c", title: "description", align: "left"},
        {field: "image", key: "d", title: "image", align: "left"},
        {field: "isbn", key: "e", title: "isbn", width: ""},
        {field: "publisher", key: "f", title: "publisher", width: ""},
        {field: "writer", key: "g", title: "writer", width: ""},
        {field: "subject", key: "h", title: "subject", width: ""},
        {field: "tag", key: "i", title: "tag", width: ""},
        {field: "deadline", key: "j", title: "deadline", width: ""},
        {field: "createdDate", key: "k", title: "createdDate", width: ""},
        {field: "register", key: "l", title: "register", width: ""},
        {field: "modifiedDate", key: "m", title: "modifiedDate", width: ""},
        {field: "modifier", key: "n", title: "modifier", width: ""},
        {
          field: "",
          key: "l",
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
      return this.items;
    },
  },
  methods: {
    upload(event) {
      this.file = event.target.files[0];
      console.log(event);
    },
    showModal() {
      // modal.
      modal.methods.showModal();
    },
    save() {
      this.task.tags = ["test"]
      this.task.file = this.file;
      if (this.task.id == 0 || !this.task.id) {
        httpService.call('post', 'bookreviews', null, null, this.task).then((response) => {
          this.getItems();
        })
      } else {
        httpService.call('put', 'bookreviews', null, null, this.task).then((response) => {
          this.getItems();
        })
      }

    },
    show() {
      this.loadingInstance.show();

      setTimeout(() => {
        this.loadingInstance.close();
      }, 2000);
    },
    deleteRow(rowIndex) {
      httpService.call('delete', 'bookreviews/' + this.items[rowIndex].id, null, null, null).then((response) => {
        this.getItems();
      });

    },
    newRow() {
      this.editFormVisible = true;
      this.task = {}
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
          'bookreviews',
          this.pageSize,
          this.pageIndex - 1,
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
