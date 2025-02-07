import * as anchor from '@project-serum/anchor'

const RPC = process.env.NEXT_PUBLIC_RPC_FRONT_END!
const connection = new anchor.web3.Connection(RPC, 'confirmed')

export const getWalletTokenBalance = async (
	publicKey: string,
	tokenAddress: string
) => {
	try {

		if (tokenAddress != 'So11111111111111111111111111111111111111112') {
			let tokenAmount = 0
			let userWallet = new anchor.web3.PublicKey(publicKey)
			const userRewardMintAccounts = await connection.getParsedTokenAccountsByOwner(
				userWallet,
				{
					programId: new anchor.web3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
					mint: new anchor.web3.PublicKey(tokenAddress)
				},
				'confirmed'
			)

			let { value } = userRewardMintAccounts

			if (value.length === 1) {
				tokenAmount = value[0].account.data.parsed.info.tokenAmount.amount
			}

			return (tokenAmount)
		} else {
			let balance = await connection.getBalance(new anchor.web3.PublicKey(publicKey))
			return (balance)
		}

	} catch (e) {
		console.log('e', e)
		return (null)
	}
}
