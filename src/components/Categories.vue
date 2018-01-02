<template>
    <div>
        <router-link to="/categories/add" class="btn btn-success">Dodaj</router-link>
        <table class="table table-hover">
            <tr>
                <th>Id</th>
                <th>Nazwa</th>
                <th>Edycja</th>
                <th>Usun</th>
            </tr>
            <tr v-for="category in categories">
                <td>{{category.id}}</td>
                <td>{{category.name}}</td>
                <td><router-link v-bind:to="'/categories/'+category.id+'/edit'" class="btn btn-success">Edytuj</router-link></td>
                <td><button @click="deleteCategory(category.id)" class="btn btn-danger">Usuń</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                categories: []            }
        },
        methods: {
            fetchCategories() {
                this.$http.get('http://127.0.0.1:8000/api/categories')
                    .then(response => response.json())
                    .then(result => this.categories = result)
            },
            deleteCategory(id) {
                this.$http.delete('http://127.0.0.1:8000/api/categories/'+id)
                    .then(() => {
                        this.fetchCategories();
                    });
            }
        },
        created: function () {
            this.fetchCategories();
        }
    }
</script>

<style scoped>
</style>
