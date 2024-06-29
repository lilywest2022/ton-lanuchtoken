import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type PoolStorage = {
    $$type: 'PoolStorage';
    router_address: Address;
    lp_fee: bigint;
    protocol_fee: bigint;
    ref_fee: bigint;
    token0_address: Address;
    token1_address: Address;
    total_supply_lp: bigint;
    collected_token0_protocol_fee: bigint;
    collected_token1_protocol_fee: bigint;
    protocol_fee_address: Address;
    reserve0: bigint;
    reserve1: bigint;
    jetton_lp_wallet_code: Cell;
    lp_account_code: Cell;
}

export function storePoolStorage(src: PoolStorage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4031786317, 32);
        b_0.storeAddress(src.router_address);
        b_0.storeUint(src.lp_fee, 8);
        b_0.storeUint(src.protocol_fee, 8);
        b_0.storeUint(src.ref_fee, 8);
        b_0.storeAddress(src.token0_address);
        b_0.storeAddress(src.token1_address);
        b_0.storeCoins(src.total_supply_lp);
        let b_1 = new Builder();
        b_1.storeCoins(src.collected_token0_protocol_fee);
        b_1.storeCoins(src.collected_token1_protocol_fee);
        b_1.storeAddress(src.protocol_fee_address);
        b_1.storeCoins(src.reserve0);
        b_1.storeCoins(src.reserve1);
        b_1.storeRef(src.jetton_lp_wallet_code);
        b_1.storeRef(src.lp_account_code);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolStorage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4031786317) { throw Error('Invalid prefix'); }
    let _router_address = sc_0.loadAddress();
    let _lp_fee = sc_0.loadUintBig(8);
    let _protocol_fee = sc_0.loadUintBig(8);
    let _ref_fee = sc_0.loadUintBig(8);
    let _token0_address = sc_0.loadAddress();
    let _token1_address = sc_0.loadAddress();
    let _total_supply_lp = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _collected_token0_protocol_fee = sc_1.loadCoins();
    let _collected_token1_protocol_fee = sc_1.loadCoins();
    let _protocol_fee_address = sc_1.loadAddress();
    let _reserve0 = sc_1.loadCoins();
    let _reserve1 = sc_1.loadCoins();
    let _jetton_lp_wallet_code = sc_1.loadRef();
    let _lp_account_code = sc_1.loadRef();
    return { $$type: 'PoolStorage' as const, router_address: _router_address, lp_fee: _lp_fee, protocol_fee: _protocol_fee, ref_fee: _ref_fee, token0_address: _token0_address, token1_address: _token1_address, total_supply_lp: _total_supply_lp, collected_token0_protocol_fee: _collected_token0_protocol_fee, collected_token1_protocol_fee: _collected_token1_protocol_fee, protocol_fee_address: _protocol_fee_address, reserve0: _reserve0, reserve1: _reserve1, jetton_lp_wallet_code: _jetton_lp_wallet_code, lp_account_code: _lp_account_code };
}

function loadTuplePoolStorage(source: TupleReader) {
    let _router_address = source.readAddress();
    let _lp_fee = source.readBigNumber();
    let _protocol_fee = source.readBigNumber();
    let _ref_fee = source.readBigNumber();
    let _token0_address = source.readAddress();
    let _token1_address = source.readAddress();
    let _total_supply_lp = source.readBigNumber();
    let _collected_token0_protocol_fee = source.readBigNumber();
    let _collected_token1_protocol_fee = source.readBigNumber();
    let _protocol_fee_address = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _jetton_lp_wallet_code = source.readCell();
    let _lp_account_code = source.readCell();
    return { $$type: 'PoolStorage' as const, router_address: _router_address, lp_fee: _lp_fee, protocol_fee: _protocol_fee, ref_fee: _ref_fee, token0_address: _token0_address, token1_address: _token1_address, total_supply_lp: _total_supply_lp, collected_token0_protocol_fee: _collected_token0_protocol_fee, collected_token1_protocol_fee: _collected_token1_protocol_fee, protocol_fee_address: _protocol_fee_address, reserve0: _reserve0, reserve1: _reserve1, jetton_lp_wallet_code: _jetton_lp_wallet_code, lp_account_code: _lp_account_code };
}

