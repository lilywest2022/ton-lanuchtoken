import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano ,Address} from '@ton/core';
import { CreateNewJetton, LanuchJetton ,CreateNewPoolConfig} from '../wrappers/LanuchJetton';
import { buildOnchainMetadata } from "../utils/jetton-helpers"
import '@ton/test-utils';
import { JettonDefaultWallet} from '../build/Jetton/tact_JettonDefaultWallet';
import { SampleJetton ,Mint,CreateNewJettonMint} from '../build/LanuchJetton/tact_SampleJetton';

const jettonParams = {
    name: "nmsl",
    description: "nmsl",
    symbol: "nmsl",
    image: "https://avatars.githubusercontent.com/u/115602512?s=96&v=4"
}

describe('LanuchJetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lanuchJetton: SandboxContract<LanuchJetton>;
    let user: SandboxContract<TreasuryContract>;
    let userJettonDefaultWallet: SandboxContract<JettonDefaultWallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        user = await blockchain.treasury('user');
        console.log('Address', deployer.address, user.address);

        let fee = toNano("0.001");
        lanuchJetton = blockchain.openContract(await LanuchJetton.fromInit(deployer.address, BigInt(fee),true));
        
        const deployResult = await lanuchJetton.send(
            deployer.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lanuchJetton.address,
            deploy: true,
            success: true,
        });

        let content = buildOnchainMetadata(jettonParams);
        let  CreateNewPoolConfig :CreateNewPoolConfig= {
            $$type: "CreateNewPoolConfig",
            swapRouterAddress:Address.parse("EQBsGx9ArADUrREB34W-ghgsCgBShvfUr4Jvlu-0KGc33Rbt"),
            proxyTon: Address.parse("kQAcOvXSnnOhCdLYc6up2ECYwtNNTzlmOlidBeCs5cFPV7AM"),
            tonValueAddMeme:toNano("0.5"),
            tonValueAddPton:toNano("0.3"),
            routerPtonWallet:Address.parse("kQCdC2b1GG1saybYxCwRfEqr4WlOexsQIcYcfMYObk_477vs"),
        }
        const CreateNewJetton: CreateNewJetton = {
            $$type: "CreateNewJetton",
            token_owner: user.address,
            content: content,
            max_supply: toNano(1000000000000),
            rate: BigInt(50),
            lanuch_rate: BigInt(20),
            isLanuch: true,
            config: CreateNewPoolConfig,
        };

        const CreateNewJettonResult = await lanuchJetton.send(user.getSender(), { value: toNano('1') }, CreateNewJetton);
        expect(CreateNewJettonResult.transactions).toHaveTransaction({
            from: user.address,
            success: true
        });

        let afterSendTransaction = (await lanuchJetton.getGetLanuchjettonData()).testAddress;
        console.log('afterSendTransaction', afterSendTransaction);
        expect(afterSendTransaction).not.toBe('0:0'); // 确保合约地址已设置

        let newjetton = blockchain.openContract(await SampleJetton.fromAddress(afterSendTransaction));
        let newjettoninformation = await newjetton.getGetJettonData();
        console.log('newjettoninformation',newjettoninformation.total_supply)
        let userWalletAddress = await newjetton.getGetWalletAddress(user.address);
        console.log('userWalletAddress', userWalletAddress);
        expect(userWalletAddress).not.toBe('0:0'); // 确保用户钱包地址已设置
        
        userJettonDefaultWallet = blockchain.openContract(await JettonDefaultWallet.fromAddress(userWalletAddress));
        console.log('userWalletAddress',userWalletAddress)
        let balance = await userJettonDefaultWallet.getGetWalletData();
        console.log('balance', balance.balance);
        expect(balance.balance).toBeGreaterThan(0); // 确保钱包有余额
        const Mint:Mint ={
            $$type:"Mint",
            amount:100n,
            receiver:user.address,
        }
        const mintResult = await newjetton.send(user.getSender(),{value:toNano("10")},Mint);
        expect(mintResult.transactions).toHaveTransaction({
            from: user.address,
            success: true
        });
        let twiceMintCallCreateNewJettonMint = await userJettonDefaultWallet.getGetWalletData();
        console.log('twiceMintBaby',twiceMintCallCreateNewJettonMint.balance)
    });

    it('should deploy', async () => {
        // 其他测试代码
    });
});
