<script>
export default {
    name: "SearchBox",
    data() {
        return {
            searchQuery: "",
         }
    }
}
</script>

<template>
    <input v-model="searchQuery" aria-label="Search games" class="search-box" type="text" placeholder="Search games...">
</template>

<style scoped>
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