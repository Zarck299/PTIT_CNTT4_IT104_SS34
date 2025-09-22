import { Button, Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import StudentForm from "./StudentForm";
import type { Student } from "../store/reducer/studentReducer";

interface StudentListProps {
  students: Student[];
  onEdit?: (student: Student) => void;
}

export default function StudentList({ students, onEdit }: StudentListProps) {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_STUDENT", payload: id });
  };

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border w-full mt-4">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Họ tên</th>
            <th className="border px-2">Tuổi</th>
            <th className="border px-2">Giới tính</th>
            <th className="border px-2">Ngày sinh</th>
            <th className="border px-2">Nơi sinh</th>
            <th className="border px-2">Địa chỉ</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="border px-2">{s.id}</td>
              <td className="border px-2">{s.fullName}</td>
              <td className="border px-2">{s.age}</td>
              <td className="border px-2">{s.gender}</td>
              <td className="border px-2">{s.dateOfBirth}</td>
              <td className="border px-2">{s.placeOfBirth}</td>
              <td className="border px-2">{s.address}</td>
              <td className="border px-2 flex gap-2">
                <Button size="small" onClick={() => onEdit && onEdit(s)}>
                  Sửa
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(s.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
