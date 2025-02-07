import * as anchor from '@project-serum/anchor'

const RPC = process.env.NEXT_PUBLIC_RPC_FRONT_END!
const connection = new anchor.web3.Connection(RPC, 'confirmed')

const LAMPORTS_TO_SOL = 1000000000
const DISPLAY_DECIMALS = 3

export const getWalletSol = async (
	publicKey: string
) => {
	try {

		let balance = await connection.getBalance(new anchor.web3.PublicKey(publicKey))
		return (balance)

	} catch (e) {
		return ({ 'error': e })
	}
}
