import mongoose from "mongoose";

const VacancyShema = new mongoose.Schema(
  {
    vacancyName: {
      type: String,
      required: true,
    },
    vacancyDescription: {
      type: String,
      required: true,
    },

    vacancyRequirements: {
      type: [String],
      required: true,
    },
    vacancyConditions: {
      type: [String],
      required: true,
    },
    vacancyResponsibilities: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vacancy", VacancyShema);
