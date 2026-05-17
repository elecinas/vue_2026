import { ref } from "vue";

const games = ref([]);
const error = ref(null);
const loading = ref(true);

export function useGames(){
    const getGames = async () => {
        loading.value = true;
        try {
            const res = await fetch("http://localhost:3000/games");
            if (!res.ok) throw new Error("Error en la petición del servidor");
            games.value = await res.json();
        } catch(e) {
            error.value = "No se han podido cargar los juegos";
            console.error(e);
        } finally {
            loading.value = false
        }
    }

    const addGame = async (game) => {
        loading.value = true;
        try {
            const res = await fetch("http://localhost:3000/games", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            })
            if (!res.ok) throw new Error("Error en la petición del servidor");
            const createdGame = await res.json();
            games.value.push(createdGame);
        } catch(e) {
            error.value = "No se ha podido añadir el juego";
            console.error(e);
        } finally {
            loading.value = false
        }
    }

    const updateGame = async (game) => {
        loading.value = true;
        try {
            const res = await fetch("http://localhost:3000/games/" + game.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            })
            if (!res.ok) throw new Error("Error en la petición del servidor");
            const updatedGame = await res.json();
            games.value = games.value.map((g) => g.id === updatedGame.id ? updatedGame : g)
        } catch(e) {
            error.value = "No se han podido guardar los datos del juego";
            console.error(e);
        } finally {
            loading.value = false
        }
    }

    const deleteGame = async (id) => {
        try {
            const res = await fetch("http://localhost:3000/games/" + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) throw new Error("Error en la petición del servidor");
            games.value = games.value.filter(g => g.id !== id)
        } catch(e) {
            error.value = "No se ha podido eliminar el juego";
            console.error(e);
        } finally {
            loading.value = false
        }
    }

  return {
    games,
    error,
    loading,
    getGames,
    addGame,
    updateGame,
    deleteGame
  };
}
