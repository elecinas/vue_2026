<script>
export default {
    name: 'DialogModal',
    emits: ['close'],
    mounted(){
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', this.handleEsc);
    },
    unmounted(){
        document.body.style.overflow = '';
        window.removeEventListener('keydown', this.handleEsc);
    },
    methods: {
        handleEsc(e){
            if(e.key === 'Escape') this.$emit('close');
        }
    }
}
</script>
<template>
    <Teleport to="#app">
        <dialog class="modal-overlay" @click.self="$emit('close')">
            <div class="modal-content">
                <header class="modal-header">
                    <slot name="header"></slot>
                    <button class="modal-close" @click="$emit('close')" aria-label="Close modal">&times;</button>
                </header>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
            </div>
        </dialog>
    </Teleport>
</template>
<style scoped>
/* Full screen overlay background */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--overlay-dark);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Modal content container */
.modal-content {
    background: var(--white);
    border-radius: 16px;
    box-shadow: 0 8px 32px var(--shadow);
    min-width: 320px;
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
}

/* Modal header with title */
.modal-header {
    background: var(--paperLight);
    border-radius: 12px 12px 0 0;
    padding: 20px 24px 16px 24px;
    box-shadow: 0 2px 8px var(--shadow);
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--paperBlack);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

/* Modal body content */
.modal-body {
    padding: 32px 24px 24px 24px;
}

/* Close button */
.modal-close {
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--gray-medium);
    cursor: pointer;
    z-index: 1;
    transition: color 0.2s;
}

.modal-close:hover {
    color: var(--blue);
}

/**Estilos añadidos */
.modal-overlay {
    width: 100vw;
    height: 100vh;
    border: none;
    padding: 0;
    margin: 0;
}
</style>