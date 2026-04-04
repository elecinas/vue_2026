<script>
export default {
  name: "GameCard",
  data() {
    return {};
  },
  props: {
    game: {
      type: Object,
      required: true,
      default: () => ({
        id: "",
        title: "",
        thumbnail: "",
        short_description: "",
        genre: [],
        platform: [],
        developer: "",
        release_date: null,
        popularity: 0,
      }),
    },
  },
  computed: {
    displayGenres() {
      return this.game.genre.slice(0, 2);
    },
  },
};
</script>

<template>
  <div class="card card__changes">
    <div class="card__image__container">
      <img
        class="card__image card__image__changes"
        :src="game.thumbnail"
        :alt="game.title"
      />
    </div>

    <div class="card__content">
      <header class="card__header">
        <h4 class="card__title card__title__changes">{{ game.title }}</h4>
      </header>
      <p class="card__description">{{ game.short_description }}</p>
      <footer class="card__footer">
        <ul class="card__genres">
          <li
            class="card__genre-item"
            v-for="(gen, index) in displayGenres"
            :key="index"
          >
            {{ gen }}
          </li>
        </ul>
        <p class="card__badge card__badge_changes">{{ game.release_date }}</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--bg-dark);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
  height: 100%;
  display: grid;
  grid-template-rows: 160px 1fr;
}

.card:hover {
  transform: translateY(-4px);
}

.card__image {
  width: 100%;
  object-fit: cover;
  object-position: center;
  max-height: 100%;
}

.card__content {
  padding: 16px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 14px;
  height: 100%;
}

/* Header */
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__title {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-light);
}

/* Description */

.card__description {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.5;
}

/* Footer */

.card__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card__badge {
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  max-height: 20px;
}

.card__genres {
  display: flex;
  flex-direction: row;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/** ESTILOS AÑADIDOS A LA PAC */
/* .card__changes{
    max-width: 350px;
} */

.card__title__changes {
  margin: 0;
}

/* .card__image__container{
    width: 100%;
    height: 100%;
} */

/* .card__image__changes{
    width: 100%;
    height: 100%;
} */

.card__genre-item {
  background-color: var(--blue);
  color: var(--text-medium);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
}

.card__badge_changes {
  background-color: var(--bg-gradient-2);
  color: var(--text-light);
  font-size: 12px;
  padding: 2px 8px;
  line-height: 16px;
}
</style>
