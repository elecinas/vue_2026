<script setup>
import { ref, computed } from 'vue';
import MainHeader from './components/MainHeader.vue';
import CardList from './components/CardList.vue';
import SearchBox from './components/SearchBox.vue';
import FilterBar from './components/FilterBar.vue';
import DialogModal from './components/DialogModal.vue';
import GameForm from './components/GameForm.vue';
import { useGames } from '@/composables/useGames';

const { games: apiGames, error: apiError, loading: apiLoading, getGames, addGame, updateGame, deleteGame } = useGames();

getGames();

const isModalOpen = ref(false);
const selectedGame = ref(null);
const currentOrder = ref('asc');
const currentSort = ref('popularity');
const currentGenre = ref('all');
const currentPopularity = ref(0);
const currentSearch = ref('');

const genresContent = computed(() => {
    if (!apiGames.value) return ['all'];
    const rawGenres = apiGames.value.flatMap(game => game.genre.map(name => name.trim().toLowerCase()));
    const uniqueGenres = [...new Set(rawGenres)].sort();

    return ['all', ...uniqueGenres]
});

const filteredGames = computed(() => {
    if (!apiGames.value || !apiGames.value.length) return [];
    let result = [...apiGames.value];

    //filtrado de búsqueda
    if (currentSearch.value) {
        result = result.filter(game => filterSearchCondition(game, currentSearch.value));
    }
    //filtrado de genero
    if (currentGenre.value !== 'all') {
        result = result.filter(game =>
            game.genre.map(gameGenre => gameGenre.toLowerCase()).includes(currentGenre.value.toLowerCase())
        );
    }
    //filtrado de popularidad
    result = result.filter(game => game.popularity >= currentPopularity.value);
    //ordenacion
    const modifier = currentOrder.value === 'asc' ? 1 : -1;

    result.sort((a, b) => {
        if (currentSort.value === 'alphabetical') return a.title.localeCompare(b.title) * modifier;
        if (currentSort.value === 'release') return a.release_date.localeCompare(b.release_date) * modifier;
        if (currentSort.value === 'popularity') return (a.popularity - b.popularity) * modifier;
        return 0;
    });

    return result;
});

const closeModal = () => {
    isModalOpen.value = false;
    selectedGame.value = null;
};

const add = (game) => {
    addGame(game);
    closeModal();
};

const update = (updatedGame) => {
    updateGame(updatedGame);
    closeModal();
};

const remove = (gameid) => {
    deleteGame(gameid);
    closeModal();
}

const openModalWithGameInfo = (eventGame) => {
    selectedGame.value = { ...eventGame };
    isModalOpen.value = true;
};

const openModalWithoutGameInfo = () => {
    isModalOpen.value = true;
    selectedGame.value = null;
};

const resetFilters = () => {
    currentOrder.value = 'asc';
    currentSort.value = 'popularity';
    currentGenre.value = 'all';
    currentPopularity.value = 0;
    currentSearch.value = '';
};

const filterSearchCondition = (game, searchContent) => {
    const str = searchContent.toLowerCase();
    const g = { ...game }
    let result;
    result = (g.title.toLowerCase().includes(str)) ||
        (g.short_description.toLowerCase().includes(str)) ||
        (g.developer.toLowerCase().includes(str)) ||
        (g.genre.join(' ').toLowerCase().includes(str)) ||
        (g.platform.join(' ').toLowerCase().includes(str))
    return result
}
</script>

<template>
    <MainHeader />
    <div v-if="apiLoading" class="container">
        <p>Cargando juegos...</p>
    </div>
    <div v-else-if="apiError" class="container">
        <p>{{ apiError }}</p>
    </div>
    <main class="main-grid container">
        <div class="main-grid__top">
            <SearchBox @search="currentSearch = $event" />
            <div class="buttons-container">
                <button @click="resetFilters" class="button">Reset filters</button>
                <button @click="openModalWithoutGameInfo" class="button">New game</button>
                <DialogModal v-if="isModalOpen" @close="closeModal">
                    <template v-slot:header>
                        <h5 style="margin: 0;">{{ selectedGame?.title || "New Game" }}</h5>
                    </template>
                    <template v-slot:body>
                        <GameForm @add-game="add($event)" @edit-game="update($event)" @delete-game="remove($event)"
                            :current-game="selectedGame" />
                    </template>
                </DialogModal>
            </div>
        </div>
        <FilterBar class="main-grid__filterbar" :current-order="currentOrder" :current-genre="currentGenre"
            :current-sort="currentSort" :current-popularity="currentPopularity" :all-genres="genresContent"
            @select-sort="currentSort = $event" @select-order="currentOrder = $event"
            @select-genre="currentGenre = $event" @select-popularity="currentPopularity = $event" />
        <CardList class="main-grid__cardlist" :games="filteredGames" @edit-game="openModalWithGameInfo($event)" />
    </main>
</template>

<style>
.main-grid {
    display: grid;
    grid-template-areas:
        ". top"
        "filterbar cardlist";
    grid-template-columns: 1fr 3fr;
    gap: 40px;
    padding-top: 40px;
}

.main-grid__top {
    grid-area: top;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    height: 50px;
}

.main-grid__filterbar {
    grid-area: filterbar;
}

.main-grid__cardlist {
    grid-area: cardlist;
}

/** Added styles */
.buttons-container {
    display: flex;
    gap: 1rem;
}

.buttons-container button {
    height: 100%;
}

/**Estilos añadidos */
.main-grid {
    margin-bottom: 5rem;
}
</style>
