<template>
  <comHeader :titlee="title"/>
  <div class="ThongBao">
      <div v-for="tb in ThongBao" :key="tb" class="success-box">
        {{ tb }}
      </div>
  </div>
  <div class="timkiem">
    <label for="txtTuKhoa">Từ Khóa</label>
    <input type="text" placeholder="Từ Khóa Cần tìm" id="txtTuKhoa" 
      v-model="Key"
    />
    <button @click="timKiem()"><i class="fa-solid fa-magnifying-glass"></i></button>
  </div>
  <div class="list">
    <table class="content-list">
      <tr>
        <th><input type="checkbox"
          v-model="checkedAll"
          @change="checkAll"
          />Tất cả</th>
        <th>Mã SV</th>
        <th>Tên Sinh Viên</th>
        <th>Ngày Sinh</th>
        <th>Giới Tính</th>
        <th>Khoa</th>
        <th></th>
      </tr>
      <comList :listU="List" :dsKhoa="DsKhoa"
        :listSearch="listSearch"
        :svSelected="svSelected"
        @handleDel="handleDelete"
        @handleset="handleset"
        @selectedSV="selectedSV"
        :SearchKey="SearchKey"
      />
    </table>
  </div>
  <div class="input-info">
    <div>
      <button @click="reset()">Thêm mới</button>
      <button @click="updateList()">Cập Nhật</button>
      <button @click="btXoa()">Xóa</button>
    </div>
    <div style="margin-top: 10px;">
      <form action="#">
        <table>
          <tr>
            <td><label for="txtMaSV">Mã SV <sup>(*)</sup></label></td>
            <td><input id="txtMaSV" type="text" placeholder="Mã Sinh Viên"
              v-model="inMaSV"
              :disabled="isDisabled"
              ></td>
          </tr>
           <tr>
            <td><label for="txtTenSV">Tên SV <sup>(*)</sup></label></td>
            <td><input id="txtTenSV" type="text" placeholder="Tên Sinh Viên"
              v-model="inTenSV"
              ></td>
          </tr>
           <tr>
            <td><label for="txtNgaySinh">Ngày Sinh</label></td>
            <td><input id="txtNgaySinh" type="date" placeholder="Ngày Sinh"
              v-model="inNgaySinh"
              ></td>
          </tr>
           <tr>
            <td><label>Giới Tính</label></td>
            <td id="rdbGioiTinh">
              <label
                v-for="x in Gender"
                :key="x.id"
                ><input type="radio"
                :checked= "inGioiTinh === x.id"
                v-model="inGioiTinh"
                :value="x.id"
                />{{ x.name }}
              </label>
            </td>
          </tr>
          <tr>
            <td><label for="">Khoa<sup>(*)</sup></label></td>
            <td>
              <select name="khoa" id="drpKhoa"
                v-model="inmaKhoa">
                <option value="#">-Chọn Khoa-</option>
                <option value="cntt">CNTT</option>
                <option value="dtvt">DTVT</option>
                <option value="kt">Kinh Tế</option>
                <option value="ddt">Điện điện tử</option>
              </select>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
