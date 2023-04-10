import { useState } from "react"

export default function Gallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0 ? place.photos.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === place.photos.length - 1 ? 0 : currentIndex + 1);
    };
    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen z-50">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className=" text-3xl mr-36">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed bottom-6 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                            </svg>
                            Close
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (

                        <div className="grid grid-cols-[1fr_4fr_1fr]">
                            <div></div>
                            <div>
                                <img src={'http://localhost:3000/uploads/' + photo} alt="" />
                            </div>
                            <div></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return (

        <div className="rounded-3xl overflow-hidden items-center flex relative">
            <div className="absolute">
                <button className="p-4 rounded-full mx-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white" onClick={handlePrevClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className="absolute right-0">
                <button className="p-4 rounded-full mx-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white" onClick={handleNextClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                </button>
            </div>
            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:3000/uploads/' + place.photos?.[currentIndex]} alt="" />
        </div>
    )
}