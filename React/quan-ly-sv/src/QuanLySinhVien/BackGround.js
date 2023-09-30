import React, { useState } from 'react';
import ShowList from './showList';
import './Style.css';


class SinhVien{
    constructor(maSV, tenSV, ngaySinh,gioiTinh, maKhoa){
        this.maSV = maSV;
        this.tenSV = tenSV;
        this.ngaySinh = ngaySinh;
        this.gioiTinh = gioiTinh;
        this.maKhoa = maKhoa;
    }
}
class Khoa{
    constructor(maKh, tenKhoa){
        this.maKh = maKh;
        this.tenKhoa = tenKhoa;
    }
}

const BackGround = () => {
    const DsKhoa = [  new Khoa("cntt", "Công Nghệ Thông Tin"),
                new Khoa("dtvt", "Điện tử viễn thông"),
                new Khoa("kt", "Kinh Tế"),
                new Khoa("ddt", "Điện-điện tử")
            ]
    const [List, setList] = useState([
        new SinhVien("2019603608", "Phí Đức La", "05/08/2001", "Nam", "cntt"),
        new SinhVien("2019603605", "Phí Đức Na","02/04/2002", "Nữ", "kt"),
        new SinhVien("2019603604", "Nguyen ĐNai", "01/05/2003", "Nữ", "ddt"),
        new SinhVien("2019603345", "Tran Đức Sh", "20/06/2004", "Nam", "ddt"),
        new SinhVien("2019603654", "Kham Đức Al", "20/06/2004", "Nữ", "dtvt"),
        new SinhVien("2019601256", "Vinh Đức Dha", "20/06/2004", "Nam", "ddt"),
        new SinhVien("2019603965", "PAi Đức Na", "20/06/2004", "Nữ", "dtvt"),
        new SinhVien("2019604386", "Phf Đức Cu", "20/06/2004", "Nam", "kt"),
        new SinhVien("2034603603", "Phiu Đức fe", "20/06/2004", "Nữ", "dtvt"),
        new SinhVien("2385603603", "Kahf Đức Dha", "20/06/2004", "Nam", "cntt"),
    ]);

    const [svCode, setSVCode] = useState('');
    const [svName, setSVName] = useState('');
    const [svBirth, setsvBirth] = useState('');
    const [svGender, setsvGender] = useState('');
    const [svKhoa, setsvKhoa] = useState('#');
    const [checked, setChecked] = useState([]);
    const [search, setSearch] = useState('');
    const [listSearch, setListSearch] = useState([]);
    var [isDisabled, setIsDisabled] = useState(false);
    const Gender = [
        {
            id: 1,
            name: 'Nam'
        },
        {
            id:2,
            name: 'Nữ'
        }
    ]

    function reset(){
        setSVCode('');
        setIsDisabled(false);
        setSVName('');
        setsvBirth('');
        setsvGender('');
        setsvKhoa('#');
    }

    function ktSVCode(code){
        List.forEach(sv =>{
            if(sv.maSV === code){
                return true;
            }
        })
        return false;
    }

    function updateSinhVien(){
        for(let i in Gender){
            if(svGender === Gender[i].id){
                var GT = Gender[i].name;
            }
        }
        if(svCode === '' || svName === '' || svKhoa === '#'){
            alert("Xin hãy Nhập thông tin bắt buộc!!");
            return;
        }
        if(ktSVCode(svCode) && isDisabled === false){
            alert('Mã Sinh Viên Đã Tồn Tại!!');
            return;
        }
        
        else if(isDisabled === false && svCode !== '' && svName !== '' && svKhoa !== '#'){
            setList(prev  =>{
                const newSV = new SinhVien(svCode, svName, svBirth ?? '', GT, svKhoa);
                return [...prev, newSV];
            })
            reset();
        }
        else if(isDisabled === true && svCode !== '' && svName !== '' && svKhoa !== '#'){
            setList(prev  =>{
                const newSV = new SinhVien(svCode, svName, svBirth ?? '', GT, svKhoa);
                for(let i=0; i<prev.length; i++){
                    if(prev[i].maSV === svCode){
                        prev[i] = newSV;
                    }
                }
                return prev;
            })
            reset();
        }
    }

    const handleDel = (index) =>{
        setList(newList =>{
            newList = [...List];
            newList.splice(index, 1);
            return newList;
        })
    }

    const handleSet = (index) =>{
        setSVCode(List[index].maSV);
        setSVName(List[index].tenSV);
        setsvBirth(List[index].ngaySinh);
        setsvGender(() =>{
            if(List[index].gioiTinh === 'Nam'){
                return 1;
            }else{
                return 2;
            }
        });
        setsvKhoa(List[index].maKhoa);
        setIsDisabled(true);
    }

    const handleChecked = (index) =>{
        setChecked(prev =>{
            const isCheck = checked.includes(index);
            if(isCheck){
                return prev.filter(item => item !== index);
            }else{
                var cprev = [...prev, index];
                cprev.sort((a, b) => b - a);
                return cprev;
            }
        })
    }

    function XoaSV(){
        setList(newList =>{
            newList = [...List];
            checked.forEach((idChecked) =>{
                newList.splice(idChecked, 1);
            })
            return newList;
        })
        setChecked([]);
    }
    function SearchSV(){
        setListSearch([]);
        if(search !== ''){
            List.forEach(sv =>{
                if(sv.tenSV.includes(search) || sv.gioiTinh.includes(search) || sv.maSV.includes(search) || sv.ngaySinh.includes(search) || sv.maKhoa.includes(search)){
                    setListSearch(prev =>{
                        return [...prev, sv];
                    });
                }
            })
        }
        setSearch('');
    }

    return (
        <div>
            <div className="timkiem">
            <label htmlFor="txtTuKhoa">Từ Khóa</label>
            <input type="text" placeholder="Từ Khóa Cần tìm" id="txtTuKhoa"
            value={search}
            onChange={e => setSearch(e.target.value)} />
            <button onClick={SearchSV}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div className="list">
            <ShowList list={List} khoa={DsKhoa}
            dsTim = {listSearch}
            check = {checked}
            onClickDel = {handleDel}
            onClickSet = {handleSet}
            onChange = {handleChecked}
            ></ShowList>
        </div>
        <div className="input-info">
            <div>
                <button onClick={reset}>Thêm mới</button>
                <button onClick={updateSinhVien}>Cập Nhật</button>
                <button onClick={XoaSV}>Xóa</button>
            </div>
            <div>
                <form action="#">
                    <table>
                    <tbody>
                    <tr>
                            <td><label htmlFor="txtMaSV">Mã SV <sup>(*)</sup></label></td>
                            <td><input
                                disabled = {isDisabled}
                                id='txtMaSv'
                                type="text"
                                placeholder="Mã Sinh Viên" 
                                value={svCode}
                                onChange={e => setSVCode(e.target.value)}
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="txtTenSV">Tên SV <sup>(*)</sup></label></td>
                            <td><input 
                                id='txtTenSV'
                                type="text" 
                                placeholder="Tên Sinh Viên" 
                                value={svName}
                                onChange={e => setSVName(e.target.value)}
                                /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="txtNgaySinh">Ngày Sinh</label></td>
                            <td><input 
                                id='txtNgaySinh'
                                type="text" 
                                placeholder="Ngày Sinh" 
                                value={svBirth}
                                onChange={e => setsvBirth(e.target.value)}
                                /></td>
                        </tr>
                        <tr>
                            <td><label>Giới Tính</label></td>
                            <td id="rdbGioiTinh">
                                {Gender.map(x =>(
                                    <label key={x.id}><input 
                                    type="radio" 
                                    checked={svGender === x.id}
                                    onChange={() => {setsvGender(x.id)}}
                                    />
                                    {x.name}</label>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td><label>Khoa<sup>(*)</sup></label></td>
                            <td>
                                <select name="khoa" 
                                value={svKhoa}
                                onChange={e =>{
                                    setsvKhoa(e.target.value);
                                }}>
                                    <option value="#">-Chọn Khoa-</option>
                                    <option value="cntt">CNTT</option>
                                    <option value="dtvt">DTVT</option>
                                    <option value="kt">Kinh Tế</option>
                                    <option value="ddt">Điện điện tử</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
    );
};

export default BackGround;