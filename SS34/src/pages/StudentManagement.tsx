import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Student } from "../store/reducer/studentReducer";
import Toolbar from "../components/Toolbar";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";

const StudentManagement = () => {
  const studentList = useSelector((state: RootState) => state.student.studentList);

  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [toggle, setToggle] = useState<"OFF" | "add" | "edit">("OFF");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    setFilteredStudents(studentList);
  }, [studentList]);
  const handleSearch = (keyword: string) => {
    if (!keyword) {
      setFilteredStudents(studentList);
    } else {
      setFilteredStudents(
        studentList.filter((s) =>
          s.fullName.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  };
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setToggle("edit");
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar
          isShow={(flag: "add" | "edit" | "OFF") => setToggle(flag)}
          onSearch={handleSearch}
        />

        <StudentList
          students={filteredStudents}
          onEdit={handleEditStudent}
        />
      </div>

      {toggle !== "OFF" && (
        <StudentForm
          toggle={toggle === "add" ? "add" : "edit"}
          initialData={toggle === "edit" ? selectedStudent || undefined : undefined}
          onClose={() => {
            setToggle("OFF");
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};

export default StudentManagement;
