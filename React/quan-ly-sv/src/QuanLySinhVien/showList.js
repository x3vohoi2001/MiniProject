import React from 'react';

const showList = (props) => {

    function inTenKhoa(item){
        var tenKhoa;
            for (let i in props.khoa) {
                if (item.maKhoa === props.khoa[i].maKh) {
                    tenKhoa = props.khoa[i].tenKhoa;
                }
            }
        return tenKhoa;
    }

    return (
        <table className="content-list">
        <tbody>
        <tr>
                <th></th>
                <th>Mã SV</th>
                <th>Tên Sinh Viên</th>
                <th>Ngày Sinh</th>
                <th>Giới Tính</th>
                <th>Khoa</th>
                <th></th>
        </tr>
            {
                props.dsTim.length > 0
                ? props.list.map((item, indexSV) => {
                if (props.dsTim.includes(item)) {
                    return (
                    <tr key={indexSV} value={item}>
                        <td>
                        <input
                            type="checkbox"
                            checked={props.check.includes(indexSV)}
                            onChange={() => {
                            props.onChange(indexSV);
                            }}
                        />
                        </td>
                        <td>
                        {item.maSV} {indexSV}
                        </td>
                        <td>{item.tenSV}</td>
                        <td>{item.ngaySinh}</td>
                        <td>{item.gioiTinh}</td>
                        <td>{inTenKhoa(item)}</td>
                        <td>
                        <button
                            type="submit"
                            onClick={() => {
                            props.onClickDel(indexSV);
                            }}
                            className="del"
                        >
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                        <button
                            type="submit"
                            onClick={() => {
                            props.onClickSet(indexSV);
                            }}
                            className="set"
                        >
                            <i className="fa-solid fa-wrench"></i>
                        </button>
                        </td>
                    </tr>
                    );
                }
                return null;
                })
            : props.list.map((item, indexSV) => {
    
                return (
                    <tr key={indexSV} value={item}>
                    <td>
                        <input
                        type="checkbox"
                        checked={props.check.includes(indexSV)}
                        onChange={() => {
                            props.onChange(indexSV);
                        }}
                        />
                    </td>
                    <td>
                        {item.maSV} {indexSV}
                    </td>
                    <td>{item.tenSV}</td>
                    <td>{item.ngaySinh}</td>
                    <td>{item.gioiTinh}</td>
                    <td>{inTenKhoa(item)}</td>
                    <td>
                        <button
                        type="submit"
                        onClick={() => {
                            props.onClickDel(indexSV);
                        }}
                        className="del"
                        >
                        <i className="fa-regular fa-trash-can"></i>
                        </button>
                        <button
                        type="submit"
                        onClick={() => {
                            props.onClickSet(indexSV);
                        }}
                        className="set"
                        >
                        <i className="fa-solid fa-wrench"></i>
                        </button>
                    </td>
                    </tr>
                )
                })} 
                    </tbody>
                    </table>
                )
};

export default showList;