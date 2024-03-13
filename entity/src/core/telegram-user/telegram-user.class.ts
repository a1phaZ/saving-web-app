import { ITgUser } from "./telegram-user.model";

export class TgUser implements ITgUser {
    private _id!: number | undefined;
    public get Id(): number | undefined {
        return this._id;
    }
    public set Id(value: number | undefined) {
            this._id = value;
    }
    private _firstname!: string | undefined;
    public get FirstName(): string | undefined {
        return this._firstname;
    }
    public set FirstName(value: string | undefined) {
        this._firstname = value;
    }
    private _lastname!: string | undefined;
    public get LastName(): string | undefined {
        return this._lastname;
    }
    public set LastName(value: string | undefined) {
        this._lastname = value;
    }
    private _username!: string | undefined;
    public get UserName(): string | undefined {
        return this._username;
    }
    public set UserName(value: string | undefined) {
        this._username = value;
    }
    private _language_code!: string | undefined;
    public get LanguageCode(): string | undefined {
        return this._language_code;
    }
    public set LanguageCode(value: string | undefined) {
        this._language_code = value;
    }
    private _allows_write_to_pm!: boolean;
    public get AllowsWriteToPm(): boolean {
        return this._allows_write_to_pm;
    }
    public set AllowsWriteToPm(value: boolean) {
        this._allows_write_to_pm = value;
    }
    
    constructor(params: ITgUser) {
        this.initializeModel(params);
    }

    public initializeModel(params: ITgUser): void {
        this.Id = params.Id;
        this.FirstName = params.FirstName;
        this.LastName = params.LastName;
        this.UserName = params.UserName;
        this.LanguageCode = params.LanguageCode;
        this.AllowsWriteToPm = !!params.AllowsWriteToPm;
    }

    public fromModel(): ITgUser {
        return {
            Id: this.Id,
            FirstName: this.FirstName,
            LastName: this.LastName,
            UserName: this.UserName,
            LanguageCode: this.LanguageCode,
            AllowsWriteToPm: this.AllowsWriteToPm,
        }
    }


}