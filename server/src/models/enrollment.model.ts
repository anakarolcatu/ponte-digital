import mongoose, { Schema, type InferSchemaType } from "mongoose";

const enrollmentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

enrollmentSchema.index({ userId: 1, classId: 1 }, { unique: true });

type Enrollment = InferSchemaType<typeof enrollmentSchema>;

const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);

export { EnrollmentModel };
export type { Enrollment };