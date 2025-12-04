import bcrypt from 'bcrypt';

export const hashPassword = async (data) => {
    try {

        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(data, salt);
        
    } catch (error) {

        console.error(`Error hashing data. Error: ${error}`);
        
    }
};

export const comparePassword = async (data, hash) => {
    try {

        return await bcrypt.compare(data, hash);
        
    } catch (error) {

        console.error(`Error comparing data. Error: ${error}`);
        
    }
};