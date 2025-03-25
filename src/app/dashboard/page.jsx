'use client';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { jsonToCsv } from '../components/Export';
import DataTable from 'react-data-table-component';
import Link from 'next/link';

const Dashboard = () => {
	const [data, setData] = useState([
		{ id: 1, nombre: 'Bodies y pijamas (varias tallas)' },
		{ id: 2, nombre: 'Medias y gorritos' },
		{ id: 3, nombre: 'Baberos y pañuelos' },
		{ id: 4, nombre: 'Zapatos o zapatitos de tela' },
		{ id: 5, nombre: 'Pañales (diferentes tamaños)' },
		{ id: 6, nombre: 'Toallitas húmedas' },
		{ id: 7, nombre: 'Crema para rozaduras' },
		{ id: 8, nombre: 'Shampoo y jabón hipoalergénico' },
		{ id: 9, nombre: 'Termómetro digital' },
		{ id: 10, nombre: 'Mantas y cobijas' },
		{ id: 11, nombre: 'Almohada para lactancia' },
		{ id: 12, nombre: 'Monitor de bebé' },
		{ id: 13, nombre: 'Sábanas para cuna' },
		{ id: 14, nombre: 'Biberones y chupones' },
		{ id: 15, nombre: 'Set de platos y cucharas para bebé' },
		{ id: 16, nombre: 'Esterilizador de biberones' },
		{ id: 17, nombre: 'Sonajeros y mordedores' },
		{ id: 18, nombre: 'Peluches suaves' },
		{ id: 19, nombre: 'Libros de tela o cartón' },
		{ id: 20, nombre: 'Móvil para la cuna' },
		{ id: 21, nombre: 'Canguro o portabebé' },
		{ id: 22, nombre: 'Cochecito de bebé' },
		{ id: 23, nombre: 'Silla para el auto' },
		{ id: 24, nombre: 'Tarjetas de regalo' },
		{ id: 25, nombre: 'Álbum para fotos del bebé' },
		{ id: 26, nombre: 'Kit de huellas de bebé' },
	]);

	const columns = [
		// {
		// 	name: 'Id',
		// 	selector: (row) => row.id,
		// 	sortable: true,
		// },
		{
			name: 'Nombres',
			selector: (row) => row.nombres,
			sortable: true,
		},
		{
			name: 'Apellidos',
			selector: (row) => row.apellidos,
			sortable: true,
		},
		{
			name: 'Regalo',
			selector: (row) => row.regalo,
			sortable: true,
		},
	];

	const toCSV = (data) => {
		const file = jsonToCsv(data);
		const blob = new Blob([file], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'regalos.csv';
		a.click();
		window.URL.revokeObjectURL(url);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios(
					'https://smileedu-backend-production.up.railway.app/api/regalos'
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
				<div className="flex justify-between items-center w-full mb-3">
					<Link
						href="/"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Volver
					</Link>
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
					title="VERIFICA TU REGALO"
					columns={columns}
					data={data}
					pagination
				/>
			</div>
		</div>
	);
};

export default Dashboard;
