import DeleteBooking from "@/app/My_Bookings/Components/DeleteBooking";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const MY_bookings_Table = ({ data }) => {
  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-3xl mb-8">
        My Appointments
      </h1>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border">
                <Image
                  src={item.service_img}
                  alt={item.service_name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {item.service_firstName}
                </h3>
                <p className="text-sm text-slate-500">
                  {item.service_name}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <span className="font-medium">Date</span>
                <span>{item.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Fee</span>
                <span className="text-sky-600 font-semibold">
                  ৳ {item.service_price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Phone</span>
                <span>{item.phone}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Address</span>
                <span className="text-right">{item.address}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              {/* <Link
                href={`/My_Bookings/${item._id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 transition text-sm font-medium w-full justify-center"
              >
                <FaRegEdit />
                Edit
              </Link> */}

              <div className="w-full flex justify-center">
                <DeleteBooking id={item._id} email={item.email} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MY_bookings_Table;
