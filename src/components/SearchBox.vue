<script>
export default {
    name: "SearchBox",
    data() {
        return {
            textBar: "Search games..."
        }
    }
}
</script>

<template>
    <input class="search-box" type="text" :placeholder="textBar">
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