<template>
    <input v-model="firstname" placeHolder="Firstname"><br>
    <input v-model="secondname" placeHolder="Secondname"><br>
    <input v-model="passport_number" placeHolder="Passport number"><br>
    <input v-model="room_number" placeHolder="Room number"><br>
    <input type="checkbox" id="paidCheckBox" v-model="paidForThisYear"><br>
    <label for="paidCheckBox">Paid for this year: {{ paidForThisYear }}</label><br>
    <button class="btn btn-success" type="submit"
        @click="addNewUserInDB(firstname, secondname, passport_number, room_number, paidForThisYear)">Submit</button>
</template>

<script>
import axios from 'axios';

export default {
    name: "addNewUser",

    data() {
        return {
            firstname: 'Test',
            secondname: 'Test',
            passport_number: '1231',
            room_number: '2',
            paidForThisYear: false
        }
    }, methods: {
        addNewUserInDB(firstname, secondname, passport_number, room_number, paid_for_this_year) {
            let id;
            axios({
                method: 'post',
                url: 'http://localhost:3000/person',
                data: {
                    "firstname": firstname,
                    "secondname": secondname,
                    "passport_number": passport_number,
                    "room_number": room_number,
                    "paid_for_this_year": paid_for_this_year
                }
            })
                .then(res => {
                    this.studentList.push({
                    "id": res.data,
                    "firstname": firstname,
                    "secondname": secondname,
                    "passport_number": passport_number,
                    "room_number": room_number,
                    "paid_for_this_year": paid_for_this_year
                });
                })
                .catch(err => console.log(err));

            
        
        }
    }, props: {
        studentList: {
            type: Array
        }
    }   
}
</script>

<style scoped>
input {
    margin: 5px !important;
}
</style>