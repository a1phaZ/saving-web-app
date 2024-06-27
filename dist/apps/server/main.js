/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(5);
const app_controller_1 = __webpack_require__(6);
const account_module_1 = __webpack_require__(11);
const app_service_1 = __webpack_require__(7);
const wallet_module_1 = __webpack_require__(14);
const transaction_module_1 = __webpack_require__(20);
__webpack_require__(10);
const db_connect_config_1 = __webpack_require__(24);
const config_1 = __webpack_require__(25);
const bill_module_1 = __webpack_require__(26);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true, // Позволяет обратиться к env во всем приложении
                envFilePath: '.env', // Указываем путь до env файла
            }),
            mongoose_1.MongooseModule.forRootAsync({
                // Модуль для работы с mongo
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: db_connect_config_1.getMongoConfig, // добавляем созданную ранее функцию подключения к БД
            }),
            account_module_1.AccountModule,
            wallet_module_1.WalletModule,
            transaction_module_1.TransactionModule,
            bill_module_1.BillModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(7);
const validate_guard_1 = __webpack_require__(8);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
    validateInitData(req) {
        return { data: true };
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
tslib_1.__decorate([
    (0, common_1.Post)('validate'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "validateInitData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidateGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const node_crypto_1 = __webpack_require__(9);
__webpack_require__(10);
let ValidateGuard = class ValidateGuard {
    canActivate(context) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const _initData = request.headers[process.env.X_HEADER];
        console.log('init data: ', _initData);
        if (this.validateInitData(_initData)) {
            request['user'] = this.getUserObject(_initData);
            return true;
        }
        else {
            return false;
        }
    }
    validateInitData(initData) {
        const data = new URLSearchParams(initData);
        const data_check_string = this.getCheckString(data);
        const secret_key = this.HMAC_SHA256(process.env.VALIDATE_KEY, process.env.BOT_TOKEN).digest();
        const hash = this.HMAC_SHA256(secret_key, data_check_string).digest('hex');
        return hash === data.get('hash');
    }
    HMAC_SHA256(key, secret) {
        return (0, node_crypto_1.createHmac)('sha256', key).update(secret);
    }
    getCheckString(data) {
        const items = [];
        // remove hash
        for (const [k, v] of data.entries())
            if (k !== 'hash')
                items.push([k, v]);
        return items
            .sort(([a], [b]) => a.localeCompare(b)) // sort keys
            .map(([k, v]) => `${k}=${v}`) // combine key-value pairs
            .join('\n');
    }
    getUserObject(initData) {
        const data = new URLSearchParams(initData);
        let result = {};
        const items = [];
        // remove hash
        for (const [k, v] of data.entries())
            if (k !== 'hash')
                items.push([k, v]);
        items.forEach(([k, v]) => {
            if (k === 'user') {
                result = JSON.parse(v);
            }
        });
        return result;
    }
};
exports.ValidateGuard = ValidateGuard;
exports.ValidateGuard = ValidateGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ValidateGuard);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const account_service_1 = __webpack_require__(12);
const account_controller_1 = __webpack_require__(13);
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [account_service_1.AccountService],
        controllers: [account_controller_1.AccountController],
    })
], AccountModule);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AccountService = class AccountService {
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AccountService);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const account_service_1 = __webpack_require__(12);
let AccountController = class AccountController {
    constructor(_accountService) {
        this._accountService = _accountService;
    }
};
exports.AccountController = AccountController;
exports.AccountController = AccountController = tslib_1.__decorate([
    (0, common_1.Controller)('account'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _a : Object])
], AccountController);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const wallet_controller_1 = __webpack_require__(15);
const wallet_service_1 = __webpack_require__(16);
const mongoose_1 = __webpack_require__(5);
const wallet_schema_1 = __webpack_require__(17);
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: wallet_schema_1.WalletModel.name, schema: wallet_schema_1.WalletSchema },
            ]),
        ],
        controllers: [wallet_controller_1.WalletController],
        providers: [wallet_service_1.WalletService],
    })
], WalletModule);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const validate_guard_1 = __webpack_require__(8);
const wallet_service_1 = __webpack_require__(16);
const owner_id_decorator_1 = __webpack_require__(19);
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    // TODO https://docs.nestjs.com/custom-decorators#param-decorators
    getWallets(owner) {
        return this.walletService.get(owner);
    }
    async getTotalBalance(owner) {
        const totalArray = await this.walletService.getTotalBalance(owner);
        return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
    }
    async getTotalBalanceActive(owner) {
        const totalArray = await this.walletService.getTotalBalance(owner, true, false);
        return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
    }
    async getTotalBalanceInactive(owner) {
        const totalArray = await this.walletService.getTotalBalance(owner, false, true);
        return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
    }
    addWallet(req, owner) {
        return this.walletService.add({
            Title: req.body.Title,
            Description: req.body.Description,
            Balance: req.body.Balance,
            Active: !!req.body.Active,
            Owner: owner,
        });
    }
    deleteWallet(req, owner) {
        return this.walletService.deleteOne(owner, req.params.id);
    }
    deleteAllWallets(owner) {
        return this.walletService.deleteAll(owner);
    }
};
exports.WalletController = WalletController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], WalletController.prototype, "getWallets", null);
tslib_1.__decorate([
    (0, common_1.Get)('total'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletController.prototype, "getTotalBalance", null);
tslib_1.__decorate([
    (0, common_1.Get)('total/active'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletController.prototype, "getTotalBalanceActive", null);
tslib_1.__decorate([
    (0, common_1.Get)('total/inactive'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletController.prototype, "getTotalBalanceInactive", null);
tslib_1.__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], WalletController.prototype, "addWallet", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], WalletController.prototype, "deleteWallet", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], WalletController.prototype, "deleteAllWallets", null);
exports.WalletController = WalletController = tslib_1.__decorate([
    (0, common_1.Controller)('wallet'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof wallet_service_1.WalletService !== "undefined" && wallet_service_1.WalletService) === "function" ? _a : Object])
], WalletController);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(5);
const wallet_schema_1 = __webpack_require__(17);
const mongoose_2 = __webpack_require__(18);
let WalletService = class WalletService {
    constructor(walletModel) {
        this.walletModel = walletModel;
    }
    async get(owner) {
        return this.walletModel.find({ Owner: owner }).exec();
    }
    async add(data) {
        const dataToSave = {
            Title: data.Title,
            Description: data.Description,
            Balance: data.Balance,
            Active: !!data.Active,
            Owner: data.Owner,
        };
        const createdWallet = new this.walletModel(dataToSave);
        return createdWallet.save();
    }
    async getTotalBalance(owner, active = true, inactive = true) {
        let _match = { Owner: owner };
        if (active && !inactive) {
            _match = { ..._match, Active: true };
        }
        else if (!active && inactive) {
            _match = { ..._match, Active: false };
        }
        return this.walletModel
            .aggregate([
            { $match: _match },
            { $group: { _id: null, total: { $sum: '$Balance' } } },
        ])
            .exec();
    }
    async deleteOne(owner, id) {
        return this.walletModel.deleteOne({ Owner: owner, _id: id }).exec();
    }
    async deleteAll(owner) {
        return this.walletModel.deleteMany({ Owner: owner }).exec();
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(wallet_schema_1.WalletModel.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], WalletService);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletSchema = exports.WalletModel = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
let WalletModel = class WalletModel {
};
exports.WalletModel = WalletModel;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WalletModel.prototype, "Title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], WalletModel.prototype, "Balance", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], WalletModel.prototype, "Active", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: -1,
    }),
    tslib_1.__metadata("design:type", Number)
], WalletModel.prototype, "Owner", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], WalletModel.prototype, "Description", void 0);
exports.WalletModel = WalletModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], WalletModel);
exports.WalletSchema = mongoose_1.SchemaFactory.createForClass(WalletModel);


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerId = void 0;
const common_1 = __webpack_require__(1);
exports.OwnerId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.id;
});


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const transaction_service_1 = __webpack_require__(21);
const transaction_controller_1 = __webpack_require__(23);
const mongoose_1 = __webpack_require__(5);
const transaction_schema_1 = __webpack_require__(22);
const wallet_schema_1 = __webpack_require__(17);
let TransactionModule = class TransactionModule {
};
exports.TransactionModule = TransactionModule;
exports.TransactionModule = TransactionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: transaction_schema_1.TransactionModel.name,
                    useFactory: (walletModel) => {
                        const schema = transaction_schema_1.TransactionSchema;
                        schema.post('save', async function () {
                            const source = this.Source;
                            const target = this.Target;
                            const owner = this.Owner;
                            const cashflow = this.Cashflow;
                            if (cashflow === -1) {
                                await walletModel
                                    .findOneAndUpdate({ Owner: owner, _id: source }, { $inc: { Balance: this.Amount } })
                                    .exec();
                            }
                            else {
                                await walletModel
                                    .findOneAndUpdate({ Owner: owner, _id: target }, { $inc: { Balance: this.Amount } })
                                    .exec();
                            }
                        });
                        return schema;
                    },
                    inject: [(0, mongoose_1.getModelToken)(wallet_schema_1.WalletModel.name)],
                    // schema: TransactionSchema,
                },
                {
                    name: wallet_schema_1.WalletModel.name,
                    useFactory: () => wallet_schema_1.WalletSchema,
                },
            ]),
        ],
        providers: [transaction_service_1.TransactionService],
        controllers: [transaction_controller_1.TransactionController],
    })
], TransactionModule);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(5);
const transaction_schema_1 = __webpack_require__(22);
const mongoose_2 = __webpack_require__(18);
let TransactionService = class TransactionService {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }
    async getAll(owner) {
        return this.transactionModel.find({ Owner: owner }).exec();
    }
    async get(owner, walletId) {
        return this.transactionModel
            .find({ Owner: owner, Source: walletId })
            .exec();
    }
    async add(data) {
        const dataToSave = {
            Type: data.Type,
            Cashflow: data.Cashflow,
            Source: data.Source,
            Target: data.Target,
            Amount: data.Amount * data.Cashflow,
            Owner: data.Owner,
            Description: data.Description,
            Timestamp: data.Timestamp,
        };
        const createdTransaction = new this.transactionModel(dataToSave);
        return createdTransaction.save();
    }
    async deleteOne(owner, id) {
        return this.transactionModel.deleteOne({ Owner: owner, _id: id }).exec();
    }
    async deleteAll(owner) {
        return this.transactionModel.deleteMany({ Owner: owner }).exec();
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.TransactionModel.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], TransactionService);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionSchema = exports.TransactionModel = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
let TransactionModel = class TransactionModel {
};
exports.TransactionModel = TransactionModel;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], TransactionModel.prototype, "Type", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], TransactionModel.prototype, "Cashflow", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({}),
    tslib_1.__metadata("design:type", String)
], TransactionModel.prototype, "Source", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({}),
    tslib_1.__metadata("design:type", String)
], TransactionModel.prototype, "Target", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], TransactionModel.prototype, "Amount", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], TransactionModel.prototype, "Owner", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], TransactionModel.prototype, "Description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], TransactionModel.prototype, "Timestamp", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], TransactionModel.prototype, "Id", void 0);
exports.TransactionModel = TransactionModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], TransactionModel);
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(TransactionModel);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const transaction_service_1 = __webpack_require__(21);
const validate_guard_1 = __webpack_require__(8);
const owner_id_decorator_1 = __webpack_require__(19);
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    getAllTransactions(owner) {
        return this.transactionService.getAll(owner);
    }
    getTransactions(walletId, req, owner) {
        return this.transactionService.get(owner, walletId);
    }
    addTransaction(body, req, owner) {
        return this.transactionService.add({
            Type: body.Type,
            Cashflow: body.Cashflow,
            Source: body.Source,
            Target: body.Target,
            Amount: body.Amount,
            Owner: owner,
            Description: body.Description,
            Timestamp: body.Timestamp,
        });
    }
    deleteTransaction(id, req, owner) {
        return this.transactionService.deleteOne(owner, id);
    }
    deleteAllTransactions(owner) {
        return this.transactionService.deleteAll(owner);
    }
};
exports.TransactionController = TransactionController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], TransactionController.prototype, "getAllTransactions", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:walletId'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Param)('walletId')),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], TransactionController.prototype, "getTransactions", null);
tslib_1.__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], TransactionController.prototype, "addTransaction", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], TransactionController.prototype, "deleteTransaction", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], TransactionController.prototype, "deleteAllTransactions", null);
exports.TransactionController = TransactionController = tslib_1.__decorate([
    (0, common_1.Controller)('transaction'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof transaction_service_1.TransactionService !== "undefined" && transaction_service_1.TransactionService) === "function" ? _a : Object])
], TransactionController);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMongoConfig = void 0;
const getMongoString = (configService) => 'mongodb://' +
    configService.get('DB_LOGIN') +
    ':' +
    configService.get('DB_PASSWORD') +
    '@' +
    configService.get('DB_HOST') +
    ':' +
    configService.get('DB_PORT') +
    '/' +
    configService.get('DB_AUTHDATABASE');
