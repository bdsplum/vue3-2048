<template>
    <div class="cell-tile" :style="style" :class="`tile-${props.value}`">
        {{ props.value }}
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        value: Number,
        x: Number,
        y: Number
    });

    const cellSize = 50;
    const padding = 8;
    const margin = 5;
    const size = cellSize + padding * 2 + margin * 2;
    const style = computed(() => ({
        transform: `translate(${size * props.x}px, ${size * props.y}px)`
    }));
</script>

<style scoped>
    .cell-tile {
        height: 50px;
        width: 50px;
        padding: 8px;
        margin: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        position: absolute;
        transition: transform 0.2s;
        background: #eee4da;
        text-align: center;
        font-weight: bold;
        font-size: 55px;
        color: #776e65;
    }

    .cell-tile.tile-2 {
        background: #eee4da;
    }

    .cell-tile.tile-4 {
        background: #eee1c9;
    }

    .cell-tile.tile-8 {
        color: #f9f6f2;
        background: #f3b27a;
    }

    .cell-tile.tile-16 {
        color: #f9f6f2;
        background: #f69664;
    }

    .cell-tile.tile-32 {
        color: #f9f6f2;
        background: #f77c5f;
    }

    .cell-tile.tile-64 {
        color: #f9f6f2;
        background: #f75f3b;
    }

    .cell-tile.tile-128 {
        color: #f9f6f2;
        background: #edd073;
        font-size: 45px;
    }

    .cell-tile.tile-256 {
        color: #f9f6f2;
        background: #edcc62;
        font-size: 45px;
    }

    .cell-tile.tile-512 {
        color: #f9f6f2;
        background: #edc950;
        font-size: 45px;
    }

    .cell-tile.tile-1024 {
        color: #f9f6f2;
        background: #edc53f;
        font-size: 35px;
    }

    .cell-tile.tile-2048  {
        color: #f9f6f2;
        background: #edc22e;
        font-size: 35px;
    }
</style>