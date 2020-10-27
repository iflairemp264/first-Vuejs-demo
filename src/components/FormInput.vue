<template>
<div>
    <h1>Form</h1>
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    <hr />
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
    <p></p>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span>Checked names: {{ checkedNames }}</span>
    <p></p>
    <input v-model.number="age" type="number"><br />
    <input v-model.trim="msg">
    <p>{{msg | capitalize}}</p>
    <hr />
    <button type="submit">
        <slot>Submit</slot>
    </button>
    <hr />

</div>
</template>

<script>
export default {
    name: 'FormInput',
    components: {},
    data() {
        return {
            message: '',
            checked: false,
            checkedNames: [],
            msg: ''
        }
    },
    computed: {

    },
    methods: {

    },
    mounted: {

    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.toUpperCase()
        }
    }
}
</script>

<style scoped>

</style>
