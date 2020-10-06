import mongoose from 'mongoose';

const connectDB = async ()=>{
    try{
      const conn = await mongoose.connect(process.env.MONGO_DB,{
          useFindAndModify: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
      })
      console.log(`MongoDB connected`)
    }catch(err){
       console.log(err);
    }
}
export default connectDB 