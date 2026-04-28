<script>
export default {
    name: "GameForm",
    data() {
        return {
            game: {},
            errors: [],
        };
    },
    props: {
        currentGame: {
            type: Object,
            default: null
        },
    },
    // watch para que el estado de la información del juego
    // en el  formulario esté sincronizado siempre con el padre (App)
    watch: {
        currentGame: {
            handler(newVal) {
                const baseGame = newVal ? { ...newVal } : {};

                this.game = {
                    ...baseGame,
                    title: baseGame.title || "",
                    short_description: baseGame.short_description || "",
                    thumbnail: baseGame.thumbnail || "",
                    developer: baseGame.developer || "",
                    release_date: baseGame.release_date || null,
                    popularity: baseGame.popularity || 0,
                    genre: Array.isArray(baseGame.genre) ? baseGame.genre.join(', ') : "",
                    platform: Array.isArray(baseGame.platform) ? baseGame.platform.join(', ') : ""
                };
            },
            //como watch solo se activa cuando la variable de la que depende cambia
            // inmediate: true obliga a ejecutar la funcion al crear el componente
            immediate: true
        }
    },
    emits: ['add-game', 'edit-game', 'delete-game'],
    methods: {
        arrayToString(array) {
            return array.join(',')
        },
        stringToArray(str) {
            if (typeof str !== 'string' || !str.trim()) return [];
            return str.split(',').map(item => item.trim()).filter(item => item !== "");
        },
        prepareGameData() {
            return {
                ...this.game,
                genre: this.stringToArray(this.game.genre),
                platform: this.stringToArray(this.game.platform)
            };
        },
        save() {
            this.errors = [];

            // Validaciones
            if (!this.game.title?.trim()) this.errors.push('Please input title');
            if (!this.game.short_description?.trim()) this.errors.push('Please input short description');
            if (!this.game.thumbnail?.trim()) this.errors.push('Please input thumbnail URL');
            if (!this.game.release_date) this.errors.push('Please input release date');

            const genreArray = this.stringToArray(this.game.genre);
            if (genreArray.length === 0) this.errors.push('Please input at least one genre');

            // Si errores se sale
            if (this.errors.length > 0) return;

            const finalData = this.prepareGameData();

            if (this.currentGame?.id) {
                this.$emit('edit-game', finalData);
            } else {
                finalData.id = window.crypto.randomUUID();
                this.$emit('add-game', finalData);
            }

            this.resetForm();
        },
        resetForm() {
            this.game = {
                id: "",
                title: "",
                thumbnail: "",
                short_description: "",
                genre: "",
                platform: "",
                developer: "",
                release_date: null,
                popularity: 0,
            };
            this.errors = [];
        },
        deleteGame() {
    if (this.game?.id) {
        if (confirm('Are you sure you want to delete this game?')) {
            this.$emit('delete-game', this.game.id);
        }
    } else {
        this.$emit('delete-game');
    }
},
    },
    computed: {
        displayImage() {
            const DEFAULT_IMAGE = 'https://gaming-cdn.com/images/products/13386/orig/hogwarts-legacy-deluxe-edition-deluxe-edition-xbox-series-x-s-xbox-one-juego-microsoft-store-cover.jpg'
            return this.game.thumbnail ? this.game.thumbnail : DEFAULT_IMAGE
        }
    },
};
</script>

<template>
    <div class="game-form">
        <img class="game-form__image" :src="displayImage" alt="Game thumbnail">
        <ul v-if="errors.length > 0" class="game-form__error">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <form @keyup.enter.prevent>
            <div class="game-form__container">
                <div class="game-form__group">
                    <label for="title" class="game-form__label">Title</label>
                    <input type="text" id="title" class="game-form__input" v-model="game.title" placeholder="Title">
                    <label for="short-description" class="game-form__label">Short description</label>
                    <textarea id="short-description" class="game-form__textarea" v-model="game.short_description"
                        rows="5" placeholder="Write short description"></textarea>
                </div>
                <div class="game-form__group">
                    <label for="thumbnail-url" class="game-form__label">Thumbnail URL</label>
                    <input type="text" id="thumbnail-url" class="game-form__input" v-model="game.thumbnail"
                        placeholder="http://www...">
                    <label for="developer" class="game-form__label">Developer</label>
                    <input type="text" id="developer" class="game-form__input" v-model="game.developer"
                        placeholder="Developer name">
                </div>
                <div class="game-form__group">
                    <label for="release" class="game-form__label">Release date</label>
                    <input type="date" id="release" class="game-form__input" v-model="game.release_date"
                        min="1950-01-01" max="2026-12-31">
                    <label for="platforms" class="game-form__label">Platforms</label>
                    <input type="text" id="platforms" class="game-form__input" v-model="game.platform"
                        placeholder="Windows, Playstation">
                </div>
                <div class="game-form__group">
                    <label for="genres" class="game-form__label">Genres</label>
                    <input type="text" id="genres" class="game-form__input" v-model="game.genre"
                        placeholder="Action, Terror">
                    <label for="popularity" class="game-form__label">Popularity</label>
                    <input type="range" id="popularity" name="popularity" min="0" max="5" class="game-form__input"
                        v-model.number="game.popularity">
                </div>
                <div class="game-form__actions">
                    <button class="button" @click.prevent="save">Save</button>
                    <button class="button game-form__btn--cancel" @click.prevent="deleteGame">{{ currentGame?.id ? 'Delete' : 'Cancel' }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.game-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    background: linear-gradient(135deg, var(--bg-darker), var(--bg-dark));
    border-radius: 8px;
    border: 1px solid var(--border-dark);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    max-width: 700px;
}

.game-form__image {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.game-form__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.game-form__group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.game-form__label {
    font-weight: 600;
    font-size: 0.75rem;
    color: var(--text-medium);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.game-form__input,
.game-form__textarea {
    padding: 6px 10px;
    background-color: var(--bg-darker);
    border: 1px solid var(--border-dark);
    border-radius: 4px;
    color: var(--text-medium);
    font-family: var(--font-family);
    font-size: 0.85rem;
    transition: all 0.3s ease;
    outline: none;
}

.game-form__input:focus,
.game-form__textarea:focus {
    border-color: var(--blue);
    background-color: rgba(33, 150, 243, 0.05);
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.game-form__input::placeholder,
.game-form__textarea::placeholder {
    color: var(--text-muted);
    font-size: 0.8rem;
}

.game-form__textarea {
    resize: vertical;
    min-height: 40px;
}

.game-form__actions {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
}

.game-form__btn--cancel {
    background-color: var(--danger-red);
}

.game-form__error {
    color: var(--danger-red);
    font-weight: 600;
    font-size: 0.85rem;
}
</style>
