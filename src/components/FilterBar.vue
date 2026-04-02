<script>
export default {
    name: "FilterBar",
    data() {
        return {
            selectedSort: 'popularity',
            selectedOrder: 'asc',
            selectedGenre: 'all',
            addedPopularity: 0,
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
    }
}
</script>

<template>
    <div class="filter">
        <div class="filter__field">
            <label for="sort" class="filter__label">Sort By:</label>
            <select v-model="selectedSort" name="sort-selection" id="sort" class="filter__select">
                <option v-for="option in sortOptions" :key="option.id" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="filter__field">
            <label for="order" class="filter__label">Order By:</label>
            <select v-model="selectedOrder" name="order-selection" id="order" class="filter__select">
                <option v-for="option in orderByOptions" :key="option.id" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="filter__field">
            <label for="genre" class="filter__label">Genre:</label>
            <select v-model="selectedGenre" name="genre-selection" id="genre" class="filter__select">
                <option v-for="option in genreOptions" :key="option.id" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="filter__field">
            <label for="popularity" class="filter__label">Popularity:</label>
            <input v-model="addedPopularity" type="range" id="popularity" name="popularity" min="0" max="100" class="filter__range">
            <span class="filter__range-value">{{ addedPopularity }}</span>
        </div>
    </div>
</template>

<style>
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