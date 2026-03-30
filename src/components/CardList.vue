<script>
import GameCard from './GameCard.vue';

export default {
    name: 'CardList',
    components: {
        GameCard
    },
    props: {
        games: {
            type: Array,
            required: true,
            default: () => []
        }
    },

}
</script>

<template>
    <div class="card-list">
        <GameCard v-for="infoGame in games" :key="infoGame.id" :game="infoGame" />
    </div>
</template>

<style>
.card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 20px;
}
</style>