function storeTuplePoolStorage(source: PoolStorage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.router_address);
    builder.writeNumber(source.lp_fee);
    builder.writeNumber(source.protocol_fee);
    builder.writeNumber(source.ref_fee);
    builder.writeAddress(source.token0_address);
    builder.writeAddress(source.token1_address);
    builder.writeNumber(source.total_supply_lp);
    builder.writeNumber(source.collected_token0_protocol_fee);
    builder.writeNumber(source.collected_token1_protocol_fee);
    builder.writeAddress(source.protocol_fee_address);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeCell(source.jetton_lp_wallet_code);
    builder.writeCell(source.lp_account_code);
    return builder.build();
}

function dictValueParserPoolStorage(): DictionaryValue<PoolStorage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolStorage(src)).endCell());
        },
        parse: (src) => {
            return loadPoolStorage(src.loadRef().beginParse());
        }
    }
}

export type StonfiProvideLiquidity = {
    $$type: 'StonfiProvideLiquidity';
    token_wallet: Address;
    min_lp_out: bigint;
}

export function storeStonfiProvideLiquidity(src: StonfiProvideLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4244235663, 32);
        b_0.storeAddress(src.token_wallet);
        b_0.storeCoins(src.min_lp_out);
    };
}

export function loadStonfiProvideLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4244235663) { throw Error('Invalid prefix'); }
    let _token_wallet = sc_0.loadAddress();
    let _min_lp_out = sc_0.loadCoins();
    return { $$type: 'StonfiProvideLiquidity' as const, token_wallet: _token_wallet, min_lp_out: _min_lp_out };
}

function loadTupleStonfiProvideLiquidity(source: TupleReader) {
    let _token_wallet = source.readAddress();
    let _min_lp_out = source.readBigNumber();
    return { $$type: 'StonfiProvideLiquidity' as const, token_wallet: _token_wallet, min_lp_out: _min_lp_out };
}

function storeTupleStonfiProvideLiquidity(source: StonfiProvideLiquidity) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token_wallet);
    builder.writeNumber(source.min_lp_out);
    return builder.build();
}

function dictValueParserStonfiProvideLiquidity(): DictionaryValue<StonfiProvideLiquidity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStonfiProvideLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadStonfiProvideLiquidity(src.loadRef().beginParse());
        }
    }
}

export type ProvideLiquidity = {
    $$type: 'ProvideLiquidity';
    jettonAmount: bigint;
    fromAddress: Address;
    providerLiquidityBody: StonfiProvideLiquidity;
}

export function storeProvideLiquidity(src: ProvideLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeCoins(src.jettonAmount);
        b_0.storeAddress(src.fromAddress);
        b_0.store(storeStonfiProvideLiquidity(src.providerLiquidityBody));
    };
}

export function loadProvideLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _jettonAmount = sc_0.loadCoins();
    let _fromAddress = sc_0.loadAddress();
    let _providerLiquidityBody = loadStonfiProvideLiquidity(sc_0);
    return { $$type: 'ProvideLiquidity' as const, jettonAmount: _jettonAmount, fromAddress: _fromAddress, providerLiquidityBody: _providerLiquidityBody };
}

function loadTupleProvideLiquidity(source: TupleReader) {
    let _jettonAmount = source.readBigNumber();
    let _fromAddress = source.readAddress();
    const _providerLiquidityBody = loadTupleStonfiProvideLiquidity(source.readTuple());
    return { $$type: 'ProvideLiquidity' as const, jettonAmount: _jettonAmount, fromAddress: _fromAddress, providerLiquidityBody: _providerLiquidityBody };
}

function storeTupleProvideLiquidity(source: ProvideLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonAmount);
    builder.writeAddress(source.fromAddress);
    builder.writeTuple(storeTupleStonfiProvideLiquidity(source.providerLiquidityBody));
    return builder.build();
}

function dictValueParserProvideLiquidity(): DictionaryValue<ProvideLiquidity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadProvideLiquidity(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Cell;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.asCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type ContractInformation = {
    $$type: 'ContractInformation';
    fee: bigint;
    owner: Address;
    testAddress: Address;
    hasminted: boolean;
}

export function storeContractInformation(src: ContractInformation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.fee, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.testAddress);
        b_0.storeBit(src.hasminted);
    };
}

