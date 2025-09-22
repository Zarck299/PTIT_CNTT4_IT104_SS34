import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { Student } from "../store/reducer/studentReducer";
import { useDispatch } from "react-redux";

interface StudentFormProps {
  toggle: "add" | "edit";
  onClose: () => void;
  initialData?: Student;
}

interface FormError {
  fullName?: string;
  age?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  address?: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ toggle, onClose, initialData }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<Student>({
    id: Date.now(),
    fullName: "",
    age: 0,
    gender: "Nam",
    dateOfBirth: "",
    placeOfBirth: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormError>({});

  useEffect(() => {
    if (toggle === "edit" && initialData) {
      setForm(initialData);
    }
  }, [toggle, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    const newErrors: FormError = {};
    if (!form.fullName) newErrors.fullName = "Họ tên là bắt buộc";
    if (form.age <= 0) newErrors.age = "Tuổi phải lớn hơn 0";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Ngày sinh là bắt buộc";
    if (!form.placeOfBirth) newErrors.placeOfBirth = "Nơi sinh là bắt buộc";
    if (!form.address) newErrors.address = "Địa chỉ là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (toggle === "add") {
      dispatch({ type: "ADD_STUDENT", payload: form });
    } else {
      dispatch({ type: "UPDATE_STUDENT", payload: form });
    }
    onClose();
    if (toggle === "add") {
      setForm({
        id: Date.now(),
        fullName: "",
        age: 0,
        gender: "Nam",
        dateOfBirth: "",
        placeOfBirth: "",
        address: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-80">
      <TextField label="Họ tên" name="fullName" value={form.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} />
      <TextField label="Tuổi" name="age" type="number" value={form.age} onChange={handleChange} error={!!errors.age} helperText={errors.age} />
      <Select name="gender" value={form.gender} onChange={handleChange}>
        <MenuItem value="Nam">Nam</MenuItem>
        <MenuItem value="Nữ">Nữ</MenuItem>
      </Select>
      <TextField label="Ngày sinh" name="dateOfBirth" type="date" InputLabelProps={{ shrink: true }} value={form.dateOfBirth} onChange={handleChange} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} />
      <TextField label="Nơi sinh" name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} error={!!errors.placeOfBirth} helperText={errors.placeOfBirth} />
      <TextField label="Địa chỉ" name="address" value={form.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {toggle === "add" ? "Thêm sinh viên" : "Cập nhật sinh viên"}
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Đóng
      </Button>
    </div>
  );
};

export default StudentForm;
