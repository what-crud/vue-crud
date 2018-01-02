<template>
    <div class="form">
        <div class="form-group">
            <label for="name">Nazwa kategorii</label>
            <input v-model="category.name" class="form-control" type="text" id="name" name="name">
        </div>
        <div class="form-group">
            <button @click="saveCategory" class="btn btn-primary">Zapisz</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                category: {
                    name:''
                }
            }
        },
        methods: {
            saveCategory() {
                this.$http.put('http://127.0.0.1:8000/api/categories/' +this.category.id, this.category)
                    .then(() => {
                        this.$router.push({path: '/categories'});
                    });
            },

            getCategory(id) {
                this.$http.get('http://127.0.0.1:8000/api/categories/'+id+'/edit')
                    .then(response => response.json())
                    .then(result => this.category = result)
            }
        },
        created:function () {
            this.getCategory(this.$route.params.categoryId);
        }
    }
</script>

<style scoped>
</style>