export function loadContractInformation(slice: Slice) {
    let sc_0 = slice;
    let _fee = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _testAddress = sc_0.loadAddress();
    let _hasminted = sc_0.loadBit();
    return { $$type: 'ContractInformation' as const, fee: _fee, owner: _owner, testAddress: _testAddress, hasminted: _hasminted };
}

function loadTupleContractInformation(source: TupleReader) {
    let _fee = source.readBigNumber();
    let _owner = source.readAddress();
    let _testAddress = source.readAddress();
    let _hasminted = source.readBoolean();
    return { $$type: 'ContractInformation' as const, fee: _fee, owner: _owner, testAddress: _testAddress, hasminted: _hasminted };
}

function storeTupleContractInformation(source: ContractInformation) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.fee);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.testAddress);
    builder.writeBoolean(source.hasminted);
    return builder.build();
}

function dictValueParserContractInformation(): DictionaryValue<ContractInformation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractInformation(src)).endCell());
        },
        parse: (src) => {
            return loadContractInformation(src.loadRef().beginParse());
        }
    }
}

export type CreateNewPoolConfig = {
    $$type: 'CreateNewPoolConfig';
    swapRouterAddress: Address;
    proxyTon: Address;
    tonValueAddMeme: bigint;
    tonValueAddPton: bigint;
    routerPtonWallet: Address;
}

export function storeCreateNewPoolConfig(src: CreateNewPoolConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.swapRouterAddress);
        b_0.storeAddress(src.proxyTon);
        b_0.storeCoins(src.tonValueAddMeme);
        b_0.storeCoins(src.tonValueAddPton);
        let b_1 = new Builder();
        b_1.storeAddress(src.routerPtonWallet);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateNewPoolConfig(slice: Slice) {
    let sc_0 = slice;
    let _swapRouterAddress = sc_0.loadAddress();
    let _proxyTon = sc_0.loadAddress();
    let _tonValueAddMeme = sc_0.loadCoins();
    let _tonValueAddPton = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _routerPtonWallet = sc_1.loadAddress();
    return { $$type: 'CreateNewPoolConfig' as const, swapRouterAddress: _swapRouterAddress, proxyTon: _proxyTon, tonValueAddMeme: _tonValueAddMeme, tonValueAddPton: _tonValueAddPton, routerPtonWallet: _routerPtonWallet };
}

function loadTupleCreateNewPoolConfig(source: TupleReader) {
    let _swapRouterAddress = source.readAddress();
    let _proxyTon = source.readAddress();
    let _tonValueAddMeme = source.readBigNumber();
    let _tonValueAddPton = source.readBigNumber();
    let _routerPtonWallet = source.readAddress();
    return { $$type: 'CreateNewPoolConfig' as const, swapRouterAddress: _swapRouterAddress, proxyTon: _proxyTon, tonValueAddMeme: _tonValueAddMeme, tonValueAddPton: _tonValueAddPton, routerPtonWallet: _routerPtonWallet };
}

function storeTupleCreateNewPoolConfig(source: CreateNewPoolConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.swapRouterAddress);
    builder.writeAddress(source.proxyTon);
    builder.writeNumber(source.tonValueAddMeme);
    builder.writeNumber(source.tonValueAddPton);
    builder.writeAddress(source.routerPtonWallet);
    return builder.build();
}

function dictValueParserCreateNewPoolConfig(): DictionaryValue<CreateNewPoolConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateNewPoolConfig(src)).endCell());
        },
        parse: (src) => {
            return loadCreateNewPoolConfig(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    amount: bigint;
    receiver: Address;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4235234258, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235234258) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type CreateNewJettonMint = {
    $$type: 'CreateNewJettonMint';
    amount: bigint;
    receiver: Address;
}

export function storeCreateNewJettonMint(src: CreateNewJettonMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1037115371, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadCreateNewJettonMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1037115371) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: 'CreateNewJettonMint' as const, amount: _amount, receiver: _receiver };
}

function loadTupleCreateNewJettonMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'CreateNewJettonMint' as const, amount: _amount, receiver: _receiver };
}

function storeTupleCreateNewJettonMint(source: CreateNewJettonMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserCreateNewJettonMint(): DictionaryValue<CreateNewJettonMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateNewJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadCreateNewJettonMint(src.loadRef().beginParse());
        }
    }
}

