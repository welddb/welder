import { model, Schema, models } from "mongoose";



const MaterialSchema = new Schema({
    composition: String,
    thickness: String,
});

const WelderSchema = new Schema({
    process: { type: String, enum: ['mig', 'tig', 'plasma'], default: 'mig' },
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
    wireDiameter: {
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
