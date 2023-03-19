import { model, Schema, models } from "mongoose";


const ProcessSchema = new Schema({
    mig: String,
    tig: String,
    plasma: String,
});
const MaterialSchema = new Schema({
    composition: String,
    thickness: String,
});

const WelderSchema = new Schema({
    process: {
        type: ProcessSchema
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
    preheatTemp: {
        type: String
    },
    wireFeedSpeed: {
        type: String
    },
    filler: {
        type: String
    },
    fileUrl: {
        type: String
    },
    gas: {
        type: String
    },
    baseMaterail1: {
        type: MaterialSchema
    },
    baseMaterail2: {
        type: MaterialSchema
    },

}
);

export const Welder = models.Welder || model('Welder', WelderSchema);
    