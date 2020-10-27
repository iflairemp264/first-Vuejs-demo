<template>
<div class="hello">
    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
            <label>File
                <input type="file" id="file" ref="file" @change="onFileChange('thumbnail', $event.target.files)" directory="thumbnails" />
            </label>
        </div>
    </div>
    <div>
        <hr />
        <h3>example of v-model</h3>
        <input v-model="message" placeholder="enter text" />
        <p>{{ message }}</p>
        <span v-once>This will never change becoz we use v-one directives:
            {{ message }}</span>
        <hr />
        <p>{{ rawHtml }}</p>
        <p>Using v-html directive: <span v-html="rawHtml"></span></p>
        <p v-if="isActive">Now you see me</p>
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
        <hr />
        <div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">
            <span> isActive or hasError</span>
        </div>
        <hr />
        <div>
            <h4>Conditional Rendering</h4>
            <h1 v-if="awesome">Vue is awesome!</h1>
            <h1 v-else>Oh no 😢</h1>
        </div>
        <hr />
        <div>
            <h4>List Rendering</h4>
            <ul id="example-1">
                <li v-for="item in items" :key="item.id">
                    {{ item.id }}-{{ item.message }}
                </li>

                <p>Objecdt Rendering</p>

                <li v-for="value in object" :key="value">
                    {{ value }}
                </li>
            </ul>

            <h4>Event Modifiers</h4>
            <!-- the click event's propagation will be stopped -->
            <a v-on:click.stop="doThis"></a>

            <!-- the submit event will no longer reload the page -->
            <form v-on:submit.prevent="onSubmit"></form>

            <!-- modifiers can be chained -->
            <a v-on:click.stop.prevent="doThat"></a>
            <h4>Key Modifiers</h4>

            <input v-on:keyup.13="submit">
            <h4>.exact Modifier</h4>
            <span>fire when click with ALT key Click ::::: </span>
            <button v-on:click.alt="onClick">Click me</button>
            <P>this will only fire when Ctrl and no other keys are pressed </P>
            <button v-on:click.ctrl.exact="onCtrlClick">CLICK</button>

        </div>

        <hr />
    </div>
</div>
</template>

<script>
import axios from "axios";
import S3 from "aws-s3";

//optional

export default {
    name: "HelloWorld",
    components: {},
    props: ["files", "directory"],
    data() {
        return {
            file: "",
            message: "this is txt msg",
            rawHtml: "this is raw html txt",
            isActive: false,
            hasError: true,
            awesome: false,
            items: [{
                    message: "Item1",
                    id: 1,
                },
                {
                    message: "Item 2",
                    id: 2,
                },
            ],
            object: {
                title: "How to do lists in Vue",
                author: "Jane Doe",
                publishedAt: "2016-04-10",
            },
        };
    },
    methods: {
        onClick: function () {
            alert("click call");
        },
        onCtrlClick() {
            alert(" onCtrlClick call");
        },
        evenSets: function (numbers) {
            return numbers.filter(function (number) {
                return number % 2 === 0;
            });
        },
        onFileChange(fieldName, file) {
            let f = file[0];
            // this.file = this.$refs.file.files[0];
            console.log("file::", f);
            console.log("Thumbnail:", fieldName);

            this.S3Client.uploadFile(f)
                .then((data) => console.log("data after upload file in s3::", data))
                .catch((err) => console.log("error to upload file in s3::", err));
            /**
             * {
             *   Response: {
             *     bucket: "your-bucket-name",
             *     key: "photos/image.jpg",
             *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
             *   }
             * }
             */

            // if (this.file) {
            //     this.$store
            //         .dispatch("upload/fetchSignatureAndPolicy", {
            //             name: this.file.name,
            //             type: this.file.type,
            //         })
            //         .then(() => {
            //             let policy = this.$store.state.upload.policy;
            //             var formData = new FormData();
            //             formData.append("key", policy.key);
            //             formData.append("acl", policy.acl);
            //             formData.append("Content-Type", this.file.type);
            //             formData.append(
            //                 "success_action_status",
            //                 policy.success_action_status
            //             );
            //             formData.append("policy", policy.policy);
            //             formData.append("x-amz-credential", policy["x-amz-credential"]);
            //             formData.append("x-amz-algorithm", policy["x-amz-algorithm"]);
            //             formData.append("x-amz-date", policy["x-amz-date"]);
            //             formData.append(
            //                 "x-amz-security-token",
            //                 policy["x-amz-security-token"]
            //             );
            //             formData.append("x-amz-signature", policy["x-amz-signature"]);
            //             formData.append("file", this.file);
            //             this.$store.dispatch("upload/upload", formData).then((data) => {
            //                 console.log("Data:::", data);
            //             });
            //         });
            // }
        },

        submitFile() {
            let formData = new FormData();
            formData.append("file", this.file);
            axios
                .post("/single-file", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(function () {
                    console.log("SUCCESS!!");
                })
                .catch(function () {
                    console.log("FAILURE!!");
                });
        },
        // reversedMessage: function () {
        //     return this.message.split("").reverse().join("");
        // },
    },
    computed: {
        // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split("").reverse().join("");
        },
        config() {
            return {
                bucketName: "vue-screencasts-upload",
                dirName: "thumbnails", //this.directory
                /* optional */
                region: "us-west-2",
                accessKeyId: "ANEIFNENI4324N2NIEXAMPLE", // this.$auth.user.s3_keys.id
                secretAccessKey: "cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE", // this.$auth.user.s3_keys.secret
                s3Url: "https://my-s3-url.com/", // url of bucket
                /* optional */
            };
        },

        S3Client() {
            return new S3(this.config);
        },
    },

    mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
