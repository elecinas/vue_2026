<script>
import MainHeader from './components/MainHeader.vue';
import CardList from './components/CardList.vue';
import SearchBox from './components/SearchBox.vue';
import FilterBar from './components/FilterBar.vue';
import DialogModal from './components/DialogModal.vue';
import GameForm from './components/GameForm.vue';

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
            games: [
                {
                    id: 'card_1',
                    title: 'OverWatch',
                    thumbnail: 'https://static0.thegamerimages.com/wordpress/wp-content/uploads/2019/07/Tracer-overwatch-little-known-facts-featured-image.jpg',
                    short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment',
                    genre: ['Shooter'],
                    platform: ['PS3', 'Windows'],
                    developer: 'Blizzard Entertainment',
                    release_date: '2023-10-04',
                    popularity: 5
                },
                {
                    id: 'card_2',
                    title: 'Mass Effect',
                    thumbnail: 'https://imagenes.hobbyconsolas.com/files/image_1920_1080/uploads/imagenes/2025/11/13/6915a431a031b.jpeg',
                    short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment. A hero-focused first-person team shooter from Blizzard Entertainment',
                    genre: ['Shooter'],
                    platform: ['PS3', 'Windows'],
                    developer: 'Blizzard Entertainment',
                    release_date: '2022-12-04',
                    popularity: 3
                },
                {
                    id: 'card_3',
                    title: 'The last of us',
                    thumbnail: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/c988b0cc253d9f3de0b5dedb9416795a8dae1ee67d179f3d.png',
                    short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment',
                    genre: ['puzzle'],
                    platform: ['PS3', 'Windows'],
                    developer: 'Blizzard Entertainment',
                    release_date: '2022-10-04',
                    popularity: 1
                },
                {
                    id: 'card_4',
                    title: "Assassin's creed",
                    thumbnail: 'https://media.vandal.net/i/1280x720/10-2023/17/202310171411091_4.jpg',
                    short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment',
                    genre: ['shooter', 'platform', 'fighting'],
                    platform: ['PS3', 'Windows'],
                    developer: 'Blizzard Entertainment',
                    release_date: '2025-10-04',
                    popularity: 4
                },
                {
                    id: 'card_5',
                    title: 'God of war',
                    thumbnail: 'https://assetsio.gnwcdn.com/god-war-ragnarok-2799417.png',
                    short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment. A hero-focused first-person team shooter from Blizzard Entertainment',
                    genre: ['sport', 'rhythm'],
                    platform: ['PS3', 'Windows'],
                    developer: 'Blizzard Entertainment',
                    release_date: '2020-10-04',
                    popularity: 5
                }
            ]
        }
    },
    methods: {
        resetFilters() {
            console.log('Reseteará filtros');
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedGame = null;
        },
        add(game) {
            this.games.push(game);
            this.closeModal();
        }, 
        update(g) {
            const gameIndex = this.games.findIndex((game) => game.id === g.id);
            this.games.splice(gameIndex, 1, g);
            this.closeModal();
        },
        remove(gameid = ""){
            if(gameid && gameid !== ""){
                const gameIndex = this.games.findIndex((game) => game.id === gameid)
                this.games.splice(gameIndex, 1);
            }
            this.closeModal();
        },
        openModalWithGameInfo(eventGame){
            this.selectedGame = {...eventGame};
            this.isModalOpen = true;
        },
        openModalWithoutGameInfo(){
            this.isModalOpen = true
            this.selectedGame = null
        }
    }
}
</script>

<template>
    <MainHeader />
    <main class="main-grid container">
        <div class="main-grid__top">
            <SearchBox />
            <!-- <p>{{ selectedGame }}</p> -->
            <div class="buttons-container">
                <button @click="resetFilters" class="button">Reset filters</button>
                <button @click="openModalWithoutGameInfo" class="button">New game</button>
                <DialogModal v-if="isModalOpen" @close="closeModal">
                    <template v-slot:header>
                        <h5 style="margin: 0;">{{ selectedGame?.title || "New Game" }}</h5>
                    </template>
                    <template v-slot:body>
                        <GameForm 
                            @add-game="add($event)" 
                            @edit-game="update($event)" 
                            @delete-game="remove($event)" 
                            :current-game="selectedGame"
                        />
                    </template>
                </DialogModal>
            </div>
        </div>
        <FilterBar class="main-grid__filterbar" />
        <CardList  
            class="main-grid__cardlist"
            :games="games" 
            @edit-game="openModalWithGameInfo($event)"
        />
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
</style>
