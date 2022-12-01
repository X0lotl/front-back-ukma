<template>
    <div class="container">
        <input v-model="user.firstname" placeHolder="Firstname"><br>
        <input v-model="user.secondname" placeHolder="Secondname"><br>
        <input v-model="user.passport_number" placeHolder="Passport number"><br>
        <input v-model="user.room_number" placeHolder="Room number"><br>
        <input type="checkbox" id="paidCheckBox" v-model="user.paid_for_this_year"><br>
        <label for="paidCheckBox">Paid for this year: {{ user.paid_for_this_year }}</label><br>
        <button class="btn btn-warning" type="submit" @click="submitEditingUser(this.user)">Submit
            Editing</button>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: "EditForm",
    props: {
        user: Object
    },
     setup(props) {
        let user = props.user;
        return user;
    }, methods: {
        submitEditingUser(user) {
            axios({
                method: 'post',
                url: `http://localhost:3000/people?id=${user.id}`,
                data: {
                    "firstname": user.firstname,
                    "secondname": user.secondname,
                    "passport_number": user.passport_number,
                    "room_number": user.room_number,
                    "paid_for_this_year": user.paid_for_this_year
                }
            })
                .then(res => {
                    this.$emit('close')
                })
                .catch(err => console.log(err));
        }
    }
}

</script>

<style scoped>
input {
    margin: 5px;
}

.container {
    padding-left: 300px;
}
</style>