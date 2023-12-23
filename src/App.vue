<script setup>
    import Cell from './components/Cell.vue';
    import { computed } from 'vue';
    import { useGameStore } from './store/game';

    const store = useGameStore();
    store.newGame();

    const cells = computed(() => store.grid._cells);
    const sizeX = computed(() => store.grid._sizeX);
    const sizeY = computed(() => store.grid._sizeY);

</script>

<template>
  <button @click="store.newGame()">New game</button>
  <div class="game-container" :style="{ '--sizeX': `${sizeX}px`, '--sizeY': `${sizeY}px` }">
    <Cell 
        v-for="cell in cells" 
        :key="cell.id" 
        :value="cell.value"
        :x="cell.x"
        :y="cell.y"
    />
  </div>
</template>

<style scoped>
    .game-container {
        --cellsize: 50;
        --cellpadding: 8;
        --cellmargin: 5;
        position: relative;
        width: calc((var(--cellsize) + var(--cellmargin) * 2 + var(--cellpadding) * 2) * var(--sizeX));
        height: calc((var(--cellsize) + var(--cellmargin) * 2 + var(--cellpadding) * 2) * var(--sizeY));

        border-radius: 3px;
        background-color: #bbada0;
    }
</style>
