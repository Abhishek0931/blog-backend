import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './src/utils/db.js';
import userRoutes from './src/routes/userRoutes.js';
import categoryRoutes from'./src/routes/categoryRoutes.js';
import subcategoryRoutes from './src/routes/subcategoryRoutes.js';
import blogPostRoutes from './src/routes/blogpostRoutes.js';

await connectDB();

const app = express();

app.use(express.json());
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/', subcategoryRoutes);
app.use('/', blogPostRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    


app.get('/', (req,res) => {
    res.send('node.js backend practice');
});