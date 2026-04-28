<script>
export default {
    name: "SearchBox",
    emits: ['search'],
    methods: {
        handleInput(event) {
            this.$emit('search', event.target.value.trim());
        }
    }
}
</script>

<template>
    <input @input="handleInput($event)" aria-label="Search games" class="search-box" type="text"
        placeholder="Search games...">
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