<template>
    <div class="hello">
        <select name="" id="">
            <option value="" v-for='note in notes'>{{note.full_name}}</option>
        </select>
        <div v-for='note in notes'>
            {{note.full_name}}
        </div>
        <div>
            <button @click='addNew'>Добавить заметку</button>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
// GraphQL query
    const postsQuery = gql`
  query allRepos {
    user(name: "facebook") {
      name,
      repositories(first: 5, orderby: FULL_NAME) {
        name,
        description
      }
    }
  }
`;

    export default {
        name: 'hello',
        data: () => ({
                posts: [],
                loading: 0,
                authorId: null,
            }),
        apollo: {
            // Local state 'posts' data
            posts: {
                query: postsQuery,
                loadingKey: 'loading',
            },
        },
        methods: {
            addNew() {
                this.$store.dispatch('addNote', "https://api.github.com/users/octocat/repos");
            }

        },
        computed: {
            notes() {

//                console.log(this.$store.getters.notes)
//                return this.$store.getters.notes;
                return this.posts
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
