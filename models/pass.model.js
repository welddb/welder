import { model, Schema, models } from "mongoose";

const PassSchema = new Schema({
    seamId: {
        type: Schema.Types.ObjectId,
        ref: 'Welder'
    },
    voltage: {
        type: String
    },
    current: {
        type: String
    },
    gasflow: {
        type: String
    },
    wireDiameter: {
        type: String
    },
    xCoordinate: {
        type: String
    },
    yCoordinate: {
        type: String
    },
    zCoordinate: {
        type: String
    },
}
);

export const Pass = models.Pass || model('Pass', PassSchema);
