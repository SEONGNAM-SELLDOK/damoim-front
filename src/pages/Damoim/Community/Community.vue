<template>
  <div>
    <b-form class="d-sm-down-none ml-5">
      <b-form-group>
        <div>
          <label>선택 조회</label>
          <b-select style="width:300px; display: block">
            <b-select-option>option 1</b-select-option>
            <b-select-option>option 2</b-select-option>
            <b-select-option>option 3</b-select-option>
          </b-select>
        </div>
        <div>
          <label>부분 조회</label>
          <b-form-radio-group
              id="radio-group-2"
              name="radio-sub-component"
          >
            <b-form-radio value="first">Toggle this custom radio</b-form-radio>
            <b-form-radio value="second">Or toggle this other custom radio</b-form-radio>
            <b-form-radio value="third" disabled>This one is Disabled</b-form-radio>
            <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
          </b-form-radio-group>
        </div>
        <div>
          <label>텍스트 조회</label>
          <b-form-input id="search-input" placeholder="Search Dashboard" style="width:200px"/>
        </div>
        <div>
          <label>유무 조회</label>
          <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
          >
            I accept the terms and use
          </b-form-checkbox>
        </div>
        <div>
          <label>날짜 조회</label>
          <b-datepicker style="width: 140px;"></b-datepicker>
        </div>
        <button v-on:click="greet">Greet</button>
      </b-form-group>
    </b-form>
    <div class="form-style-2">
      <div class="form-style-2-heading">Provide your information</div>
      <form action="" method="post">
        <label for="field1"><span>Name <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
        <label for="field2"><span>Email <span class="required">*</span></span><input type="text" class="input-field" name="field2" value="" /></label>
        <label><span>Telephone</span><input type="text" class="tel-number-field" name="tel_no_1" value="" maxlength="4" />-<input type="text" class="tel-number-field" name="tel_no_2" value="" maxlength="4"  />-<input type="text" class="tel-number-field" name="tel_no_3" value="" maxlength="10"  /></label>
        <label for="field4"><span>Regarding</span><select name="field4" class="select-field">
          <option value="General Question">General</option>
          <option value="Advertise">Advertisement</option>
          <option value="Partnership">Partnership</option>
        </select></label>
        <label for="field5"><span>Message <span class="required">*</span></span><textarea name="field5" class="textarea-field"></textarea></label>

        <label><span> </span><input type="submit" value="Submit" /></label>
      </form>
    </div>
    <div>{{ name }}</div>
    <table class="table table-bordered table-lg mt-lg mb-0">
      <thead class="text-uppercase">
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>상시내용</th>
        <th>등록일시</th>
        <th>등록자</th>
        <th>수정일시</th>
        <th>수정자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.content }}</td>
        <td>{{ item.createdOn }}</td>
        <td>{{ item.createdBy }}</td>
        <td>{{ item.updatedOn }}</td>
        <td>{{ item.updatedBy }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import httpService from "@/service/httpService";

export default {
  name: "Community",
  methods: {
    greet: function (event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      alert('Hello ' + this.name + '!')
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        alert(event.target.tagName)
        httpService.call().then((data) => {
              // eslint-disable-next-line no-console
              console.log("incheol jung response");
              console.log(data);
              this.name = data;
            }
        )
        ;
      }
    }
  }
}
</script>

<style scoped>
.form-style-2 {
  max-width: 500px;
  padding: 20px 12px 10px 20px;
  font: 13px Arial, Helvetica, sans-serif;
}

.form-style-2-heading {
  font-weight: bold;
  font-style: italic;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
  font-size: 15px;
  padding-bottom: 3px;
}

.form-style-2 label {
  display: block;
  margin: 0px 0px 15px 0px;
}

.form-style-2 label > span {
  width: 100px;
  font-weight: bold;
  float: left;
  padding-top: 8px;
  padding-right: 5px;
}

.form-style-2 span.required {
  color: red;
}

.form-style-2 .tel-number-field {
  width: 40px;
  text-align: center;
}

.form-style-2 input.input-field, .form-style-2 .select-field {
  width: 48%;
}

.form-style-2 input.input-field,
.form-style-2 .tel-number-field,
.form-style-2 .textarea-field,
.form-style-2 .select-field {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border: 1px solid #C2C2C2;
  box-shadow: 1px 1px 4px #EBEBEB;
  -moz-box-shadow: 1px 1px 4px #EBEBEB;
  -webkit-box-shadow: 1px 1px 4px #EBEBEB;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  padding: 7px;
  outline: none;
}

.form-style-2 .input-field:focus,
.form-style-2 .tel-number-field:focus,
.form-style-2 .textarea-field:focus,
.form-style-2 .select-field:focus {
  border: 1px solid #0C0;
}

.form-style-2 .textarea-field {
  height: 100px;
  width: 55%;
}

.form-style-2 input[type=submit],
.form-style-2 input[type=button] {
  border: none;
  padding: 8px 15px 8px 15px;
  background: #FF8500;
  color: #fff;
  box-shadow: 1px 1px 4px #DADADA;
  -moz-box-shadow: 1px 1px 4px #DADADA;
  -webkit-box-shadow: 1px 1px 4px #DADADA;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
}

.form-style-2 input[type=submit]:hover,
.form-style-2 input[type=button]:hover {
  background: #EA7B00;
  color: #fff;
}

</style>
