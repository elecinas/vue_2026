<script setup>
import MainHeader from './components/MainHeader.vue';
import CardList from './components/CardList.vue';
import SearchBox from './components/SearchBox.vue';
import FilterBar from './components/FilterBar.vue';

const games = [
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

const resetFilters = () => {
    //TODO
    console.log('Reseteará filtros')
}
</script>

<template>
    <MainHeader />
    <main class="main-grid container">
        <div class="main-grid__top search-button-container">
            <SearchBox />
            <button @click="resetFilters" class="button">Reset filters</button>
        </div>     
        <FilterBar class="main-grid__filterbar" />
        <CardList :games=games class="main-grid__cardlist" />
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
.search-button-container{

}
</style>
