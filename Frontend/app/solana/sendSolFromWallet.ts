import * as anchor from '@project-serum/anchor'
import { toast } from 'react-toastify'

const RPC = process.env.NEXT_PUBLIC_RPC_FRONT_END!
const connection = new anchor.web3.Connection(RPC, 'confirmed')

const LAMPORTS_TO_SOL = 1000000000

export const sendSolFromWallet = async (
	publicKey: anchor.web3.PublicKey,
	destination: string,
	signTransaction: any,
	amount: any
) => {
	try {

		if (amount <= 0) {
			//toast('Please select an amount greater than 0!', { type: 'error' })
			return ({ 'error': 'Amount must be greater than 0' })
		}

		//toast(`Depositing ${amount} SOL`, { type: 'info' })

		let destinationPublicKey = new anchor.web3.PublicKey(destination)

		let instructions: any = []

		instructions.push(anchor.web3.SystemProgram.transfer({
			fromPubkey: publicKey,
			toPubkey: destinationPublicKey,
			lamports: Math.floor(amount * LAMPORTS_TO_SOL)
		}))

		const {
			context: { slot: minContextSlot },
			value: { blockhash, lastValidBlockHeight }
		} = await connection.getLatestBlockhashAndContext()

		const messageV0 = new anchor.web3.TransactionMessage({
			payerKey: publicKey!,
			recentBlockhash: blockhash,
			instructions: instructions
		}).compileToV0Message()

		const tx = new anchor.web3.VersionedTransaction(messageV0)

		const tx2 = await signTransaction!(tx)
		let sig = await connection.sendRawTransaction(tx2.serialize())

		let start = Date.now()
		let gapMin = Date.now()
		let resData = null

		while (resData == null && Date.now() - start < 30000) {
			if (Date.now() - gapMin > 5000) {
				let sigData = await connection.getSignatureStatus(sig)
				resData = sigData.value
				gapMin = Date.now()
			}
		}

		if (resData) {
			//toast('Success Deposit', { type: 'success' })
			return ({ signature: sig })
		} else {
			//toast('Could Not Verify Transactions', { type: 'warning' })
			return ({ 'error': 'Could not verify transaction' })
		}

	} catch (e) {
		return ({ 'error': e })
	}
}