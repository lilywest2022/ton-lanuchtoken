import { Address, toNano } from '@ton/core';
import { LanuchJetton } from '../wrappers/LanuchJetton';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    try {
        const owner = provider.sender().address as Address;
        console.log('Owner address:', owner);
        const lanuchjetton = provider.open(await LanuchJetton.fromInit(owner, BigInt(50)));
        console.log('LanuchJetton address:', lanuchjetton.address);
        await lanuchjetton.send(
            provider.sender(),
            {
                value: toNano('1')
            },
            {
                $$type: 'Deploy',
                queryId: 0n
            }
        );
        console.log('Transaction sent')
        await provider.waitForDeploy(lanuchjetton.address);
        console.log('Contract deployed:', lanuchjetton.address)
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
