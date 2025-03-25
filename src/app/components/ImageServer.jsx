import Image from 'next/image';

const ImageServer = ({ nombres }) => {
	return (
		<div className=" h-52 rounded-lg mt-3 overflow-hidden p-2">
			<Image
				width={400}
				height={400}
				className="object-contain w-full h-full"
				src={`/${nombres}.webp`}
				alt={`${nombres}`}
			/>
		</div>
	);
};

export default ImageServer;
