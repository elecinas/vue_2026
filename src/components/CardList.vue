<script setup>
import GameCard from './GameCard.vue';

const props = defineProps({
        games: {
            type: Array,
            required: true
        }
    });

defineEmits(['edit-game']);
</script>

<template>
    <ul v-if="games.length > 0" class="card-list">
        <li v-for="infoGame in games" :key="infoGame.id" >
            <GameCard :game="infoGame" @select-game="$emit('edit-game', $event)"/>
        </li>
    </ul>
    <p v-else>No se han encontrado juegos que coincidan con la búsqueda</p>
</template>

<style scoped>
.card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 20px;
}
</style>