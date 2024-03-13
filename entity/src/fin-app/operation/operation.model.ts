import {Schema} from 'mongoose';

export interface IOperation {
    Type: number; // Внешнее/внутреннее
    Cashflow: -1 | 1; // Направление движения ден. средств
    Source: Schema.Types.ObjectId;
    Target: Schema.Types.ObjectId;
    Amount: number;
    Owner: Schema.Types.ObjectId;
    Description: string;
    Timestamp: number;
}