export type CreateNewJetton = {
    $$type: 'CreateNewJetton';
    token_owner: Address;
    content: Cell;
    max_supply: bigint;
    rate: bigint;
    lanuch_rate: bigint;
    isLanuch: boolean;
    config: CreateNewPoolConfig;
}

export function storeCreateNewJetton(src: CreateNewJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1019513059, 32);
        b_0.storeAddress(src.token_owner);
        b_0.storeRef(src.content);
        b_0.storeInt(src.max_supply, 257);
        b_0.storeInt(src.rate, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.lanuch_rate, 257);
        b_1.storeBit(src.isLanuch);
        let b_2 = new Builder();
        b_2.store(storeCreateNewPoolConfig(src.config));
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateNewJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1019513059) { throw Error('Invalid prefix'); }
    let _token_owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _max_supply = sc_0.loadIntBig(257);
    let _rate = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _lanuch_rate = sc_1.loadIntBig(257);
    let _isLanuch = sc_1.loadBit();
    let sc_2 = sc_1.loadRef().beginParse();
    let _config = loadCreateNewPoolConfig(sc_2);
    return { $$type: 'CreateNewJetton' as const, token_owner: _token_owner, content: _content, max_supply: _max_supply, rate: _rate, lanuch_rate: _lanuch_rate, isLanuch: _isLanuch, config: _config };
}

function loadTupleCreateNewJetton(source: TupleReader) {
    let _token_owner = source.readAddress();
    let _content = source.readCell();
    let _max_supply = source.readBigNumber();
    let _rate = source.readBigNumber();
    let _lanuch_rate = source.readBigNumber();
    let _isLanuch = source.readBoolean();
    const _config = loadTupleCreateNewPoolConfig(source.readTuple());
    return { $$type: 'CreateNewJetton' as const, token_owner: _token_owner, content: _content, max_supply: _max_supply, rate: _rate, lanuch_rate: _lanuch_rate, isLanuch: _isLanuch, config: _config };
}

function storeTupleCreateNewJetton(source: CreateNewJetton) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token_owner);
    builder.writeCell(source.content);
    builder.writeNumber(source.max_supply);
    builder.writeNumber(source.rate);
    builder.writeNumber(source.lanuch_rate);
    builder.writeBoolean(source.isLanuch);
    builder.writeTuple(storeTupleCreateNewPoolConfig(source.config));
    return builder.build();
}

function dictValueParserCreateNewJetton(): DictionaryValue<CreateNewJetton> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateNewJetton(src)).endCell());
        },
        parse: (src) => {
            return loadCreateNewJetton(src.loadRef().beginParse());
        }
    }
}

export type SimpData = {
    $$type: 'SimpData';
    total_supply: bigint;
    owner: Address;
    content: Cell;
    mintable: boolean;
    rate: bigint;
}

export function storeSimpData(src: SimpData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1349238557, 32);
        b_0.storeCoins(src.total_supply);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeBit(src.mintable);
        b_0.storeInt(src.rate, 257);
    };
}

export function loadSimpData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1349238557) { throw Error('Invalid prefix'); }
    let _total_supply = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _mintable = sc_0.loadBit();
    let _rate = sc_0.loadIntBig(257);
    return { $$type: 'SimpData' as const, total_supply: _total_supply, owner: _owner, content: _content, mintable: _mintable, rate: _rate };
}

function loadTupleSimpData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _mintable = source.readBoolean();
    let _rate = source.readBigNumber();
    return { $$type: 'SimpData' as const, total_supply: _total_supply, owner: _owner, content: _content, mintable: _mintable, rate: _rate };
}

function storeTupleSimpData(source: SimpData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeBoolean(source.mintable);
    builder.writeNumber(source.rate);
    return builder.build();
}

function dictValueParserSimpData(): DictionaryValue<SimpData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSimpData(src)).endCell());
        },
        parse: (src) => {
            return loadSimpData(src.loadRef().beginParse());
        }
    }
}

 type LanuchJetton_init_args = {
    $$type: 'LanuchJetton_init_args';
    owner: Address;
    fee: bigint;
    isLanuch: boolean;
}

function initLanuchJetton_init_args(src: LanuchJetton_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.fee, 257);
        b_0.storeBit(src.isLanuch);
    };
}

