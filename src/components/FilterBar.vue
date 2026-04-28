<script>
import { SORT_OPTIONS, ORDER_OPTIONS } from '@/data/filterOptions';

export default {
    name: "FilterBar",
    created(){
        this.SORT_OPTIONS = SORT_OPTIONS,
        this.ORDER_OPTIONS = ORDER_OPTIONS
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
                <option v-for="option in SORT_OPTIONS" :key="option.id" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="filter__field">
            <label for="order" class="filter__label">Order By:</label>
            <select :value="currentOrder" @change="$emit('select-order', $event.target.value)" name="order-selection" id="order" class="filter__select">
                <option v-for="option in ORDER_OPTIONS" :key="option.id" :value="option.value">
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