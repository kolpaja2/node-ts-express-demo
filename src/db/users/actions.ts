import { UserModel } from './users';

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) =>
    UserModel.findOne({
        email,
    });
export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({
        'authentication.sessionToken': sessionToken,
    });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (vales: Record<string, any>) =>
    new UserModel(vales).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

export const updateUser = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);
