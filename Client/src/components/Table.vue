<template>
  <div class="flex">
    <div>
      <AddNewUser :studentList="updatedList"></AddNewUser>
    </div>
    <div>
      <EditForm v-if="userToEdit" :user="userToEdit" @close="userToEdit = null"></EditForm>
    </div>
  </div>
  
  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
      <tr>
        <th v-for="field in fields" :key='field' @click="sortTable(field)">
          {{ field }}
          <i v-if="fieldThatSorded === field && isAsc" class="fa-regular fa-sort-down"></i>
          <i v-if="!isAsc" class="fa-regular fa-sort-up"></i>'
        </th>
        <th> Buttons:</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in updatedList" :key='item'>
        <td v-for="field in fields" :key='field'>
          {{ item[field] }}
        </td>
        <td>
          <button class="btn btn-success" @click="userPaid(item)"><i class="fa-solid fa-coins"></i></button>
          <button class="btn btn-warning" @click="editUser(item)"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn btn-danger" @click="deleteUser(item)"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import AddNewUser from './AddNewUser.vue';
import EditForm from './EditForm.vue'
import { ref } from 'vue';
import { sortBy } from 'lodash';
import axios from 'axios';

export default {
  name: 'TableComponent',
  components: {
    AddNewUser,
    EditForm
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
  data() {
    return {
      userToEdit: this.userToEdit
    }
  }
  ,
  setup(props) {
    let userToEdit;
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

    return { sort, updatedList, sortTable, fieldThatSorded, isAsc };
  },
  mounted() {
    axios
      .get('http://localhost:3000/people')
      .then(res => { this.updatedList = res.data; })
      .catch(err => { console.log(err) });
  },
  methods: {
    userPaid(user) {
      axios({
        method: 'post',
        url: `http://localhost:3000/person/paid?id=${user.id}`
      })
        .then(res => {
          for(let i in this.updatedList) {
            if (this.updatedList[i].id === user.id) {
              this.updatedList[i].paid_for_this_year = true;
            }
          }
        })
        .catch(err => { console.log(err) });
    },
    deleteUser(user) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/people?id=${user.id}`
      })
      .then(res => {
        let newArray = []
        for (let i in this.updatedList) {
          if (this.updatedList[i].id !== user.id) {
            newArray.push(this.updatedList[i]);
          } 
        }
        this.updatedList = newArray;
      })
      .catch(err => {console.log(err)})
    },
    editUser(user) {
      this.userToEdit = user;
    }
  }
}

</script>

<style scoped>
button {
  margin-right: 5px;
}

.flex{
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
</style>