import comHeader from './components/comHeader.vue';
import comList from './components/comList.vue';
import './components/Style.css'
class SinhVien{
    constructor(maSV, tenSV, ngaySinh,gioiTinh, maKhoa){
        this.maSV = maSV,
        this.tenSV = tenSV,
        this.ngaySinh = ngaySinh,
        this.gioiTinh = gioiTinh,
        this.maKhoa = maKhoa
    }
}
class Khoa{
    constructor(maKh, tenKhoa){
        this.maKh = maKh,
        this.tenKhoa = tenKhoa
    }
}
export default {
  name: 'App',
  data(){
    return{
      checkedAll: false,
      isDisabled: false,
      title: 'Quản Lý Sinh Viên',
      Gender: [
        { id: 1,
          name: 'Nam'},
        { id:2,
          name: 'Nữ'}
      ],
      DsKhoa:[  new Khoa("cntt", "Công Nghệ Thông Tin"),
                new Khoa("dtvt", "Điện tử viễn thông"),
                new Khoa("kt", "Kinh Tế"),
                new Khoa("ddt", "Điện-điện tử")
            ],
      List: [
        new SinhVien("2019603608", "Phí Đức La", "05-08-2001", "Nam", "cntt"),
        new SinhVien("2019603605", "Phí Đức Na","02-04-2002", "Nữ", "kt"),
        new SinhVien("2019603604", "Nguyen ĐNai", "01-05-2003", "Nữ", "ddt"),
        new SinhVien("2019603345", "Tran Đức Sh", "20-06-2004", "Nam", "ddt"),
        new SinhVien("2019603654", "Kham Đức Al", "20-06-2004", "Nữ", "dtvt"),
        new SinhVien("2019601256", "Vinh Đức Dha", "20-06-2004", "Nam", "ddt"),
        new SinhVien("2019603965", "PAi Đức Na", "20-06-2004", "Nữ", "dtvt"),
        new SinhVien("2019604386", "Phf Đức Cu", "20-06-2004", "Nam", "kt"),
        new SinhVien("2034603603", "Phiu Đức fe", "20-06-2004", "Nữ", "dtvt"),
        new SinhVien("2385603603", "Kahf Đức Dha", "20-06-2004", "Nam", "cntt")
      ],
      inMaSV: '',
      inTenSV: '',
      inNgaySinh: '',
      inGioiTinh: '',
      inmaKhoa: '#',
      svSelected: [],
      listSearch: [],
      SearchKey: '',
      Key: '',
      ThongBao: [],
    }
  },
  components: {
    comHeader,
    comList,
  },
  
  methods: {
    checkAll(){
      if(this.checkedAll){
        if(this.SearchKey){
          this.listSearch.map(x => x ? (this.svSelected = [...this.svSelected, x]):'');
        }
        else{
          this.List.map(x =>x.maSV? (this.svSelected = [...this.svSelected, x.maSV]):'');
        }
      }else{
        this.svSelected = [];
      }
    },
    timKiem(){
      this.SearchKey = this.Key;
      if(this.SearchKey === ''){
        return;
      }
      else{
        this.listSearch= [];
        this.List.forEach(sv =>{
          if(sv.maSV.includes(this.SearchKey) || sv.tenSV.includes(this.SearchKey) || sv.gioiTinh.includes(this.SearchKey) || sv.maKhoa.includes(this.SearchKey) || sv.ngaySinh.includes(this.SearchKey)){
            this.listSearch.push(sv.maSV);
          }
        })
      }
    },
    checkSV(maSiV){
      var index = -1;
      this.List.forEach((x, idx) => {
        if(x.maSV === maSiV){
          index = idx;
        }
      })
      return index;
    },
    handleset(data){
      var indexSet = this.checkSV(data.id);
      this.isDisabled = true;
      this.inMaSV= this.List[indexSet].maSV;
      this.inTenSV= this.List[indexSet].tenSV;
      const Birday = this.List[indexSet].ngaySinh.split("-").reverse().join("-");
      this.inNgaySinh= Birday;
      if(this.List[indexSet].gioiTinh === "Nam"){
        this.inGioiTinh = 1;
      }else{
        this.inGioiTinh = 2;
      }
      this.inmaKhoa= this.List[indexSet].maKhoa;
    },
    handleDelete(data){
      var indexDel = this.checkSV(data.id);
      this.List.splice(indexDel, 1);
      this.ThongBao = [...this.ThongBao, 'Đã xóa ' + data.id + ' khỏi danh sách!'];
      setTimeout(() => {
        this.ThongBao.splice(0, 1);
      }, 5000);
    },
    ktraNamSinh(Birday){
      const Today = new Date()
      const BirdayDate = new Date(Birday)
      if(BirdayDate < Today){
        return true;
      }
      return false;
    },
    updateList(){
      if(this.inMaSV === '' || this.inTenSV === '' || this.inmaKhoa === '#'){
        alert('Xin hãy điền thông tin bắt buộc!!');
        return;
      }
      var gender;
      if(this.inGioiTinh === 1){
        gender = 'Nam';
      }
      else if(this.inGioiTinh === 2){
        gender = 'Nữ';
      }else{
        gender = ''
      }
      if(this.ktraNamSinh(this.inNgaySinh) === false && this.inNgaySinh !== ''){
        alert("Ngày Sinh Không Hợp Lệ!! Vui Lòng Thử Lại");
        return;
      }
      const Birday = this.inNgaySinh.split("-").reverse().join("-");
      if(this.isDisabled === true){
        var setSV = new SinhVien(this.inMaSV, this.inTenSV,  Birday, gender, this.inmaKhoa)
        this.List.splice(this.checkSV(this.inMaSV), 1, setSV);
        this.ThongBao = [...this.ThongBao, 'Đã xóa ' + this.inMaSV + ' khỏi danh sách!'];
      }else{
        if(this.checkSV(this.inMaSV) === ''){
          alert('Sinh Viên Đã Tồn Tại Trong Danh Sách!!');
          return;
        }else{
          var newSV = new SinhVien(this.inMaSV, this.inTenSV,  Birday, gender, this.inmaKhoa)
          this.List = [...this.List, newSV];
          this.ThongBao = [...this.ThongBao, "Thêm mới sinh viên:  "+ this.inMaSV + " thành công!"];
        }
      }
      setTimeout(() => {
        this.ThongBao.splice(0, 1);
      }, 5000);
      this.reset();
      this.timKiem();
    },
    selectedSV(data, isChecked){
      if(isChecked){
        this.svSelected.push(data.id);
      }
      else {
        const index = this.svSelected.indexOf(data.id);
        this.svSelected.splice(index, 1);
        this.checkedAll = false;
      }
    },
    btXoa(){
      this.svSelected.sort((a, b) => b - a);
      this.svSelected.forEach(x =>{
        var idx = this.checkSV(x);
        this.List.splice(idx, 1);
      })
      this.checkedAll = false;
      this.svSelected = [];
      this.ThongBao = [...this.ThongBao, 'Xóa Thành Công!'];
      setTimeout(() => {
        this.ThongBao.splice(0, 1);
      }, 5000);
    },
    reset(){
      this.isDisabled = false;
      this.inMaSV= '';
      this.inTenSV= '';
      this.inNgaySinh= '';
      this.inGioiTinh= '';
      this.inmaKhoa= '#';
    }
  }

}
</script>

<style>

</style>
