<template lang="">
    <td class="game-cell " :class="isLight && 'win'"
    @click="handleClick"
    >
        {{ vlue }}
    </td>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    props:{
        vlue:{
            type: String,
        },
        disabled: {
            type: Boolean,
        },
        isLight:{
            type: Boolean
        }
    },
    methods:{
        handleClick(){
            if(!this.disabled){
                this.$emit('handleClick');
            }
            return;
        },
    },

}
</script>
<style lang="">

</style>