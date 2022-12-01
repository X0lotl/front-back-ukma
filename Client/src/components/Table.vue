<template>
  <AddNewUser :studentList="updatedList"></AddNewUser>
  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
      <tr>
        <th v-for="field in fields" :key='field' @click="sortTable(field)">
          {{ field }}
          <i v-if="fieldThatSorded === field && isAsc" class="fa-regular fa-sort-down"></i>
          <i v-if="!isAsc" class="fa-regular fa-sort-up"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in updatedList" :key='item'>
        <td v-for="field in fields" :key='field'>
          {{item[field]}}
      </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import AddNewUser from './AddNewUser.vue';
import { ref } from 'vue';
import { sortBy } from 'lodash';
import axios from 'axios'

export default {
  name: 'TableComponent',
  components: {
    AddNewUser
  },
  props: {
    // 
    studentData: {
      type: Array,
    },
    fields: {
      type: Array,
    }
  },
  setup(props) {
    let sort = ref(false);
    let updatedList = ref([...props.studentData]);
    let fieldThatSorded = ref(props.fields[0]);
    let isAsc = true;
    const sortTable = (col) => {
      sort.value = true;

      if (col) {
        fieldThatSorded.value = col;
         isAsc = !isAsc;
      }

      let tempArray = updatedList.value;

      if (isAsc) {
        updatedList.value = sortBy(tempArray, col);
      } else {
        updatedList.value = sortBy(tempArray, col).reverse();
      }
      
    }

    return { sort, updatedList, sortTable, fieldThatSorded, isAsc};
  },
  mounted() {
    axios
      .get('http://localhost:3000/people')
      .then(res => {this.updatedList = res.data;})
      .catch(err => {console.log(err)});
  }
}

</script>