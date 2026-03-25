<script setup>
defineProps({
    source: {
        type: String,
        required: true,
    },
    alt_str: {
        type: String,
        required: true,
    },
    size_nm: {
        type: Number,
        required: false,
    }
})
</script>

<template>
    <img :alt="alt_str" class="rounded-image" :src="source" :width=size_nm :height=size_nm />
</template>

<style scoped>

.rounded-image {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {

    .rounded-image {
        margin: 0 2rem 0 0;
    }
}

</style>