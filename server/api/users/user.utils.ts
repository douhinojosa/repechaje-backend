import bcrypt from "bcrypt";

export const hashPassword = async (password: string, rounds: number) => {
    try {
        const salt = await bcrypt.genSalt(rounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error(err);
        throw new Error(`Hashing password error. ${err}`);
    }
};

export const compareHash = async (password: string, userPass: string) => await bcrypt.compare(password, userPass);