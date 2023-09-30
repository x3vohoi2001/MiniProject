<template lang="">
    <table  class="game-board">
        <tr v-for="(row, indexRow) in Board"
        :key="indexRow"
        >
            <Cell v-for="(col, indexCol) in row"
            :key="indexRow + '' +indexCol"
            @handleClick="
                this.$emit('handleClick', indexRow , indexCol);
            "
            :disabled="disabled"
            :vlue="col"
            :isLight="
                winCells && winCells.includes(indexRow+''+ indexCol)
            "
            />
        </tr>
    </table>
</template>
<script>
import Cell from './Cell-tictoctoe.vue'
export default {
    props:{
        Board: {
            type: Array
        },
        disabled: {
            type: Boolean,
        },
        winCells:{
            type: Array
        }
    },
    components:{
        Cell
    },
    computed: {

    },
}
</script>
<style lang="">
    
</style>