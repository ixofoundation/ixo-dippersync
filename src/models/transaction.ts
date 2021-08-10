export interface ITransaction{
    txhash: string;
    height: number;
    processed: boolean;
    tx: ITx;
    tx_response: ITxResponse;
}

interface ITx{
    body: IBody;
    auth_info: IAuthInfo;
    signatures: string[];
}

interface IBody{
    messages: IMessage[];
    memo: string;
    timeout_height: string;
    extension_options: string[]; // TODO - always empty
    non_critical_extension_options: string[]; // TODO - always empty
}

interface IMessage{
    "@type": string;
    from_address: string;
    to_address: string;
    amount: IAmount[];
}

interface IAmount{
    denom: string;
    amount: string;
}

interface IAuthInfo{
    signer_infos: ISignerInfo[];
    fee: IFee;
}

interface ISignerInfo{
    public_key: IPublicKey;
    mode_info: IModeInfo;
    sequence: string;
}

interface IPublicKey{
    "@type": string;
    key: string;
}

interface IModeInfo{
    single: ISingle;
}

interface ISingle{
    mode: string;
}

interface IFee{
    amount: IAmount[];
    gas_limit: string;
    payer: string;
    granter: string;
}

interface ITxResponse{
    height: string;
    txhash: string;
    codespace: string;
    code: number;
    data: string;
    raw_log: string;
    logs: ILog[];
    info: string;
    gas_wanted: string;
    gas_used: string;
    tx: ITxTwo;
    timestamp: string;
}

interface ILog{
    msg_index: number;
    log: string;
    events: IEvent[];
}

interface IEvent{
    type: string;
    attributes: IKVPair[];
}

interface IKVPair {
    key: string;
    value: string;
}

interface ITxTwo{
    "@type": string;
    body: IBody;
    auth_info: IAuthInfo;
    signatures: string[];
}

