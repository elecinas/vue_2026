<script>
const OPTIONS = {
    sortOptions: [
        {
            id: 'sort-1',
            label: 'Alphabetical',
            value: 'alphabetical',
        },
        {
            id: 'sort-2',
            label: 'Release date',
            value: 'release',
        },
        {
            id: 'sort-3',
            label: 'Popularity',
            value: 'popularity'
        }
    ],
    orderByOptions: [
        {
            id: 'order-1',
            label: 'Ascending',
            value: 'asc',
        },
        {
            id: 'order-2',
            label: 'Descending',
            value: 'desc',
        }],
    genreOptions: [
        {
            id: 'genre-all',
            label: 'All',
            value: 'all',
        }, {
            id: 'genre-01',
            label: 'Shooter',
            value: 'shooter',
        },
        {
            id: 'genre-02',
            label: 'Platform',
            value: 'platform',
        },
        {
            id: 'genre-03',
            label: 'Fighting',
            value: 'fighting',
        },
        {
            id: 'genre-04',
            label: 'Sports',
            value: 'sports',
        },
        {
            id: 'genre-05',
            label: 'Strategy',
            value: 'strategy',
        },
        {
            id: 'genre-06',
            label: 'Rhythm',
            value: 'rhythm',
        },
        {
            id: 'genre-07',
            label: 'Adventure',
            value: 'adventure',
        },
        {
            id: 'genre-08',
            label: 'Puzzle',
            value: 'puzzle',
        },
        {
            id: 'genre-091',
            label: 'Role-playing',
            value: 'rolePlaying',
        },
        {
            id: 'genre-10',
            label: 'Simulation',
            value: 'simulation',
        }
    ],
}
export default {
    name: "FilterBar",
    created(){
        this.OPTIONS = OPTIONS
    },
    props: {
        currentSort: String,
        currentOrder: String,
        currentGenre: String,
        currentPopularity: Number,
        allGenres: Array,
    },
    emits: ['select-sort', 'select-order', 'select-genre', 'select-popularity']
}
</script>

<template>
    <div class="filter">
        <div class="filter__field">
            <label for="sort" class="filter__label">Sort By:</label>
            <select :value="currentSort" @change="$emit('select-sort', $event.target.value)"name="sort-selection" id="sort" class="filter__select">
                <option v-for="option in OPTIONS.sortOptions" :key="option.id" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="filter__field">
            <label for="order" class="filter__label">Order By:</label>
            <select :value="currentOrder" @change="$emit('select-order', $event.target.value)" name="order-selection" id="order" class="filter__select">
                <option v-for="option in OPTIONS.orderByOptions" :key="option.id" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="filter__field">
            <label for="genre" class="filter__label">Genre:</label>
            <select :value="currentGenre" @change="$emit('select-genre', $event.target.value)" name="genre-selection" id="genre" class="filter__select">
                <option v-for="genre in allGenres" :key="genre" :value="genre">
                    {{ genre }}
                </option>
            </select>
        </div>
        <div class="filter__field">
            <label for="popularity" class="filter__label">Popularity:</label>
            <input :value="currentPopularity" @change="$emit('select-popularity', Number($event.target.value))" type="range" id="popularity" name="popularity" min="0" max="5"
                class="filter__range">
            <span class="filter__range-value">{{ currentPopularity }}</span>
        </div>
    </div>
</template>

<style scoped>
.filter {
    background-color: var(--bg-dark);
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.filter__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter__label {
    color: var(--text-light);
    font-size: 14px;
    font-weight: 600;
}

.filter__select {
    background-color: var(--bg-darker);
    color: var(--text-medium);
    border: 1px solid var(--border-dark);
    border-radius: 4px;
    padding: 10px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: border-color 0.2s;
}

.filter__select:hover {
    border-color: var(--badge-blue);
}

.filter__select:focus {
    outline: none;
    border-color: var(--badge-blue);
}

.filter__range {
    width: 100%;
    height: 6px;
    background: var(--bg-darker);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
}

.filter__range-value {
    color: var(--badge-blue);
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    display: inline-block;
    margin-top: 4px;
}
</style>