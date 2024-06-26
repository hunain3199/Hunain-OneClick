import BikeInsuranceModel from "../models/insuranceModel.js";
import mongoose from "mongoose";

//post insurance controller for admin
export const bikeInsuranceController = async (req, res) => {
  const db = mongoose.connection;

  try {
    const { bikeMake, bikePrice } = req.body;

    if (!bikeMake || !bikePrice) {
      return res.status(401).json({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const collection = db.collection("bikeinsurances");

    const data = await collection.find({}).toArray();

    console.log("Documents retrieved:", data);

    let pricePlan;

    if (bikeMake === "honda") {
      pricePlan = (data[1].honda_percentage / 100) * bikePrice;
    } else {
      pricePlan = (data[1].all_bikes_percentage / 100) * bikePrice;
    }

    const bikeInsuranceObject = [
      {
        insuranceCompany: data[0].insurance_company_1,
        logo: data[0].insurance_company_logo,
        yearlyPlan: (data[0].percentage / 100) * bikePrice,
      },
      {
        insuranceCompany: data[1].insurance_company_1,
        logo: data[1].insurance_company_logo,
        yearlyPlan: pricePlan,
      },
      {
        insuranceCompany: data[1].insurance_company_1,
        logo: data[1].insurance_comp_1_logo,
        yearlyPlan: pricePlan,
      },
      {
        insuranceCompany: data[1].insurance_company_2,
        logo: data[1].insurance_comp_2_logo,
        yearlyPlan: pricePlan,
      },
      {
        insuranceCompany: data[1].insurance_company_3,
        logo: data[1].insurance_comp_3_logo,
        yearlyPlan: pricePlan,
      },
      {
        insuranceCompany: data[1].insurance_company_4,
        logo: data[1].insurance_comp_4_logo,
        yearlyPlan: pricePlan,
      },
      {
        insuranceCompany: data[1].insurance_company_5,
        logo: data[1].insurance_comp_5_logo,
        yearlyPlan: pricePlan,
      },
      {
        insuranceCompany: data[1].insurance_company_6,
        logo: data[1].insurance_comp_6_logo,
        yearlyPlan: pricePlan,
      },
    ];

    res.status(201).json({
      success: true,
      message: "Insurance details saved successfully",
      bikeInsuranceObject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