async function LanuchJetton_init(owner: Address, fee: bigint, isLanuch: boolean) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECcQEAGQAAAQHAAQIBIAIrAQW9XCwDART/APSkE/S88sgLBAIBYgUXA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVF9s88uCCJwYWBLTtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQ/HCL0rrjAiCCED3RH+u64wIgghCvHKJquo6dMNMfAYIQrxyiarry4IHUATFVcNs8NRBnEFZVA3/gIIIQe92X3roHCAoLAcgw0x8BghD8cIvSuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEvhBbyQQI18DgTjGU6HHBZIxf5RSQscF4vL0gQ5oJ/L0gS/RU6KgJrvy9FEY2zx/CQGoMNMfAYIQPdEf67ry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKCAMx8JLPy9IEOaCfy9IEv0VOioCa78vRRGNs8fzJ/CQPwUaGgVXHbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHB/gEAi+CghyMnQEDUEERIEECMCERMCyFVQ2zzJRlAQThA9QO0QRhBF2zwQV1UUDjVhABL4QlJwxwXy4IQE+o7kMNMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIUQzBsFOAgghAsdrlzuuMCIIIQlGqYtrrjAsAADA8UFQKoMSAgbvLQgBCLEHoQaRBbEEoQOUug2zxQeqEobrOOqAggbvLQgHBwgEAKyAGCENUydttYyx/LP8kQNEEwGhAkECNtbds8EFaSNzfiEFcQNkUTUEJ/DWEBtPhBbyQQI18DVYDbPAGBEU0CcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgaxwUZ8vRVBg4BDvhD+CgS2zxdAWww0x8BghAsdrlzuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFUgbBMQA+SBXY/4QW8kE18DgghdFCC+8vT4Q/goUjDbPAKO0jL4QnADgEADcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjIcAHKAMnQECXjDX9dERIBdMhVIIIQ0XNUAFAEyx8Syz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WyX9VMG1t2zxhAeL4QnACgEAEcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjIfwHKAFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WydBFQBMBeMhVIIIQ0XNUAFAEyx8Syz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WyRAjf1UwbW3bPGEBUDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH9gAIqOP/kBgvDcAExbdb50N2vXnfhxPyOQYgzIowlQaLBYPrKMo6yLoLqOFzT4QW8kECNfAyaBOMYCxwXy9HAEf9sx4JEw4nAAyMj4QwHMfwHKAFVwUIf6AlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8zKAIEBAc8AAfoCEsoAyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAczJ7VQCASAYGgIRviju2ebZ42QMJxkAAiYCASAbIwIBIBwhAgFYHR8CTa28kGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eKoPtnjZAwCceAZD4Q/goEts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhdAhGvFu2ebZ42QsAnIAEe+EP4KFKA2zwwVGhgVGmQXQHdt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQThhMiKTJr7fJFy9sM7TqukCwIgAkgnBAznVp5xX50lCwHWFuJkeyAgEgJCYCASBpJQB1sm7jQ1aXBmczovL1FtUGVqakV1em1RNFBybXZiVWFLdVhWUXplNjJxV2VUOEhKNWlCRXpic3JmODGCACEbRiW2ebZ42QsCcqAeTtRNDUAfhj0gABjlr6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1NIAgQEB1wD6ANIA1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEYFxYVFEMwbBjg+CjXCwqDCbry4IkoAbD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdSBAQHXAIEBAdcA1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEVFEMwBdFVA9s8KQAaAYBkqQhwBQR/UENwAQAKVHdlU3YCAVgsSgEFtxXwLQEU/wD0pBP0vPLICy4CAWIvQAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLggkIwPwLuAY5bgCDXIXAh10nCH5UwINcLH94gghAXjUUZuo4aMNMfAYIQF41FGbry4IHTP/oAWWwSMROgAn/gghB73Zfeuo4Z0x8BghB73ZfeuvLggdM/+gBZbBIxE6ACf+Awf+BwIddJwh+VMCDXCx/eIIIQD4p+pbrjAiAxNgIQMNs8bBfbPH8yMwDi0x8BghAPin6luvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIASDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHSAAGR1JJtAeL6AFFmFhUUQzADgDL4QW8kgRFNU8PHBfL0QzBSMNs8qgCCCYy6gKCCCSHqwKAioAGBPrsCvPL0UYShggD1/CHC//L0+ENUEEfbPFw9XTQCwnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUHZwgEBwLEgTUOfIVVDbPMkQVl4iEDkCEDYQNRA02zw1YQDAghAXjUUZUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCAc8WA9qCEBeNRRm6jwgw2zxsFts8f+CCEFlfB7y6js/THwGCEFlfB7y68uCB0z/6ACDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHSAAGR1JJtAeJVMGwU2zx/4DBwNzg8AM7THwGCEBeNRRm68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAUVUVFEMwBPL4QW8kU6LHBbOO0/hDU4vbPAGCAKbUAnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIUkDHBfL03lHIoIIA9fwhwv/y9EC6K9s8EDRLzds8I8IAXTk9OgAs+CdvECGhggkh6sBmtgihggjGXUCgoQLUjtFRo6FQCqFxcChIE1B0yFUwghBzYtCcUAXLHxPLPwH6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJJ0YUUFUUQzBtbds8UAWVMBA1bEHiIW6zkyXCAJFw4pI1W+MNAWE7AUIBIG7y0IBwA8gBghDVMnbbWMsfyz/JRjBxECRDAG1t2zxhAoYw+EFvJIERTVOTxwXy9FGVoYIA9fwhwv/y9EMwUjrbPIIAqZ4BggmMuoCgggkh6sCgErzy9HCAQH8DIG7y0IBFQFJwPT4AZGwx+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDD6ADFx1yH6ADH6ADCnA6sAAc7IVTCCEHvdl95QBcsfE8s/AfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skkVTAUQzBtbds8YQCeyPhDAcx/AcoAVSBa+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVAIBIEFGAhG/2BbZ5tnjYaRCRQG67UTQ1AH4Y9IAAY5F+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT4Pgo1wsKgwm68uCJQwGK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8RAAEcFkBGPhDUyHbPDBUYzBSMF0CASBHSADdu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIJwndHgA+WzYDyfyDqyWayiE4AgFIaUkAdbJu40NWlwZnM6Ly9RbWMzd01FUDNBTlJQVG40WkFITkRlS3FocEZuY3ZHWnNuZUttS2Nvb002MndoggAQW3X7BLART/APSkE/S88sgLTAIBYk1lA37QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFts88uCC2zxsTmMDsAGSMH/gcCHXScIflTAg1wsf3iCCEDzEiOO6jwgw2zxsG9s8f+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHBPUWABitMfAYIQPMSI47ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdSBAQHXAIEBAdcA1AHQgQEB1wDSANQw0FAA7PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEVFEMwNRB7EHoQeRB4VQMDxIF0WiiAZKkIKIBkqQigwWXy9PhBbyQwMoIA9xkighAL68IAvPL0VhIGERQGBRETBQQREgQDEREDAhEQAlQf7ts8MDNQ7KGCAPcZIYIQBfXhALzy9PhD+ChMMFQroFKg2zxcUlRWAhhyiClVIH9VMG1t2zxTYQAcAAAAAGxhbnVjaCBmZWUBjgXQ9AQwbSGBK4UBgBD0D2+h8uCHAYErhSICgBD0FwKCANivAYAQ9A9vofLghxKCANivAQKAEPQXyAHI9ADJAcxwAcoAVUAGVQCiUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSzIEBAc8AEoEBAc8AyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAczJAYZwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFMhVwLucFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgpgGSpCMAAMCmAZKkIwwCTOT1b4w0EgGSpCBaogGSpBAKbWxBLEDoQKVCGXwXjDRBGFRA0QBNYWQHEghAF9eEAcHAsgGSpCMAAkjwgmAyAZKkIUtCo4gEREchZghA90R/rUAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskjRRYEEREEEDxYEDYQNRA02zxhA9pwIHD4KFJQyFmCEPxwi9JQA8sfgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRBMFEMwbW3bPBA2XjEYQzBxKVRJMC9UTzAvVE8wH9s8EGwQWxBKEDlIFkR0FRNx2zwGBENTYVpcAvZsM/hD+ChSUNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgByFmCEPz55Y9QA8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AsldWwJayHEBywDMyXBwgEIhbW2CEA9/SQAH0BA2EFgQSkEwF8hVYNs8yRMUEDRtbds8X2ECnGwz+EP4KPgo2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhQU11eANoC0PQEMG0BggDYrwGAEPQPb6Hy4IcBggDYryICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJArjIWYIQ/Pnlj1ADyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCychxAcsAzMl/cHIh+ChtghAOThwAB9AQNhBaEExBMBfIVWDbPMkQNkAFEFbbPF9hAN6CEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrOVfwHKAMyUcDLKAOIB+gIBzxYBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8YQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wBiAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMARbI+EMBzH8BygBVYGQA6lB2INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFIEBAc8AWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsoAygDIUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMkBzMntVAIBWGZnALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCASBoawIBIGlqABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVdvTWhWUkZRbWIxNEdwUXRaRDFqYWdoblVHQlNCYzNEdDJYWENGRnBmTFJyggAhG3Cbtnm2eNjpBscAKU7UTQ1AH4Y9IAAY6E2zxsF+D4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDSAFUgA9FY2zxtbwH0+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDSANQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wAwECcQJhAlECRuAAQQIwBocCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHD4KEEwcAAIVHVkJlpmyTc=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLanuchJetton_init_args({ $$type: 'LanuchJetton_init_args', owner, fee, isLanuch })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const LanuchJetton_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3688: { message: `Not mintable` },
    4429: { message: `Invalid sender` },
    12241: { message: `Max supply exceeded` },
    14534: { message: `Not owner` },
    16059: { message: `Invalid value` },
    23951: { message: `Insufficient gas` },
    29786: { message: `supply rate has wrong` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    52348: { message: `The CreateNewJettonMint only call once itme` },
    62972: { message: `Invalid balance` },
    63257: { message: `your fee can't afford it` },
}

