import { model, Schema, models } from "mongoose";
import bcrypt from 'bcrypt';
const UserSchema = new Schema({
    userName:String,
    email:{
        type: String,
        unique:true,
        index:true,
    },
    password:String,
    joinDate:{type:Schema.Types.Date, default:new Date().toISOString()},
    role:{type:String, enum:['admin','supervisor','operator'],default:'operator'},   
},
{
    toJSON: {
      transform: (doc, ret) => {
        const { password, ...rest } = ret;
        return rest;
      },
      versionKey: false,
    },
  },
);

UserSchema.pre('save',{document:true,query:false} ,async function encrypt(next) {
    if (this.isModified('password')) {
      console.log('got here inner');
      const hash = await this.encryptPassword(this.password);
      this.password = hash;
    }
    return next();
  });
  
  UserSchema.methods = {
    async authenticate(plainTextPassword) {
      try {
        return await bcrypt.compare(plainTextPassword, this.password);
      } catch (err) {
        return false;
      }
    },
    encryptPassword(password){
      return bcrypt.hash(password, bcrypt.genSaltSync(Number(process.env.SALT_SECRET)));
    },
  };
export const User = models.User || model('User', UserSchema);
    