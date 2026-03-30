<script>
export default {
    name: "SearchBox",
    data() {
        return {
            textBar: "Search games...",
            textButton: "Search"
        }
    },
    methods: {
        search(){
            console.log('busca!')
        }
    }
}
</script>

<template>
    <input class="search-box" type="text" :placeholder="textBar">
    <input type="submit" @click="search">
</template>

<style>
.search-box {
  width: 100%;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  background-color: var(--bg-dark);
  color: var(--text-light);
  font-size: 16px;
}

</style>