<script>
export default {
    name: 'MainHeader',
    data() {
        return {
            name: 'Esther Lecina'
        }
    }
}
</script>
<template>
    <header class="header">
        <picture class="header__logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Small_logo_UOC.svg/1280px-Small_logo_UOC.svg.png"
                alt="UOC Logo" width="60">
        </picture>
        <h1 class="header__title">Game database: {{ name }}</h1>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    height: 70px;
    overflow: hidden;
    box-shadow: 3px 2px 20px 0px var(--paper-black);
    background: var(--header-gradient);
}

.header__logo {
    height: 100%;
    object-fit: contain;
}

.header__title {
    margin: 0;
    color: var(--text-light);
    font-size: 24px;
    font-weight: 600;
}
</style>