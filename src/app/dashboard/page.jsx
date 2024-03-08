"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { jsonToCsv } from "../components/Export";
import DataTable from "react-data-table-component";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellidos,
      sortable: true,
    },
    {
      name: "Regalo",
      selector: (row) => row.regalo,
      sortable: true,
    },
  ];

  const toCSV = (data) => {
    const file = jsonToCsv(data);
    const blob = new Blob([file], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "regalos.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(
          "https://smileedu-backend-production.up.railway.app/api/regalos"
        );
        const data = res.data;
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col py-7">
      <div className="max-w-6xl w-full ">
        <div className="flex justify-end items-center w-full">
          <button
            onClick={() => toCSV(data)}
            className=" 
        bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        "
          >
            Exportar
          </button>
        </div>
        <DataTable
          title="TABLA DE REGISTROS DE REGALOS"
          columns={columns}
          data={data}
          pagination
        />
      </div>
    </div>
  );
};

export default Dashboard;