const LanuchJetton_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PoolStorage","header":4031786317,"fields":[{"name":"router_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"lp_fee","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"protocol_fee","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"ref_fee","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"token0_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"total_supply_lp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"collected_token0_protocol_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"collected_token1_protocol_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"protocol_fee_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve1","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_lp_wallet_code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"lp_account_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StonfiProvideLiquidity","header":4244235663,"fields":[{"name":"token_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"min_lp_out","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ProvideLiquidity","header":1935855772,"fields":[{"name":"jettonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"fromAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"providerLiquidityBody","type":{"kind":"simple","type":"StonfiProvideLiquidity","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ContractInformation","header":null,"fields":[{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"testAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"hasminted","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CreateNewPoolConfig","header":null,"fields":[{"name":"swapRouterAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"proxyTon","type":{"kind":"simple","type":"address","optional":false}},{"name":"tonValueAddMeme","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tonValueAddPton","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"routerPtonWallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateNewJettonMint","header":1037115371,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateNewJetton","header":1019513059,"fields":[{"name":"token_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"max_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lanuch_rate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isLanuch","type":{"kind":"simple","type":"bool","optional":false}},{"name":"config","type":{"kind":"simple","type":"CreateNewPoolConfig","optional":false}}]},
    {"name":"SimpData","header":1349238557,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"rate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const LanuchJetton_getters: ABIGetter[] = [
    {"name":"get_lanuchjetton_data","arguments":[],"returnType":{"kind":"simple","type":"ContractInformation","optional":false}},
]

const LanuchJetton_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateNewJetton"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class LanuchJetton implements Contract {
    
    static async init(owner: Address, fee: bigint, isLanuch: boolean) {
        return await LanuchJetton_init(owner, fee, isLanuch);
    }
    
    static async fromInit(owner: Address, fee: bigint, isLanuch: boolean) {
        const init = await LanuchJetton_init(owner, fee, isLanuch);
        const address = contractAddress(0, init);
        return new LanuchJetton(address, init);
    }
    
    static fromAddress(address: Address) {
        return new LanuchJetton(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LanuchJetton_types,
        getters: LanuchJetton_getters,
        receivers: LanuchJetton_receivers,
        errors: LanuchJetton_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateNewJetton | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateNewJetton') {
            body = beginCell().store(storeCreateNewJetton(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetLanuchjettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_lanuchjetton_data', builder.build())).stack;
        const result = loadTupleContractInformation(source);
        return result;
    }
    
}