<template>
<div>
    <nav>
        <router-link class="spacing" v-for="routes in links" v-bind:key="routes.id" :to="`${routes.page}`">{{ routes.text }}</router-link>
    </nav>
</div>
</template>

<script>
export default {
    name: "Navigation",
    data() {
        return {
            links: [{
                    id: 0,
                    text: "Hello World",
                    page: "/HelloWorld",
                },
                {
                    id: 1,
                    text: "Home",
                    page: "/Home",
                },
                {
                    id: 2,
                    text: "About",
                    page: "/About",
                },
                {
                    id: 3,
                    text: "Contact",
                    page: "/Contact",
                }, {
                    id: 4,
                    text: "Form",
                    page: "/form",
                }, {
                    id: 5,
                    text: "Todo",
                    page: "/todo",
                },
            ],
        };
    },
};
</script>

<style>
.spacing {
    margin-right: 10px;
}
</style>
