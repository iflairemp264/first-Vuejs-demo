<template>
<div>
    <h1>Home</h1>
    <p>Here is some information. This is the home page</p>

    <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
    </transition>
    <div class="row">
        <div class="col">

            <div id="list-demo">
                <button v-on:click="add">Add</button>
                <button v-on:click="remove">Remove</button>
                <transition-group name="list" tag="p">
                    <span v-for="item in items" v-bind:key="item" class="list-item">
                        {{ item }}
                    </span>
                </transition-group>
            </div>
        </div>
        <div class="col col-6">
            <div id="flip-list-demo" class="demo">
                <button v-on:click="shuffle">Shuffle</button>
                <transition-group name="flip-list" tag="ul">
                    <li v-for="item in items" v-bind:key="item" style="list-style: none;">
                        {{ item }}
                    </li>
                </transition-group>
            </div>
        </div>

    </div>
</div>
</template>

<script>
// import About from './About';
// import Contact from './Contact'
import _ from 'lodash'
export default {
    name: "Home", //this is the name of the component
    data() {
        return {
            view: "v-a",
            items: [1, 2, 3, 4, 5],
            nextNum: 6,
        };
    },
    components: {
        "v-a": {
            template: "<div>Component A</div>",
        },
        "v-b": {
            template: "<div>Component B</div>",
        },
    },
    methods: {
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length);
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++);
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1);
        },
        shuffle: function () {
            this.items = _.shuffle(this.items)
        }
    },
};
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to

/* .component-fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}

.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}

.list-enter,
.list-leave-to

/* .list-leave-active below version 2.1.8 */
    {
    opacity: 0;
    transform: translateY(30px);
}

.flip-list-move {
    transition: transform 1s;
    display: inline-block;
}
</style>
