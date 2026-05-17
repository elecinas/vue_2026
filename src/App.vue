<script>
import MainHeader from './components/MainHeader.vue';
import CardList from './components/CardList.vue';
import SearchBox from './components/SearchBox.vue';
import FilterBar from './components/FilterBar.vue';
import DialogModal from './components/DialogModal.vue';
import GameForm from './components/GameForm.vue';
import { useGames } from '@/composables/useGames'

export default {
    name: 'App',
    components: {
        MainHeader,
        SearchBox,
        FilterBar,
        CardList,
        DialogModal,
        GameForm
    },
    setup() {
        const { games, error, loading, getGames, addGame, updateGame, deleteGame } = useGames();
        getGames();
        return {
            apiGames: games,
            apiError: error,
            apiLoading: loading,
            addGame,
            updateGame,
            deleteGame
        }
    },
    data() {
        return {
            isModalOpen: false,
            selectedGame: null,
            currentOrder: 'asc',
            currentSort: 'popularity',
            currentGenre: 'all',
            currentPopularity: 0,
            currentSearch: '',
        }
    },
    computed: {
        genresContent() {
            if (!this.apiGames) return ['all'];
            const rawGenres = this.apiGames.flatMap(game => game.genre.map(name => name.trim().toLowerCase()));
            const uniqueGenres = [...new Set(rawGenres)].sort();

            return ['all', ...uniqueGenres]
        },
        filteredGames() {
            if (!this.apiGames) return [];
            let result = [...this.apiGames];

            //filtrado de búsqueda
            if (this.currentSearch) {
                result = result.filter(game => this.filterSearchCondition(game, this.currentSearch));
            }
            //filtrado de genero
            if (this.currentGenre !== 'all') {
                result = result.filter(game =>
                    game.genre.map(gameGenre => gameGenre.toLowerCase()).includes(this.currentGenre.toLowerCase())
                );
            }
            //filtrado de popularidad
            result = result.filter(game => game.popularity >= this.currentPopularity);
            //ordenacion
            const modifier = this.currentOrder === 'asc' ? 1 : -1;

            result.sort((a, b) => {
                if (this.currentSort === 'alphabetical') return a.title.localeCompare(b.title) * modifier;
                if (this.currentSort === 'release') return a.release_date.localeCompare(b.release_date) * modifier;
                if (this.currentSort === 'popularity') return (a.popularity - b.popularity) * modifier;
                return 0;
            });

            return result;
        }
    },
    methods: {
        closeModal() {
            this.isModalOpen = false;
            this.selectedGame = null;
        },
        add(game) {
            this.addGame(game);
            // this.games = [...this.games, game];
            this.closeModal();
        },
        update(updatedGame) {
            // this.games = this.games.map(g => g.id === updatedGame.id ? updatedGame : g);
            this.updateGame(updatedGame);
            this.closeModal();
        },
        remove(gameid) {
            // this.games = this.games.filter(g => g.id !== gameid);
            this.deleteGame(gameid)
            this.closeModal();
        },
        openModalWithGameInfo(eventGame) {
            this.selectedGame = { ...eventGame };
            this.isModalOpen = true;
        },
        openModalWithoutGameInfo() {
            this.isModalOpen = true
            this.selectedGame = null
        },
        resetFilters() {
            this.currentOrder = 'asc'
            this.currentSort = 'popularity'
            this.currentGenre = 'all'
            this.currentPopularity = 0,
                this.currentSearch = ''
        },
        filterSearchCondition(game, searchContent) {
            const str = searchContent.toLowerCase();
            const g = { ...game }
            let result;
            result = (g.title.toLowerCase().includes(str)) ||
                (g.short_description.toLowerCase().includes(str)) ||
                (g.developer.toLowerCase().includes(str)) ||
                (g.genre.join(' ').toLowerCase().includes(str)) ||
                (g.platform.join(' ').toLowerCase().includes(str))
            return result
        },
    }
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
