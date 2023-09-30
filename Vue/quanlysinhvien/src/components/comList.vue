<template lang="">
    <comSV 
        v-for="sv in svActive"
        :getChecked="svSelected && svSelected.includes(sv.maSV)"
        :key="sv.maSV"
        :sv = "sv"
        :khoa = "dsKhoa"
        @handledel="handledel"
        @handleset="handleset"
        @selectedSV="selectedSV"
    />
</template>
<script>

import comSV from './comSv.vue';

export default {
    emits: ['handleDel', 'handleset', 'selectedSV'],
    name: 'listSV',
    props:{
        listU: {
            type: Array,
        },
        dsKhoa:{
            type: Array,
        },
        listSearch:{
            type: Array,
        },
        svSelected:{
            type: Array,
        },
        SearchKey:{
            type: String,
        }
    },
    components: {
        comSV,
    },
    computed:{
        svActive(){
            return this.SearchKey === '' ? this.listU:
                this.listU.filter((sv) =>{
                    return this.listSearch.includes(sv.maSV)
                })
        },
    },
    methods: {
        handleset(data){
            this.$emit('handleset', data);
        },
        handledel(data){
            this.$emit('handleDel', data);
        },
        selectedSV(data, isChecked){
            this.$emit('selectedSV',data, isChecked);
        }
    },
}
</script>
<style lang="">
    
</style>