<template>
  <div class="container text-center  mt-5 mb-5">

    <h1 class="mt-5 fw-bolder text-success "> Students in campus Database </h1>
    <div class="table-responsive my-5">
      <Table :fields='fields' :studentData="studentData"></Table>
    </div>
    <button class="btn btn-danger">New year!</button>
  </div>
</template>
<script>
import Table from './components/Table.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Table,
  },
  setup() {
    let studentData = [];
    const fields = [
      'id', 'firstname', 'secondname', 'passport_number', 'room_number', 'paid_for_this_year'
    ]
    axios
      .get('http://localhost:3000/people')
      .then(res => { studentData = res.data; return { studentData, fields } })
      .catch(err => { console.log(err) });

    return { studentData, fields }
  }, methods() {

  }
}
</script>