import type { Action } from "redux";

export interface Student {
  id: number;
  fullName: string;
  age: number;
  gender: "Nam" | "Nữ";
  dateOfBirth: string;
  placeOfBirth: string;
  address: string;
}

const initialState = {
  studentList: [
    { id: 1, fullName: "Đoàn Mạnh Duy", age: 20, gender: "Nam", dateOfBirth: "2005-01-01", placeOfBirth: "Hà Nội", address: "123 Đường A, Quận B, TP. Hà Nội" },
    { id: 2, fullName: "Trần Ngọc Linh", age: 20, gender: "Nam", dateOfBirth: "2005-01-01", placeOfBirth: "Hà Nội", address: "123 Đường A, Quận B, TP. Hà Nội" },
    { id: 3, fullName: "Phạm Ngọc Linh", age: 20, gender: "Nữ", dateOfBirth: "2005-01-01", placeOfBirth: "Hà Nội", address: "123 Đường A, Quận B, TP. Hà Nội" },
  ]
};

export const studentReducer = (state = initialState, action: Action & { payload?: any }) => {
  switch (action.type) {
    case "ADD_STUDENT":
      return {
        ...state,
        studentList: [...state.studentList, action.payload],
      };
    case "UPDATE_STUDENT":
      return {
        ...state,
        studentList: state.studentList.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        studentList: state.studentList.filter((s) => s.id !== action.payload),
      };
    default:
      return state;
  }
};
