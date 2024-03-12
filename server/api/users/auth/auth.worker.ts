import { User } from "../User";
import { AppDataSource } from "../../../database/db";
import { hashPassword, compareHash } from "../user.utils";
import { sign } from "../../../common/jwt";

interface UserRegister {
    email: string;
    username: string;
    password: string;
    lat: number;
    lon: number;
};

interface UserLogin {
    email: string;
    password: string;
}

const userRepository = AppDataSource.getRepository(User);

const registerUser = async (userData: UserRegister) => {
    try {
        console.log(userData);
        const { email, username, password, lat, lon } = userData
        const validate_email = await userRepository.findOneBy({email});
        if (validate_email) throw {status: 401, message: `Email registered`};
        const validate_username = await userRepository.findOneBy({username});
        if (validate_username) throw {status: 401, message: `Username registered`};
        const user = new User();
        user.email = email;
        user.password = await hashPassword(password, 10);
        user.username = username;
        user.balance = 0.0;
        user.token = sign({email, username});
        user.lat = lat;         
        user.lon = lon;
        await userRepository.save(user);
        return user;
    } catch (err: any) {
        console.error(err);
        throw new Error(`Error to register a new user. ${err.message}`);
    }
};

const login = async (userData: UserLogin) => {
    const { email, password } = userData;
    const user = await userRepository.findOneBy({email});
    if (!user) throw {status: 401, message: `Email not found`};
    const match = await compareHash(password, user.password);
    if (!match) throw {status: 401, message: `Invalid Password`};
    const token = sign({email: user.email, username: user.username})
    user.token = token;
    await userRepository.save(user);
    return user;
}

export default { registerUser, login }