import { Address, toNano } from '@ton/core';
import { LanuchJetton } from '../wrappers/LanuchJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from "../utils/jetton-helpers";

const jettonParams = {
    name: "jetton",
    description: "This is the first jetton from the test suite",
    symbol: "TJ",
    image: "https://avatars.githubusercontent.com/u/115602512?s=96&v=4",
};

export async function run(provider: NetworkProvider) {
    const owner = provider.sender().address as Address;
    const lanuchjetton = provider.open(await LanuchJetton.fromInit(owner, BigInt(50)));

    let content = buildOnchainMetadata(jettonParams);
    let max_supply = toNano(123456766689011);

    await lanuchjetton.send(
        provider.sender(),
        {
            value: toNano('0.5')
        },
        {
            $$type: 'CreateNewJetton',
            owner: owner,
            content: content,
            max_supply: max_supply,
            rate: BigInt(50),
        }
    );
    console.log('Transaction sent')
    await provider.waitForDeploy(lanuchjetton.address);
    console.log('Contract deployed:', lanuchjetton.address)
}