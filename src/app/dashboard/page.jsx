"use client";
import { useState, useEffect } from "react";
import axios from "axios";

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
      <h1 className=" text-[#fff] text-center font-bold text-[45px] uppercase leading-tight mb-5">
        Tabla de registros de regalos
      </h1>
      <div className="max-w-6xl w-full ">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
