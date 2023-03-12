export default function BookingWidget({place}) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-xl text-center"><span className="text-primary text-2xl font-bold">$ {place.price}</span> / night</div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="px-3 py-4">
                        <label>Check In: </label>
                        <input type="date" />
                    </div>
                    <div className="px-3 py-4 border-l">
                        <label>Check Out: </label>
                        <input type="date" />
                    </div>
                </div>
                <div>
                    <div className="px-3 py-4 border-t">
                        <label>Number of guests: </label>
                        <input type="number" value={1} />
                    </div>
                </div>
            </div>
            <button className="primary mt-4">Book this place</button>
        </div>
    )
}
