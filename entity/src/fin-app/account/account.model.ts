import { Schema } from 'mongoose';
import { IOperation } from '../operation';

export interface IAccount {
    Id: Schema.Types.ObjectId;
    Title: string;
    Balance: number;
    Active: boolean;
    Owner: Schema.Types.ObjectId;
    Description: string;
}

export interface IAccountWithOperations extends IAccount {
    Operations: IOperation[]
}