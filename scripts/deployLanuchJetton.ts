import { Address, toNano } from '@ton/core';
import { LanuchJetton,CreateNewPoolConfig } from '../wrappers/LanuchJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from "../utils/jetton-helpers";

const jettonParams = {
    name: "jetton",
    description: "This is the first jetton from the test suite",
    symbol: "TJ",
    image: "https://avatars.githubusercontent.com/u/115602512?s=96&v=4",
};
let  CreateNewPoolConfig :CreateNewPoolConfig= {
    $$type: "CreateNewPoolConfig",
    swapRouterAddress:Address.parse("EQBsGx9ArADUrREB34W-ghgsCgBShvfUr4Jvlu-0KGc33Rbt"),
    proxyTon: Address.parse("kQAcOvXSnnOhCdLYc6up2ECYwtNNTzlmOlidBeCs5cFPV7AM"),
    tonValueAddMeme:toNano("0.5"),
    tonValueAddPton:toNano("0.3"),
    routerPtonWallet:Address.parse("kQCdC2b1GG1saybYxCwRfEqr4WlOexsQIcYcfMYObk_477vs"),
}


export async function run(provider: NetworkProvider) {
    const owner = provider.sender().address as Address;
    const lanuchjetton = provider.open(await LanuchJetton.fromInit(owner, BigInt(50),true));

    let content = buildOnchainMetadata(jettonParams);

    await lanuchjetton.send(
        provider.sender(),
        {
            value: toNano('0.5')
        },
        {
            $$type: 'CreateNewJetton',
            token_owner: owner,
            content: content,
            max_supply: toNano(1000000000000),
            rate: BigInt(50),
            lanuch_rate:BigInt(20),
            isLanuch:true,
            config:CreateNewPoolConfig

        }
    );
    console.log('Transaction sent')
    await provider.waitForDeploy(lanuchjetton.address);
    console.log('Contract deployed:', lanuchjetton.address)
}