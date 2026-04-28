<script>
import MainHeader from './components/MainHeader.vue';
import CardList from './components/CardList.vue';
import SearchBox from './components/SearchBox.vue';
import FilterBar from './components/FilterBar.vue';
import DialogModal from './components/DialogModal.vue';
import GameForm from './components/GameForm.vue';
import { GAMES_DATA } from './data/games';

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
    data() {
        return {
            isModalOpen: false,
            selectedGame: null,
            games: GAMES_DATA,
            currentOrder: 'asc',
            currentSort: 'popularity',
            currentGenre: 'all',
            currentPopularity: 0,
            currentSearch: '',
        }
    },
    computed: {
        filteredGames() {
            return this.filterGames(this.currentSort, this.currentOrder, this.currentGenre, this.currentPopularity, this.currentSearch);
        },
        genresContent() {
            const setGenres = new Set(this.games.flatMap((g) => g.genre.map((name) => name.toLowerCase())))
            const arrayGenres = ['all', ...setGenres].sort();
            return arrayGenres
        }
    },
    methods: {
        closeModal() {
            this.isModalOpen = false;
            this.selectedGame = null;
        },
        add(game) {
            this.games.push(game);
            this.closeModal();
        },
        update(game) {
            const gameIndex = this.games.findIndex((g) => g.id === game.id);
            this.games.splice(gameIndex, 1, game);
            this.closeModal();
        },
        remove(gameid = "") {
            if (gameid) {
                const gameIndex = this.games.findIndex((game) => game.id === gameid)
                this.games.splice(gameIndex, 1);
            }
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
        filterGames(sortType, orderBy, genreName, popularity, searchContent) {
            //Modificador que determina ascendente o descendente
            const modifier = orderBy === 'asc' ? 1 : -1
            //copia del array
            let arr = [...this.games];
            //Filtra según tipo y orden
            switch (sortType) {
                case 'alphabetical':
                    arr = arr.sort((gameA, gameB) => (gameA.title.localeCompare(gameB.title)) * modifier)
                    break;
                case 'release':
                    arr = arr.sort((gameA, gameB) => (gameA.release_date.localeCompare(gameB.release_date)) * modifier)
                    break;
                case 'popularity':
                    arr = arr.sort((gameA, gameB) => (gameA.popularity - gameB.popularity) * modifier)
                    break;
                default:
                    break;
            }
            //Filtrado de Género
            if (genreName !== 'all') {
                arr = arr.filter(game => game.genre.includes(genreName.toLowerCase()));
            }
            //Filtro de popularidad
            arr = arr.filter((game) => game.popularity >= popularity)
            //Filtro de búsqueda
            if (searchContent) arr = arr.filter((game) => this.filterSearchCondition(game, searchContent))

            return arr;
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
    <main class="main-grid container">
        <div class="main-grid__top">
            <SearchBox @search="currentSearch = $event" />
            <!-- <p>{{ selectedGame }}</p> -->
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
.main-grid{
    margin-bottom: 5rem;
}
</style>
