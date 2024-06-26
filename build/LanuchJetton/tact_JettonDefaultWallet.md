# TACT Compilation Report
Contract: JettonDefaultWallet
BOC Size: 2133 bytes

# Types
Total Types: 28

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## PoolStorage
TLB: `pool_storage#f0502d4d router_address:address lp_fee:uint8 protocol_fee:uint8 ref_fee:uint8 token0_address:address token1_address:address total_supply_lp:coins collected_token0_protocol_fee:coins collected_token1_protocol_fee:coins protocol_fee_address:address reserve0:coins reserve1:coins jetton_lp_wallet_code:^cell lp_account_code:^cell = PoolStorage`
Signature: `PoolStorage{router_address:address,lp_fee:uint8,protocol_fee:uint8,ref_fee:uint8,token0_address:address,token1_address:address,total_supply_lp:coins,collected_token0_protocol_fee:coins,collected_token1_protocol_fee:coins,protocol_fee_address:address,reserve0:coins,reserve1:coins,jetton_lp_wallet_code:^cell,lp_account_code:^cell}`

## StonfiProvideLiquidity
TLB: `stonfi_provide_liquidity#fcf9e58f token_wallet:address min_lp_out:coins = StonfiProvideLiquidity`
Signature: `StonfiProvideLiquidity{token_wallet:address,min_lp_out:coins}`

## ProvideLiquidity
TLB: `provide_liquidity#7362d09c jettonAmount:coins fromAddress:address providerLiquidityBody:StonfiProvideLiquidity{token_wallet:address,min_lp_out:coins} = ProvideLiquidity`
Signature: `ProvideLiquidity{jettonAmount:coins,fromAddress:address,providerLiquidityBody:StonfiProvideLiquidity{token_wallet:address,min_lp_out:coins}}`

## JettonData
TLB: `_ total_supply:int257 mintable:bool owner:address content:^cell wallet_code:^cell = JettonData`
Signature: `JettonData{total_supply:int257,mintable:bool,owner:address,content:^cell,wallet_code:^cell}`

## JettonWalletData
TLB: `_ balance:int257 owner:address master:address code:^cell = JettonWalletData`
Signature: `JettonWalletData{balance:int257,owner:address,master:address,code:^cell}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 query_id:uint64 amount:coins sender:address response_destination:Maybe address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{query_id:uint64,amount:coins,sender:address,response_destination:Maybe address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## TokenTransferInternal
TLB: `token_transfer_internal#178d4519 query_id:uint64 amount:coins from:address response_destination:Maybe address forward_ton_amount:coins forward_payload:remainder<slice> = TokenTransferInternal`
Signature: `TokenTransferInternal{query_id:uint64,amount:coins,from:address,response_destination:Maybe address,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## TokenNotification
TLB: `token_notification#7362d09c query_id:uint64 amount:coins from:address forward_payload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{query_id:uint64,amount:coins,from:address,forward_payload:remainder<slice>}`

## TokenBurn
TLB: `token_burn#595f07bc query_id:uint64 amount:coins response_destination:Maybe address custom_payload:Maybe ^cell = TokenBurn`
Signature: `TokenBurn{query_id:uint64,amount:coins,response_destination:Maybe address,custom_payload:Maybe ^cell}`

## TokenBurnNotification
TLB: `token_burn_notification#7bdd97de query_id:uint64 amount:coins sender:address response_destination:Maybe address = TokenBurnNotification`
Signature: `TokenBurnNotification{query_id:uint64,amount:coins,sender:address,response_destination:Maybe address}`

## TokenExcesses
TLB: `token_excesses#d53276db query_id:uint64 = TokenExcesses`
Signature: `TokenExcesses{query_id:uint64}`

## TokenUpdateContent
TLB: `token_update_content#af1ca26a content:^cell = TokenUpdateContent`
Signature: `TokenUpdateContent{content:^cell}`

## ProvideWalletAddress
TLB: `provide_wallet_address#2c76b973 query_id:uint64 owner_address:address include_address:bool = ProvideWalletAddress`
Signature: `ProvideWalletAddress{query_id:uint64,owner_address:address,include_address:bool}`

## TakeWalletAddress
TLB: `take_wallet_address#d1735400 query_id:uint64 wallet_address:address owner_address:remainder<slice> = TakeWalletAddress`
Signature: `TakeWalletAddress{query_id:uint64,wallet_address:address,owner_address:remainder<slice>}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## ContractInformation
TLB: `_ fee:int257 owner:address testAddress:address hasminted:bool = ContractInformation`
Signature: `ContractInformation{fee:int257,owner:address,testAddress:address,hasminted:bool}`

## CreateNewPoolConfig
TLB: `_ swapRouterAddress:address proxyTon:address tonValueAddMeme:coins tonValueAddPton:coins routerPtonWallet:address = CreateNewPoolConfig`
Signature: `CreateNewPoolConfig{swapRouterAddress:address,proxyTon:address,tonValueAddMeme:coins,tonValueAddPton:coins,routerPtonWallet:address}`

## Mint
TLB: `mint#fc708bd2 amount:int257 receiver:address = Mint`
Signature: `Mint{amount:int257,receiver:address}`

## CreateNewJettonMint
TLB: `create_new_jetton_mint#3dd11feb amount:int257 receiver:address = CreateNewJettonMint`
Signature: `CreateNewJettonMint{amount:int257,receiver:address}`

## CreateNewJetton
TLB: `create_new_jetton#3cc488e3 token_owner:address content:^cell max_supply:int257 rate:int257 lanuch_rate:int257 isLanuch:bool config:CreateNewPoolConfig{swapRouterAddress:address,proxyTon:address,tonValueAddMeme:coins,tonValueAddPton:coins,routerPtonWallet:address} = CreateNewJetton`
Signature: `CreateNewJetton{token_owner:address,content:^cell,max_supply:int257,rate:int257,lanuch_rate:int257,isLanuch:bool,config:CreateNewPoolConfig{swapRouterAddress:address,proxyTon:address,tonValueAddMeme:coins,tonValueAddPton:coins,routerPtonWallet:address}}`

## SimpData
TLB: `simp_data#506bbf1d total_supply:coins owner:address content:^cell mintable:bool rate:int257 = SimpData`
Signature: `SimpData{total_supply:coins,owner:address,content:^cell,mintable:bool,rate:int257}`

# Get Methods
Total Get Methods: 1

## get_wallet_data

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
3688: Not mintable
4429: Invalid sender
12241: Max supply exceeded
14534: Not owner
16059: Invalid value
23951: Insufficient gas
29786: supply rate has wrong
42708: Invalid sender!
43422: Invalid value - Burn
52348: The CreateNewJettonMint only call once itme
62972: Invalid balance
63257: your fee can't afford it