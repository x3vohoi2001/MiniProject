<template lang="">
    <tr>
        <td><input type="checkbox" 
            :value="sv.maSV"
            @change="selectedSV"
            :checked="getChecked"
            v-model='svChecked'
        ></td>
        <td> {{sv.maSV }}</td>
        <td> {{sv.tenSV}} </td>
        <td> {{ sv.ngaySinh }} </td>
        <td> {{sv.gioiTinh}} </td>
        <td> {{ getTenKhoa }} </td>
        <td>
            <button type="submit" class="del" @click="handledel" style="background-color: rgb(243, 118, 118);"><i class="fa-solid fa-trash-can"></i></button>
            <button type="submit" class="set" @click="handleset" style="background-color: rgb(133, 230, 157);"><i class="fa-solid fa-wrench"></i></button>
        </td>
    </tr>
</template>
<script>
export default {
    name: 'sinh-vien',
    props:{
        sv: {
            type: Object,
            default: null,
        },
        khoa: {
            type: Array,
        },
        getChecked:{
            type: Boolean
        }
    },
    data(){
        return {
            tenKh: '',
            birthDate: '',
            svChecked: false,
        }
    },
    computed: {
        getTenKhoa() {
            const khoaInfo = this.khoa.find(khoa => khoa.maKh === this.sv.maKhoa);
            if (khoaInfo) {
                return khoaInfo.tenKhoa;
            }else {
                return 'Không xác định';
            }
        },
    },
    methods: {
        handledel(){
            var data= {
                id: this.sv.maSV,
            }
            this.$emit('handledel',data)
        },
        handleset(){
            var data= {
                id: this.sv.maSV,
            }
            this.$emit('handleset',data);
        },
        selectedSV(){
            var data= {
                id: this.sv.maSV,
            }
            this.$emit('selectedSV', data, this.svChecked);
        }
    },
}
</script>
<style lang="">
    
</style>