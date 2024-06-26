
"use client"
import React from "react";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

const DashboardCard = () => {
  return (
    <>
      <div className="flex flex-col w-full rounded-xl p-5 shadow ">
        <section className="flex justify-between gap-2 mb-[16px]">
          <p className="text-sm">Total Revenue</p>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </section>
      </div>
      <div className="flex flex-col w-full rounded-xl p-5 shadow ">
        <section className="flex justify-between gap-2 mb-[16px]">
          <p className="text-sm">Subscriptions</p>
          <Users className="h-4 w-4 text-gray-400" />
        </section>

        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">+2350</h2>
          <p className="text-gray-500 text-xs">+180.1% from last month</p>
        </section>
      </div>
      <div className="flex flex-col w-full rounded-xl p-5 shadow ">
        <section className="flex justify-between gap-2 mb-[16px]">
          <p className="text-sm">Sales</p>
          <CreditCard className="h-4 w-4 text-gray-400" />
        </section>

        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">+12,234</h2>
          <p className="text-gray-500 text-xs">+19% from last month</p>
        </section>
      </div>
      <div className="flex flex-col w-full rounded-xl p-5 shadow ">
        <section className="flex justify-between gap-2 mb-[16px]">
          <p className="text-sm">Active Now</p>
          <Activity className="h-4 w-4 text-gray-400" />
        </section>

        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">+573</h2>
          <p className="text-gray-500 text-xs">+201 since last hour</p>
        </section>
      </div>
    </>
  );
};

export default DashboardCard;
