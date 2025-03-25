'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const API_URL = 'https://smileedu-backend-production.up.railway.app/';
const socket = io(API_URL);
import axios from 'axios';
import ImageServer from './ImageServer';

const Form = () => {
	const [regalos, setRegalos] = useState([]);
	const [nombres, setNombres] = useState('');
	const [enviado, setEnviado] = useState(false);
	const [informacion, setInformacion] = useState({});

	const handleGif = (e) => {
		if (e.target.value === '') {
			// setNombres('jesus');
			return;
		}
		const id = e.target.value;
		setNombres(id.replace(/\s/g, '').toLowerCase());
		console.log(id.replace(/\s/g, '').toLowerCase());
	};

	const getRegalos = async () => {
		try {
			const res = await axios(
				'https://smileedu-backend-production.up.railway.app/api/regalos/list'
			);
			const data = res.data;
			console.log(data);
			setRegalos(data);
		} catch (error) {
			console.error(error);
		}
	};

	const sendRegalo = async (e) => {
		e.preventDefault();
		let nombres = e.target.nombres.value;
		let apellidos = e.target.apellidos.value;
		let regalo = e.target.regalo.value;
		const data = {
			nombres,
			apellidos,
			regalo,
		};
		setInformacion(data);
		console.log(data);
		try {
			const res = await axios.post(
				'https://smileedu-backend-production.up.railway.app/api/regalos',
				data
			);
			socket.emit('actulizarRegalos');
			// console.log(res);
			//reset form
			e.target.reset();
			setEnviado(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		socket.connect();
		socket.on('regalos', (e) => {
			setRegalos(e);
			// setNombres('jesus');
		});
	}, []);

	return (
		<>
			{!enviado ? (
				<div className="card w-[400px] rounded-[30px] min-h-[600px] border bg-white py-5">
					<p className="text-[#929292] text-center font-medium text-base px-2">
						Que la llegada del nuevo bebé ilumine nuestras vidas
					</p>
					<h1 className=" text-[#4c9eea] text-center font-bold text-[45px] uppercase leading-tight">
						baby shawer
						<br />
						de Victor
					</h1>
					<h2 className="text-[#929292] uppercase font-bold text-center text-[25px]">
						Elige tu Regalo
					</h2>
					<form
						className="max-w-[320px] m-auto text-[#AAAAAA] focus:text-[#4c9eea]"
						onSubmit={sendRegalo}
					>
						<input
							className="p-2 w-full border-2 border-[#AAAAAA] rounded-lg mt-3 outline-none"
							type="text"
							id="nombres"
							name="nombres"
							required
							placeholder="Nombres"
						/>
						<input
							className="p-2 w-full border-2 border-[#AAAAAA] rounded-lg mt-3 outline-none"
							type="text"
							id="apellidos"
							name="apellidos"
							required
							placeholder="Apellidos"
						/>
						<p className="text-center font-normal text-[25px] mt-2">
							¿Que regalo compraras?
						</p>
						<select
							id="regalo"
							name="regalo"
							onChange={handleGif}
							required
							className="p-2 w-full border-2 border-[#AAAAAA] rounded-lg mt-3 outline-none"
						>
							<option value="">Seleccione un regalo</option>
							{regalos.map((regalo) => (
								<option key={regalo.id} value={regalo.nombre}>
									{regalo.nombre}
								</option>
							))}
						</select>
						{nombres === '' ? '' : <ImageServer nombres={nombres} />}

						<div className="flex justify-center items-center gap-3 mt-[10px]">
							<button className="w-full rounded-[15px] mt-3 p-2 bg-[#4c9eea] text-white text-2xl">
								Registrar
							</button>
							<Link href="/dashboard">
								<button className="w-[150px]  rounded-[15px] mt-3 p-2 bg-[#4c9eea] text-white text-2xl">
									Verificar
								</button>
							</Link>
						</div>
					</form>
				</div>
			) : (
				<div className="card w-[400px] rounded-[30px] min-h-[600px] border bg-white py-5">
					<h1 className=" text-[#4c9eea] text-center font-bold text-[45px] uppercase leading-tight">
						Regalo Registrado
					</h1>
					<h2 className="text-[#929292] uppercase font-bold text-center text-[25px]">
						Informacion
					</h2>
					<div className="text-[#929292] mt-5 text-center text-xl font-normal">
						<p>nombres: {informacion.nombres}</p>
						<p>apellidos: {informacion.apellidos}</p>
						<p>regalo: {informacion.regalo}</p>
					</div>
					<div className=" h-52 rounded-lg mt-3 overflow-hidden p-2">
						<ImageServer
							nombres={`${informacion.regalo.replace(/\s/g, '').toLowerCase()}`}
						/>
					</div>
					<Link className="flex justify-center items-center" href="/dashboard">
						<button className="w-1/2 mx-auto  rounded-[15px] mt-3 p-2 bg-[#4c9eea] text-white text-2xl">
							Verificar
						</button>
					</Link>
				</div>
			)}
		</>
	);
};
export default Form;
