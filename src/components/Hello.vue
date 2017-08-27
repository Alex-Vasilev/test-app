<template>
    <div class="hello">
        <select name="" id="">
            <option value=""></option>
        </select>
        <div v-for='note in notes'>
            {{ note.text }}
        </div>
        <div>
            <button @click='addNew'>Добавить заметку</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        methods: {
            addNew() {
                this.$store.dispatch('addNote', {text: 'новая заметка'});
            }

        },
        computed: {
            notes() {
                return this.$store.getters.notes;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
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
