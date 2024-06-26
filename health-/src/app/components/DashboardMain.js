import React from "react";
import Image from "next/image";
import Icon1 from "../../../public/icon-1.svg";
import Icon2 from "../../../public/icon-2.svg";
import Icon3 from "../../../public/icon-3.svg";
import Icon4 from "../../../public/icon-4.svg";
import Icon5 from "../../../public/icon-5.svg";

const DashboardMain = () => {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 ">
        {/* <div className="flex w-full flex-col rounded-xl gap-3 border p-5 shadow-sm ">
          <p className="p-4 font-semibold">Overview</p>
        </div> */}

        <div className="w-[550px] flex-col rounded-xl border p-5 shadow-sm flex justify-between gap-4">
          <section>
            <p>Recent</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </section>
          <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-5">
              <div className="h-12 w-12 rounded-full bg-gray-100">
                <Image
                  src={Icon1}
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="text-sm">
                <p>Olivia Martin</p>
                <div className="text-gray-400">olivia.martin@email.com</div>
              </div>

              <p className="ml-[130px]">+$1,999.00</p>
            </section>
          </div>
          <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-5">
              <div className="h-12 w-12 rounded-full bg-gray-100">
                <Image
                  src={Icon2}
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="text-sm">
                <p>Jackson Lee</p>
                <div className="text-gray-400">isabella.nguyen@email.com </div>
              </div>

              <p className="ml-[104px]">+$1,999.00</p>
            </section>
          </div>
          <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-5">
              <div className="h-12 w-12 rounded-full bg-gray-100">
                <Image
                  src={Icon3}
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="text-sm">
                <p>Isabella Nguyen</p>
                <div className="text-gray-400">isabella.nguyen@email.com</div>
              </div>

              <p className="ml-[120px]">+$39.00</p>
            </section>
          </div>
          <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-5">
              <div className="h-12 w-12 rounded-full bg-gray-100">
                <Image
                  src={Icon4}
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="text-sm">
                <p>William Kim</p>
                <div className="text-gray-400">will@email.com</div>
              </div>

              <p className="ml-[190px]">+$299.00</p>
            </section>
          </div>
          <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-5">
              <div className="h-12 w-12 rounded-full bg-gray-100">
                <Image
                  src={Icon5}
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="text-sm">
                <p>Sofia Davis</p>
                <div className="text-gray-400">sofia.davis@email.com</div>
              </div>

              <p className="ml-[150px]">+$39.00</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardMain;