const getMongoOptions = () => ({
// useNewUrlParser: true,
// useUnifiedTopology: true,
});
const getMongoConfig = async (configService) => {
    console.log(getMongoString(configService));
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};
exports.getMongoConfig = getMongoConfig;


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const bill_controller_1 = __webpack_require__(27);
const bill_service_1 = __webpack_require__(28);
const mongoose_1 = __webpack_require__(5);
const bill_schema_1 = __webpack_require__(29);
const bill_history_item_schema_1 = __webpack_require__(30);
let BillModule = class BillModule {
};
exports.BillModule = BillModule;
exports.BillModule = BillModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: bill_schema_1.BillModel.name,
                    schema: bill_schema_1.BillSchema,
                },
                {
                    name: bill_history_item_schema_1.BillHistoryItemModel.name,
                    schema: bill_history_item_schema_1.BillHistoryItemSchema,
                },
            ]),
        ],
        controllers: [bill_controller_1.BillController],
        providers: [bill_service_1.BillService],
    })
], BillModule);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const bill_service_1 = __webpack_require__(28);
const owner_id_decorator_1 = __webpack_require__(19);
const validate_guard_1 = __webpack_require__(8);
let BillController = class BillController {
    constructor(billService) {
        this.billService = billService;
    }
    getBills(owner) {
        return this.billService.get(owner);
    }
    getBillHistory(id, owner) {
        return this.billService.getHistory(owner);
    }
    getBillHistoryByBillId(id, owner) {
        return this.billService.getHistoryByBillId(id, owner);
    }
    addBill(body, owner) {
        console.log(body);
        return this.billService.add({
            Title: body.Title,
            Description: body.Description,
            Owner: owner,
            Sum: body.Sum,
            Period: body.Period,
            StopDate: body.StopDate,
            PaidDate: body.PaidDate,
        });
    }
    payBill(body, owner) {
        return this.billService.payBill(body.Id, owner);
    }
    deleteBill(id, owner) {
        return this.billService.deleteBill(id, owner);
    }
};
exports.BillController = BillController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BillController.prototype, "getBills", null);
tslib_1.__decorate([
    (0, common_1.Get)('history'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BillController.prototype, "getBillHistory", null);
tslib_1.__decorate([
    (0, common_1.Get)('history/:id'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BillController.prototype, "getBillHistoryByBillId", null);
tslib_1.__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BillController.prototype, "addBill", null);
tslib_1.__decorate([
    (0, common_1.Post)('pay'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BillController.prototype, "payBill", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(new validate_guard_1.ValidateGuard()),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, owner_id_decorator_1.OwnerId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], BillController.prototype, "deleteBill", null);
exports.BillController = BillController = tslib_1.__decorate([
    (0, common_1.Controller)('bill'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof bill_service_1.BillService !== "undefined" && bill_service_1.BillService) === "function" ? _a : Object])
], BillController);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(5);
const bill_schema_1 = __webpack_require__(29);
const mongoose_2 = __webpack_require__(18);
const bill_history_item_schema_1 = __webpack_require__(30);
// import { BillHistoryItemModel } from '../../schemas/bill-history-item.schema';
let BillService = class BillService {
    constructor(billModel, billHistoryItemModel) {
        this.billModel = billModel;
        this.billHistoryItemModel = billHistoryItemModel;
    }
    async get(owner) {
        return this.billModel.find({ Owner: owner }).exec();
    }
    async getHistory(owner) {
        return this.billHistoryItemModel.find({ Owner: owner }).exec();
    }
    async getHistoryByBillId(billId, owner) {
        return this.billHistoryItemModel
            .findOne({ Owner: owner, Bill: billId })
            .populate('Bill')
            .exec();
    }
    async add(data) {
        const dataToSave = {
            Title: data.Title,
            Description: data.Description,
            Owner: data.Owner,
            Sum: data.Sum,
            Period: data.Period,
            StopDate: data.StopDate,
            PaidDate: data.PaidDate,
        };
        const createdBill = new this.billModel(dataToSave);
        return createdBill.save();
    }
    async payBill(billId, owner) {
        const bill = await this.billModel
            .findOne({ _id: billId, Owner: owner })
            .exec();
        if (!bill) {
            return;
        }
        const billHistoryItem = new this.billHistoryItemModel({
            Bill: billId,
            Sum: bill.Sum,
            Description: bill.Description,
            Owner: owner,
        });
        return billHistoryItem.save();
        // bill.Active = false;
        // bill.save();
    }
    async deleteBill(id, owner) {
        await this.billHistoryItemModel
            .deleteMany({ Bill: id, Owner: owner })
            .exec();
        return this.billModel.deleteOne({ _id: id, Owner: owner }).exec();
    }
};
exports.BillService = BillService;
exports.BillService = BillService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(bill_schema_1.BillModel.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(bill_history_item_schema_1.BillHistoryItemModel.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], BillService);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillSchema = exports.BillModel = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
let BillModel = class BillModel {
};
exports.BillModel = BillModel;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], BillModel.prototype, "Title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], BillModel.prototype, "Sum", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], BillModel.prototype, "PaidDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], BillModel.prototype, "Period", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BillModel.prototype, "StopDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], BillModel.prototype, "Owner", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BillModel.prototype, "Description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], BillModel.prototype, "Active", void 0);
exports.BillModel = BillModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], BillModel);
exports.BillSchema = mongoose_1.SchemaFactory.createForClass(BillModel);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillHistoryItemSchema = exports.BillHistoryItemModel = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = tslib_1.__importDefault(__webpack_require__(18));
const bill_schema_1 = __webpack_require__(29);
let BillHistoryItemModel = class BillHistoryItemModel {
};
exports.BillHistoryItemModel = BillHistoryItemModel;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: bill_schema_1.BillModel.name,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof bill_schema_1.BillModel !== "undefined" && bill_schema_1.BillModel) === "function" ? _a : Object)
], BillHistoryItemModel.prototype, "Bill", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], BillHistoryItemModel.prototype, "Sum", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BillHistoryItemModel.prototype, "Description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], BillHistoryItemModel.prototype, "Owner", void 0);
exports.BillHistoryItemModel = BillHistoryItemModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], BillHistoryItemModel);
exports.BillHistoryItemSchema = mongoose_1.SchemaFactory.createForClass(BillHistoryItemModel);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;