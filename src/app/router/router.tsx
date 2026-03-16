import { BrowserRouter, Route, Routes } from "react-router";
import { TablePage } from "../pages/table";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TablePage />} />
      </Routes>
    </BrowserRouter>)
}
