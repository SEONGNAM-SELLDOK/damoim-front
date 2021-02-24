<template>
  <div>
    <b-form class="d-sm-down-none ml-5"  >
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
              v-model="selected"
              :aria-describedby="ariaDescribedby"
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
              v-model="status"
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
      </b-form-group>
    </b-form>
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
export default {
  name: "Community",
  data() {
    return {
      items: [
        {
          id: 0,
          title: "1년차 연봉이 궁금합니다.",
          content: "안녕하세요. 저는 구직중인 학생입니다. 회사를 지원해야 하는데요. 연봉이 어떻게 될지 궁금합니다.",
          createdOn: "2021-02-24 00:00:00",
          createdBy: "정인철",
          updatedOn: "2021-02-24 00:00:00",
          updatedBy: "정인철"
        },
        {
          id: 1,
          title: "회사 생활이 너무 힘듭니다. ",
          content: "안녕하세요. 1년차 개발자입니다. 직장 상사가 너무 괴롭힙니다.",
          createdOn: "2021-02-24 00:00:00",
          createdBy: "정인철",
          updatedOn: "2021-02-24 00:00:00",
          updatedBy: "정인철"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
